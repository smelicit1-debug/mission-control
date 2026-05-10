import json, os, subprocess, sys

# Read gh token
with open(os.path.expanduser("~/.config/gh/hosts.yml")) as f:
    for line in f:
        if "oauth_token" in line:
            token = line.split(":")[1].strip()
            break

# Create repo via API
import urllib.request
req = urllib.request.Request(
    "https://api.github.com/user/repos",
    data=json.dumps({
        "name": "mission-control",
        "description": "Mission Control — custom tools & operator dashboard",
        "private": False
    }).encode(),
    headers={
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
    }
)
try:
    resp = urllib.request.urlopen(req)
    result = json.loads(resp.read())
    print("Created:", result.get("html_url", "unknown"))
except urllib.error.HTTPError as e:
    body = e.read().decode()
    data = json.loads(body)
    if data.get("errors") and any(err.get("message","").startswith("name already exists") for err in data["errors"]):
        print("EXISTS")
    else:
        print(f"Error: {e.code} - {body}")
        sys.exit(1)
