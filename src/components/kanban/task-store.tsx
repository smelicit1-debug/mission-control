"use client"

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import {
  type Task,
  type TaskStatus,
  type TaskPriority,
  generateId,
  now,
} from "./task-data"

const STORAGE_KEY = "mission-control-tasks"

const seedTasks: Task[] = [
  {
    id: generateId(),
    title: "Build custom tool builder wizard",
    description: "Multi-step form to create new tools from templates",
    status: "in_progress",
    priority: "urgent",
    assignee: "agent",
    labels: ["Frontend", "Tools"],
    createdAt: "2026-05-09",
    updatedAt: "2026-05-10",
    comments: 3,
  },
  {
    id: generateId(),
    title: "Set up Stripe billing for tool credits",
    description: "Usage-based pricing per tool execution",
    status: "backlog",
    priority: "high",
    assignee: "user",
    labels: ["Backend", "Billing"],
    createdAt: "2026-05-08",
    updatedAt: "2026-05-08",
    comments: 1,
  },
  {
    id: generateId(),
    title: "Web scraper error handling",
    description: "Retry logic and timeout backoff for failed scrapes",
    status: "backlog",
    priority: "high",
    assignee: "agent",
    labels: ["Bug", "Data"],
    createdAt: "2026-05-07",
    updatedAt: "2026-05-10",
    dueDate: "2026-05-15",
    comments: 0,
  },
  {
    id: generateId(),
    title: "Design system audit",
    description: "Audit all pages for consistent spacing and typography",
    status: "in_review",
    priority: "medium",
    assignee: "user",
    labels: ["Design"],
    createdAt: "2026-05-06",
    updatedAt: "2026-05-10",
    comments: 5,
  },
  {
    id: generateId(),
    title: "SSO integration (Google OAuth)",
    description: "Allow login via Google workspace accounts",
    status: "done",
    priority: "high",
    assignee: "agent",
    labels: ["Auth"],
    createdAt: "2026-05-05",
    updatedAt: "2026-05-10",
    comments: 2,
  },
  {
    id: generateId(),
    title: "API rate limiting middleware",
    description: "Add rate limiting per API key for tool endpoints",
    status: "backlog",
    priority: "medium",
    assignee: "agent",
    labels: ["Backend", "Security"],
    createdAt: "2026-05-04",
    updatedAt: "2026-05-10",
    dueDate: "2026-05-20",
    comments: 0,
  },
  {
    id: generateId(),
    title: "Image gen — batch download feature",
    description: "ZIP download of all generated images in a batch",
    status: "in_progress",
    priority: "medium",
    assignee: "user",
    labels: ["Media", "UX"],
    createdAt: "2026-05-02",
    updatedAt: "2026-05-10",
    comments: 4,
  },
  {
    id: generateId(),
    title: "Run history export to CSV",
    description: "Export filtered run logs as downloadable CSV",
    status: "backlog",
    priority: "low",
    assignee: "user",
    labels: ["Data", "Export"],
    createdAt: "2026-05-01",
    updatedAt: "2026-05-01",
    comments: 0,
  },
  {
    id: generateId(),
    title: "Tool execution timeout config",
    description: "Per-tool configurable timeout with hard ceiling",
    status: "in_review",
    priority: "urgent",
    assignee: "agent",
    labels: ["Backend", "Config"],
    createdAt: "2026-04-30",
    updatedAt: "2026-05-10",
    dueDate: "2026-05-12",
    comments: 7,
  },
  {
    id: generateId(),
    title: "Slack alert integration",
    description: "Post run failure alerts to #alerts Slack channel",
    status: "backlog",
    priority: "low",
    assignee: "agent",
    labels: ["Integrations"],
    createdAt: "2026-04-29",
    updatedAt: "2026-04-29",
    comments: 0,
  },
]

interface TaskStore {
  tasks: Task[]
  moveTask: (taskId: string, status: TaskStatus) => void
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  deleteTask: (taskId: string) => void
}

const TaskContext = createContext<TaskStore | null>(null)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Task[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed)
          return
        }
      }
    } catch {
      // ignore
    }
    setTasks(seedTasks)
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
  }, [tasks])

  const moveTask = useCallback((taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status, updatedAt: now() } : t,
      ),
    )
  }, [])

  const addTask = useCallback(
    (input: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">) => {
      const task: Task = {
        ...input,
        id: generateId(),
        createdAt: now(),
        updatedAt: now(),
        comments: 0,
      }
      setTasks((prev) => [task, ...prev])
    },
    [],
  )

  const updateTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, ...updates, updatedAt: now() } : t,
        ),
      )
    },
    [],
  )

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }, [])

  return (
    <TaskContext.Provider
      value={{ tasks, moveTask, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskStore(): TaskStore {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error("useTaskStore must be used inside TaskProvider")
  return ctx
}
