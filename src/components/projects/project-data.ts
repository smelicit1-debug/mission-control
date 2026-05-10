import type { TaskPriority } from "../kanban/task-data"

export type ProjectStatus = "active" | "paused" | "completed" | "planning"

export interface Milestone {
  id: string
  title: string
  completed: boolean
  dueDate?: string
}

export interface Note {
  id: string
  content: string
  createdAt: string
}

export interface Asset {
  id: string
  title: string
  url: string
  type: "link" | "image" | "file" | "reference"
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  progress: number
  priority: TaskPriority
  startDate: string
  targetDate?: string
  completedDate?: string
  tags: string[]
  milestones: Milestone[]
  notes: Note[]
  assets: Asset[]
  taskIds: string[]
  createdAt: string
  updatedAt: string
}

export const statusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  paused: "Paused",
  completed: "Completed",
  planning: "Planning",
}

export const statusColors: Record<ProjectStatus, string> = {
  active: "bg-emerald-400",
  paused: "bg-amber-400",
  completed: "bg-indigo-500",
  planning: "bg-[#5a5a5a]",
}

export const priorityIcons: Record<TaskPriority, string> = {
  urgent: "\u26A0\uFE0F",
  high: "\u2191",
  medium: "\u2194",
  low: "\u2193",
}

export const assetTypeLabels: Record<Asset["type"], string> = {
  link: "Link",
  image: "Image",
  file: "File",
  reference: "Reference",
}

export const assetTypeColors: Record<Asset["type"], string> = {
  link: "bg-indigo-500/20 text-indigo-400",
  image: "bg-emerald-500/20 text-emerald-400",
  file: "bg-amber-500/20 text-amber-400",
  reference: "bg-purple-500/20 text-purple-400",
}

let projectCounter = 1000

export function generateProjectId(): string {
  projectCounter++
  return `PROJ-${projectCounter}`
}

export function generateMilestoneId(): string {
  return `MS-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
}

export function generateNoteId(): string {
  return `NOTE-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
}

export function generateAssetId(): string {
  return `AST-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
}

export function projectProgress(milestones: Milestone[]): number {
  if (milestones.length === 0) return 0
  const completed = milestones.filter((m) => m.completed).length
  return Math.round((completed / milestones.length) * 100)
}

export function computeProjectProgress(
  milestones: Milestone[],
  manualProgress: number,
): number {
  if (milestones.length > 0) {
    const fromMilestones = projectProgress(milestones)
    return Math.max(fromMilestones, manualProgress)
  }
  return manualProgress
}

export const seedProjects: Project[] = [
  {
    id: "PROJ-1001",
    name: "Mission Control",
    description:
      "Main CLI dashboard for managing tools, tasks, and project workflows. Central hub for all agent operations.",
    status: "active",
    progress: 65,
    priority: "urgent",
    startDate: "2026-04-01",
    targetDate: "2026-06-30",
    tags: ["Frontend", "Dashboard", "Core"],
    milestones: [
      {
        id: "MS-1001",
        title: "Kanban board with drag-and-drop",
        completed: true,
        dueDate: "2026-04-20",
      },
      {
        id: "MS-1002",
        title: "Project management views",
        completed: false,
        dueDate: "2026-05-15",
      },
      {
        id: "MS-1003",
        title: "Tool execution history + analytics",
        completed: false,
        dueDate: "2026-06-01",
      },
    ],
    notes: [
      {
        id: "N-1001",
        content:
          "Need to add real-time websocket updates for task status changes.",
        createdAt: "2026-04-15",
      },
      {
        id: "N-1002",
        content:
          "Consider adding a dark mode toggle even though base is already dark.",
        createdAt: "2026-04-28",
      },
    ],
    assets: [
      {
        id: "AST-1001",
        title: "Figma Design System",
        url: "https://figma.com/files/mission-control",
        type: "reference",
      },
      {
        id: "AST-1002",
        title: "Supabase Schema",
        url: "https://supabase.com/project/abc/schema",
        type: "link",
      },
    ],
    taskIds: ["TASK-1001", "TASK-1002"],
    createdAt: "2026-04-01",
    updatedAt: "2026-05-10",
  },
  {
    id: "PROJ-1002",
    name: "OpenClawTank Infrastructure",
    description:
      "Backend services, hosting, CI/CD pipelines, and deployment automation for the Clawd platform.",
    status: "active",
    progress: 40,
    priority: "high",
    startDate: "2026-03-15",
    targetDate: "2026-07-01",
    tags: ["Backend", "Infra", "DevOps"],
    milestones: [
      {
        id: "MS-2001",
        title: "Docker Compose local dev environment",
        completed: true,
        dueDate: "2026-03-30",
      },
      {
        id: "MS-2002",
        title: "GitHub Actions CI pipeline",
        completed: false,
        dueDate: "2026-05-01",
      },
    ],
    notes: [
      {
        id: "N-2001",
        content:
          "Investigate switching from Docker Swarm to k3s for orchestration.",
        createdAt: "2026-04-10",
      },
    ],
    assets: [
      {
        id: "AST-2001",
        title: "Infrastructure Diagram",
        url: "https://excalidraw.com/#room=infra",
        type: "image",
      },
    ],
    taskIds: ["TASK-1003", "TASK-1005"],
    createdAt: "2026-03-15",
    updatedAt: "2026-05-09",
  },
  {
    id: "PROJ-1003",
    name: "Side Project — Recipe Forager",
    description:
      "A web app that scrapes and indexes recipe blogs. ML-powered ingredient substitution and dietary filters.",
    status: "planning",
    progress: 10,
    priority: "low",
    startDate: "2026-05-01",
    tags: ["Side", "ML", "Web"],
    milestones: [
      {
        id: "MS-3001",
        title: "MVP web scraper for top 10 recipe sites",
        completed: false,
        dueDate: "2026-06-01",
      },
      {
        id: "MS-3002",
        title: "Basic search + filter UI",
        completed: false,
        dueDate: "2026-06-15",
      },
    ],
    notes: [
      {
        id: "N-3001",
        content:
          "Look into RecipeNLG dataset for training substitution model.",
        createdAt: "2026-05-02",
      },
    ],
    assets: [
      {
        id: "AST-3001",
        title: "Recipe Schema Draft",
        url: "https://docs.google.com/document/d/recipe-schema",
        type: "reference",
      },
      {
        id: "AST-3002",
        title: "Similar Projects Research",
        url: "https://www.notion.so/recipe-forager-research",
        type: "link",
      },
    ],
    taskIds: [],
    createdAt: "2026-05-01",
    updatedAt: "2026-05-05",
  },
  {
    id: "PROJ-1004",
    name: "API Rate Limiter Middleware",
    description:
      "Per-key rate limiting with Redis backend, configurable tiers, and dashboard analytics.",
    status: "completed",
    progress: 100,
    priority: "medium",
    startDate: "2026-04-10",
    targetDate: "2026-05-01",
    completedDate: "2026-04-28",
    tags: ["Backend", "Security", "API"],
    milestones: [
      {
        id: "MS-4001",
        title: "Token bucket algorithm implementation",
        completed: true,
        dueDate: "2026-04-15",
      },
      {
        id: "MS-4002",
        title: "Redis-backed storage layer",
        completed: true,
        dueDate: "2026-04-20",
      },
      {
        id: "MS-4003",
        title: "Analytics dashboard",
        completed: true,
        dueDate: "2026-04-28",
      },
    ],
    notes: [
      {
        id: "N-4001",
        content:
          "Deployed to staging. Need to monitor Redis memory usage under load.",
        createdAt: "2026-04-28",
      },
    ],
    assets: [
      {
        id: "AST-4001",
        title: "Rate Limit Spec",
        url: "https://github.com/org/repo/wiki/rate-limiting",
        type: "file",
      },
    ],
    taskIds: ["TASK-1006"],
    createdAt: "2026-04-10",
    updatedAt: "2026-04-28",
  },
]
