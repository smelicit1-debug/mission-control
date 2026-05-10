"use client"

import { useCallback } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Trash2, Edit } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProjectStore } from "@/components/projects/project-store"
import {
  type ProjectStatus,
  statusLabels,
  statusColors,
  priorityIcons,
} from "@/components/projects/project-data"
import { priorityColors } from "@/components/kanban/task-data"
import { MilestonesSection } from "@/components/projects/milestones-section"
import { NotesSection } from "@/components/projects/notes-section"
import { AssetsSection } from "@/components/projects/assets-section"
import { TaskContext } from "@/components/projects/task-context"

const statusCycle: Array<"planning" | "active" | "paused" | "completed"> = [
  "planning",
  "active",
  "paused",
  "completed",
]

const statusBadgeColors: Record<ProjectStatus, string> = {
  active: "bg-emerald-500/10 text-emerald-400",
  paused: "bg-amber-500/10 text-amber-400",
  completed: "bg-indigo-500/10 text-indigo-400",
  planning: "bg-[#5a5a5a]/10 text-[#8a8a8a]",
}

export default function ProjectDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { projects, updateProject, deleteProject, setProgress } =
    useProjectStore()

  const project = projects.find((p) => p.id === id)

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const pct = Math.round((x / rect.width) * 100)
      setProgress(id, Math.max(0, Math.min(100, pct)))
    },
    [id, setProgress],
  )

  const handleDelete = useCallback(() => {
    deleteProject(id)
    window.location.href = "/projects"
  }, [id, deleteProject])

  const handleEdit = useCallback(() => {
    const currentIdx = statusCycle.indexOf(project!.status as typeof statusCycle[number])
    if (currentIdx === -1) return
    const nextStatus = statusCycle[(currentIdx + 1) % statusCycle.length]
    updateProject(id, { status: nextStatus })
  }, [id, project, updateProject])

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-[#5a5a5a]">Project not found</p>
        <Link
          href="/projects"
          className="mt-2 text-xs text-indigo-400 hover:underline"
        >
          Back to projects
        </Link>
      </div>
    )
  }

  const completedMilestones = project.milestones.filter(
    (m) => m.completed,
  ).length
  const totalMilestones = project.milestones.length

  const dateDisplay = project.targetDate
    ? `${project.startDate} → ${project.targetDate}`
    : project.startDate

  return (
    <div className="space-y-6 p-6">
      {/* Back arrow */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-xs text-[#5a5a5a] transition-colors hover:text-[#c1c1c1]"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to Projects
      </Link>

      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-[#f1f1f1]">
              {project.name}
            </h1>
            <span
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                statusBadgeColors[project.status],
              )}
            >
              <span
                className={cn("h-1.5 w-1.5 rounded-full", statusColors[project.status])}
              />
              {statusLabels[project.status]}
            </span>
          </div>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-[#1e1e1e] px-2 py-0.5 text-[11px] text-[#8a8a8a]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-3">
          {/* Priority + Date row */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-[13px] font-medium",
                priorityColors[project.priority],
              )}
            >
              {priorityIcons[project.priority]}{" "}
              {project.priority.charAt(0).toUpperCase() +
                project.priority.slice(1)}
            </span>
            <span className="text-[11px] text-[#5a5a5a]">{dateDisplay}</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 rounded-md border border-[#1e1e1e] px-3 py-1.5 text-xs text-[#c1c1c1] transition-colors hover:bg-[#181818]"
            >
              <Edit className="h-3.5 w-3.5" />
              {project.status === "completed" ? "Reactivate" : "Advance"}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 rounded-md border border-red-500/20 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Progress section */}
      <div className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] font-medium text-[#f1f1f1]">
            Progress
          </span>
          <span className="text-[12px] text-[#8a8a8a]">
            {project.progress}%
            {totalMilestones > 0 &&
              ` · ${completedMilestones}/${totalMilestones} milestones`}
          </span>
        </div>
        <div
          className="relative h-3 w-full cursor-pointer overflow-hidden rounded-full bg-[#1e1e1e]"
          onClick={handleProgressClick}
        >
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-200"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* 3-column grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Milestones */}
        <div className="lg:col-span-1">
          <MilestonesSection
            projectId={project.id}
            milestones={project.milestones}
          />
        </div>

        {/* Middle: Notes + Assets */}
        <div className="space-y-6 lg:col-span-1">
          <NotesSection projectId={project.id} notes={project.notes} />
          <AssetsSection projectId={project.id} assets={project.assets} />
        </div>

        {/* Right: Linked Tasks */}
        <div className="lg:col-span-1">
          <TaskContext projectId={project.id} taskIds={project.taskIds} />
        </div>
      </div>
    </div>
  )
}
