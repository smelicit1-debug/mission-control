"use client"

import { type Project, statusColors, statusLabels, priorityIcons } from "./project-data"
import { priorityColors } from "../kanban/task-data"

interface ProjectCardProps {
  project: Project
  onClick?: () => void
  onProgressChange?: (progress: number) => void
}

export function ProjectCard({ project, onClick, onProgressChange }: ProjectCardProps) {
  const completedMilestones = project.milestones.filter((m) => m.completed).length
  const totalMilestones = project.milestones.length

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onProgressChange) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = Math.round((x / rect.width) * 100)
    onProgressChange(Math.max(0, Math.min(100, pct)))
  }

  return (
    <div
      onClick={onClick}
      className="group relative rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4 transition-all hover:border-[#2a2a2a] hover:bg-[#0d0d0d] cursor-pointer"
    >
      {/* Header row */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${statusColors[project.status]}`}
          />
          <h3 className="truncate text-[15px] font-medium text-[#f1f1f1]">
            {project.name}
          </h3>
        </div>
        <span className={`shrink-0 text-[13px] ${priorityColors[project.priority]}`}>
          {priorityIcons[project.priority]}
        </span>
      </div>

      {/* Description */}
      <p className="mb-3 line-clamp-2 text-[12px] leading-relaxed text-[#8a8a8a]">
        {project.description}
      </p>

      {/* Progress bar (clickable) */}
      <div className="mb-3">
        <div
          className="relative h-2 w-full cursor-pointer overflow-hidden rounded-full bg-[#1e1e1e]"
          onClick={(e) => {
            e.stopPropagation()
            handleProgressClick(e)
          }}
        >
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-200"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[11px] text-[#5a5a5a]">Progress</span>
          <span className="text-[11px] font-medium text-[#8a8a8a]">
            {project.progress}%
          </span>
        </div>
      </div>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-[#1e1e1e] px-1.5 py-0.5 text-[11px] text-[#8a8a8a]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer metadata */}
      <div className="flex items-center gap-3 text-[11px] text-[#5a5a5a]">
        <span>{statusLabels[project.status]}</span>
        {totalMilestones > 0 && (
          <span>
            {completedMilestones}/{totalMilestones} milestones
          </span>
        )}
        {project.targetDate && (
          <span>
            Due{" "}
            {new Date(project.targetDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  )
}
