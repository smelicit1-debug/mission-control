export type TaskStatus = "backlog" | "in_progress" | "in_review" | "done"
export type TaskPriority = "urgent" | "high" | "medium" | "low"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: "user" | "agent"
  labels: string[]
  projectId?: string
  createdAt: string
  updatedAt: string
  dueDate?: string
  comments: number
}

export const columns: { id: TaskStatus; label: string }[] = [
  { id: "backlog", label: "Backlog" },
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
  in_progress: "bg-indigo-500",
  in_review: "bg-amber-500",
  done: "bg-emerald-500",
}

export function generateId(): string {
  const n = Math.floor(Math.random() * 9000) + 1000
  return `TASK-${n}`
}

export function now(): string {
  return new Date().toISOString().split("T")[0]
}

export function assigneeLabel(a: "user" | "agent"): string {
  return a === "user" ? "You" : "Agent"
}

export function assigneeInitials(a: "user" | "agent"): string {
  return a === "user" ? "SM" : "🤖"
}

export function assigneeColor(a: "user" | "agent"): string {
  return a === "user" ? "bg-indigo-500" : "bg-emerald-500/20"
}
