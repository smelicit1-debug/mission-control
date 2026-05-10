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
  type Project,
  type ProjectStatus,
  type Milestone,
  type Note,
  type Asset,
  generateProjectId,
  generateMilestoneId,
  generateNoteId,
  generateAssetId,
  seedProjects,
} from "./project-data"
import { now, type TaskPriority } from "../kanban/task-data"

const STORAGE_KEY = "mission-control-projects"

interface ProjectStore {
  projects: Project[]
  addProject: (input: AddProjectInput) => void
  updateProject: (projectId: string, updates: Partial<Project>) => void
  deleteProject: (projectId: string) => void
  addMilestone: (projectId: string, title: string, dueDate?: string) => void
  toggleMilestone: (projectId: string, milestoneId: string) => void
  deleteMilestone: (projectId: string, milestoneId: string) => void
  addNote: (projectId: string, content: string) => void
  deleteNote: (projectId: string, noteId: string) => void
  addAsset: (
    projectId: string,
    title: string,
    url: string,
    type: Asset["type"],
  ) => void
  deleteAsset: (projectId: string, assetId: string) => void
  setProgress: (projectId: string, progress: number) => void
}

export interface AddProjectInput {
  name: string
  description: string
  priority: TaskPriority
  tags: string[]
  startDate: string
  targetDate?: string
}

const ProjectContext = createContext<ProjectStore | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Project[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed)
          return
        }
      }
    } catch {
      // ignore
    }
    setProjects(seedProjects)
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    }
  }, [projects])

  const addProject = useCallback((input: AddProjectInput) => {
    const project: Project = {
      id: generateProjectId(),
      name: input.name,
      description: input.description,
      status: "planning",
      progress: 0,
      priority: input.priority,
      startDate: input.startDate,
      targetDate: input.targetDate || undefined,
      tags: input.tags,
      milestones: [],
      notes: [],
      assets: [],
      taskIds: [],
      createdAt: now(),
      updatedAt: now(),
    }
    setProjects((prev) => [project, ...prev])
  }, [])

  const updateProject = useCallback(
    (projectId: string, updates: Partial<Project>) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId ? { ...p, ...updates, updatedAt: now() } : p,
        ),
      )
    },
    [],
  )

  const deleteProject = useCallback((projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
  }, [])

  const addMilestone = useCallback(
    (projectId: string, title: string, dueDate?: string) => {
      const milestone: Milestone = {
        id: generateMilestoneId(),
        title,
        completed: false,
        dueDate,
      }
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p
          const updatedMilestones = [...p.milestones, milestone]
          return {
            ...p,
            milestones: updatedMilestones,
            updatedAt: now(),
          }
        }),
      )
    },
    [],
  )

  const toggleMilestone = useCallback(
    (projectId: string, milestoneId: string) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p
          const updatedMilestones = p.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m,
          )
          return {
            ...p,
            milestones: updatedMilestones,
            progress: computeTotalProgress(updatedMilestones, p.progress),
            updatedAt: now(),
          }
        }),
      )
    },
    [],
  )

  const deleteMilestone = useCallback(
    (projectId: string, milestoneId: string) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p
          const updatedMilestones = p.milestones.filter(
            (m) => m.id !== milestoneId,
          )
          return {
            ...p,
            milestones: updatedMilestones,
            progress: computeTotalProgress(updatedMilestones, p.progress),
            updatedAt: now(),
          }
        }),
      )
    },
    [],
  )

  const addNote = useCallback(
    (projectId: string, content: string) => {
      const note: Note = {
        id: generateNoteId(),
        content,
        createdAt: now(),
      }
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, notes: [note, ...p.notes], updatedAt: now() }
            : p,
        ),
      )
    },
    [],
  )

  const deleteNote = useCallback(
    (projectId: string, noteId: string) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                notes: p.notes.filter((n) => n.id !== noteId),
                updatedAt: now(),
              }
            : p,
        ),
      )
    },
    [],
  )

  const addAsset = useCallback(
    (projectId: string, title: string, url: string, type: Asset["type"]) => {
      const asset: Asset = {
        id: generateAssetId(),
        title,
        url,
        type,
      }
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, assets: [...p.assets, asset], updatedAt: now() }
            : p,
        ),
      )
    },
    [],
  )

  const deleteAsset = useCallback(
    (projectId: string, assetId: string) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                assets: p.assets.filter((a) => a.id !== assetId),
                updatedAt: now(),
              }
            : p,
        ),
      )
    },
    [],
  )

  const setProgress = useCallback(
    (projectId: string, progress: number) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, progress: Math.max(0, Math.min(100, progress)), updatedAt: now() }
            : p,
        ),
      )
    },
    [],
  )

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        addMilestone,
        toggleMilestone,
        deleteMilestone,
        addNote,
        deleteNote,
        addAsset,
        deleteAsset,
        setProgress,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjectStore(): ProjectStore {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error("useProjectStore must be used inside ProjectProvider")
  return ctx
}

function computeTotalProgress(
  milestones: Milestone[],
  currentProgress: number,
): number {
  if (milestones.length === 0) return currentProgress
  const completed = milestones.filter((m) => m.completed).length
  const fromMilestones = Math.round((completed / milestones.length) * 100)
  return Math.max(fromMilestones, currentProgress)
}
