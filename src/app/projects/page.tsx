"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProjectStore } from "@/components/projects/project-store"
import { ProjectCard } from "@/components/projects/project-card"
import { NewProjectModal } from "@/components/projects/new-project-modal"
import type { ProjectStatus } from "@/components/projects/project-data"

type FilterTab = "all" | ProjectStatus

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "planning", label: "Planning" },
  { key: "completed", label: "Completed" },
  { key: "paused", label: "Paused" },
]

export default function ProjectsPage() {
  const { projects, setProgress } = useProjectStore()
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all")
  const [modalOpen, setModalOpen] = useState(false)

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.status === activeFilter)

  const activeCount = projects.filter((p) => p.status === "active").length
  const totalCount = projects.length

  const handleProgressChange = useCallback(
    (projectId: string, progress: number) => {
      setProgress(projectId, progress)
    },
    [setProgress],
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-[#f1f1f1]">Projects</h1>
          <p className="mt-0.5 text-xs text-[#5a5a5a]">
            {activeCount} active, {totalCount} total
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-400"
        >
          <Plus className="h-3.5 w-3.5" />
          New Project
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 rounded-md border border-[#1e1e1e] bg-[#111111] p-0.5 w-fit">
        {filterTabs.map((tab) => {
          const active = activeFilter === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={cn(
                "rounded px-3 py-1 text-xs transition-colors",
                active
                  ? "bg-[#1e1e1e] text-[#e1e1e1]"
                  : "text-[#5a5a5a] hover:text-[#c1c1c1]",
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Project grid or empty state */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-sm text-[#5a5a5a]">No projects in this status</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <ProjectCard
                project={project}
                onProgressChange={(progress) =>
                  handleProgressChange(project.id, progress)
                }
              />
            </Link>
          ))}
        </div>
      )}

      {/* New Project Modal */}
      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
