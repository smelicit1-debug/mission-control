export type TaskStatus = "backlog" | "todo" | "in_progress" | "in_review" | "done"
export type TaskPriority = "urgent" | "high" | "medium" | "low"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: "user" | "agent" | "unassigned"
  labels: string[]
  createdAt: string
  dueDate?: string
  comments: number
}

export const columns: { id: TaskStatus; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "To Do" },
  { id: "in_progress", label: "In Progress" },
  { id: "in_review", label: "In Review" },
  { id: "done", label: "Done" },
]

export const priorityColors: Record<TaskPriority, string> = {
  urgent: "text-red-400",
  high: "text-amber-400",
  medium: "text-indigo-400",
  low: "text-[#5a5a5a]",
}

export const statusColors: Record<TaskStatus, string> = {
  backlog: "bg-[#3a3a3a]",
  todo: "bg-blue-500",
  in_progress: "bg-indigo-500",
  in_review: "bg-amber-500",
  done: "bg-emerald-500",
}

export const mockTasks: Task[] = [
  {
    id: "TASK-001",
    title: "Build custom tool builder wizard",
    description: "Multi-step form to create new tools from templates",
    status: "in_progress",
    priority: "urgent",
    assignee: "agent",
    labels: ["Frontend", "Tools"],
    createdAt: "2026-05-09",
    comments: 3,
  },
  {
    id: "TASK-002",
    title: "Set up Stripe billing for tool credits",
    description: "Usage-based pricing per tool execution",
    status: "backlog",
    priority: "high",
    assignee: "user",
    labels: ["Backend", "Billing"],
    createdAt: "2026-05-08",
    comments: 1,
  },
  {
    id: "TASK-003",
    title: "Web scraper error handling",
    description: "Retry logic and timeout backoff for failed scrapes",
    status: "todo",
    priority: "high",
    assignee: "agent",
    labels: ["Bug", "Data"],
    createdAt: "2026-05-07",
    dueDate: "2026-05-15",
    comments: 0,
  },
  {
    id: "TASK-004",
    title: "Design system audit",
    description: "Audit all pages for consistent spacing and typography",
    status: "in_review",
    priority: "medium",
    assignee: "user",
    labels: ["Design"],
    createdAt: "2026-05-06",
    comments: 5,
  },
  {
    id: "TASK-005",
    title: "SSO integration (Google OAuth)",
    description: "Allow login via Google workspace accounts",
    status: "done",
    priority: "high",
    assignee: "agent",
    labels: ["Auth"],
    createdAt: "2026-05-05",
    comments: 2,
  },
  {
    id: "TASK-006",
    title: "API rate limiting middleware",
    description: "Add rate limiting per API key for tool endpoints",
    status: "todo",
    priority: "medium",
    assignee: "agent",
    labels: ["Backend", "Security"],
    createdAt: "2026-05-04",
    dueDate: "2026-05-20",
    comments: 0,
  },
  {
    id: "TASK-007",
    title: "Dark mode toggle persistence",
    description: "Save theme preference to localStorage + sync across sessions",
    status: "backlog",
    priority: "low",
    assignee: "unassigned",
    labels: ["UI"],
    createdAt: "2026-05-03",
    comments: 1,
  },
  {
    id: "TASK-008",
    title: "Image gen — batch download feature",
    description: "ZIP download of all generated images in a batch",
    status: "in_progress",
    priority: "medium",
    assignee: "user",
    labels: ["Media", "UX"],
    createdAt: "2026-05-02",
    comments: 4,
  },
  {
    id: "TASK-009",
    title: "Run history export to CSV",
    description: "Export filtered run logs as downloadable CSV",
    status: "backlog",
    priority: "low",
    assignee: "unassigned",
    labels: ["Data", "Export"],
    createdAt: "2026-05-01",
    comments: 0,
  },
  {
    id: "TASK-010",
    title: "Tool execution timeout config",
    description: "Per-tool configurable timeout with hard ceiling",
    status: "in_review",
    priority: "urgent",
    assignee: "agent",
    labels: ["Backend", "Config"],
    createdAt: "2026-04-30",
    dueDate: "2026-05-12",
    comments: 7,
  },
]
