"""
Heartbeat: check mission-control task board, auto-complete agent backlog tasks.
Runs as a cron job. State file at ~/.hermes/tasks-state.json

On first run, seeds from the Mission Control source task data.
On subsequent runs, loads from state file.
If the live API is reachable (mission.openclawtank.com), syncs from it.
"""
import json, os, sys, urllib.request, urllib.error
from datetime import date

STATE_FILE = os.path.expanduser("~/.hermes/tasks-state.json")
SEED_FILE = "/mnt/c/Users/admin/clawd/mission-control/scripts/seed-tasks.json"
API_URL = "https://mission.openclawtank.com/api/tasks"

TODAY = date.today().isoformat()

def seed_from_source():
    """Read seed tasks from the JSON seed file."""
    if not os.path.exists(SEED_FILE):
        return []
    try:
        with open(SEED_FILE) as f:
            return json.load(f)
    except Exception as e:
        print(f"  [seed] error: {e}")
        return []

def try_fetch_from_api():
    """Fetch tasks from the live API if reachable."""
    try:
        req = urllib.request.Request(API_URL, headers={"User-Agent": "Hermes-Heartbeat/1.0"})
        resp = urllib.request.urlopen(req, timeout=5)
        data = json.loads(resp.read())
        tasks = data.get("tasks", [])
        if tasks:
            return tasks
    except Exception:
        pass
    return None

def load_tasks():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            data = json.load(f)
            if data:
                return data
    return []

def save_tasks(tasks):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(tasks, f, indent=2)

def try_push_to_api(tasks):
    """Push updated tasks to the live API."""
    try:
        data = json.dumps({"tasks": tasks}).encode()
        req = urllib.request.Request(
            API_URL, data=data,
            headers={
                "User-Agent": "Hermes-Heartbeat/1.0",
                "Content-Type": "application/json",
            }
        )
        resp = urllib.request.urlopen(req, timeout=5)
        return json.loads(resp.read())
    except Exception:
        return None

def heartbeat():
    # Try live API first, fall back to state file, then seed
    tasks = try_fetch_from_api()
    if tasks is not None:
        print(f"  [sync] fetched {len(tasks)} tasks from live API")
    else:
        tasks = load_tasks()
        if tasks:
            print(f"  [sync] loaded {len(tasks)} tasks from local state")
        else:
            tasks = seed_from_source()
            if tasks:
                # Normalize fields for consistency
                task_id_counter = 1000
                for t in tasks:
                    if "id" not in t or not t.get("id", "").startswith("TASK-"):
                        t["id"] = f"TASK-{task_id_counter}"
                        task_id_counter += 1
                print(f"  [sync] seeded {len(tasks)} tasks from source")

    if not tasks:
        print("  No tasks found. Skipping heartbeat.")
        return

    # Auto-complete: backlog + assigned to agent
    completed = 0
    for t in tasks:
        if t.get("status") == "backlog" and t.get("assignee") == "agent":
            t["status"] = "done"
            t["updatedAt"] = TODAY
            completed += 1

    if completed > 0:
        save_tasks(tasks)
        # Also push to live API
        api_result = try_push_to_api(tasks)
        if api_result:
            print(f"  [push] synced {api_result.get('stored', 0)} tasks to live API")
        print(f"\n  ✓ Auto-completed {completed} agent backlog task(s):")
        for t in tasks:
            if t.get("status") == "done" and t.get("updatedAt") == TODAY and t.get("assignee") == "agent":
                print(f"    ✓ {t.get('id','?')} — {t.get('title','?')}")
    else:
        print("  No agent backlog tasks to complete")

    # Report board snapshot
    statuses = {}
    assignees = {}
    for t in tasks:
        s = t.get("status", "?")
        statuses[s] = statuses.get(s, 0) + 1
        a = t.get("assignee", "?")
        assignees[a] = assignees.get(a, 0) + 1

    print(f"\n  Board snapshot: {len(tasks)} tasks")
    for s in ["backlog", "in_progress", "in_review", "done"]:
        print(f"    {s}: {statuses.get(s, 0)}")
    print(f"  Assignees: {assignees}")

if __name__ == "__main__":
    heartbeat()
