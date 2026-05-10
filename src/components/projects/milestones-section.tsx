"use client"

import { useState, type FormEvent } from "react"
import { useProjectStore } from "./project-store"
import type { Milestone } from "./project-data"

interface MilestonesSectionProps {
  projectId: string
  milestones: Milestone[]
}

export function MilestonesSection({
  projectId,
  milestones: milestoneData,
}: MilestonesSectionProps) {
  const { addMilestone, toggleMilestone, deleteMilestone } = useProjectStore()
  const [newTitle, setNewTitle] = useState("")

  const completed = milestoneData.filter((m) => m.completed).length
  const total = milestoneData.length

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    const title = newTitle.trim()
    if (!title) return
    addMilestone(projectId, title)
    setNewTitle("")
  }

  return (
    <div className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[15px] font-medium text-[#f1f1f1]">Milestones</h3>
        <span className="text-[11px] text-[#5a5a5a]">
          {completed} of {total} completed
        </span>
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} className="mb-3 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a milestone..."
          className="min-w-0 flex-1 rounded border border-[#1e1e1e] bg-[#111] px-3 py-1.5 text-[12px] text-[#f1f1f1] placeholder-[#5a5a5a] outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!newTitle.trim()}
          className="shrink-0 rounded bg-indigo-500 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </form>

      {/* Milestone list */}
      {total === 0 ? (
        <p className="py-2 text-center text-[12px] text-[#5a5a5a]">
          No milestones yet. Add one above.
        </p>
      ) : (
        <ul className="space-y-1">
          {milestoneData.map((m) => (
            <MilestoneRow
              key={m.id}
              milestone={m}
              onToggle={() => toggleMilestone(projectId, m.id)}
              onDelete={() => deleteMilestone(projectId, m.id)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

function MilestoneRow({
  milestone,
  onToggle,
  onDelete,
}: {
  milestone: Milestone
  onToggle: () => void
  onDelete: () => void
}) {
  return (
    <li className="group flex items-center gap-2 rounded px-2 py-1.5 transition-colors hover:bg-[#111]">
      <button
        onClick={onToggle}
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
          milestone.completed
            ? "border-emerald-400 bg-emerald-400 text-black"
            : "border-[#3a3a3a] bg-transparent hover:border-indigo-500"
        }`}
      >
        {milestone.completed && (
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <span
        className={`flex-1 truncate text-[12px] ${
          milestone.completed
            ? "text-[#5a5a5a] line-through"
            : "text-[#f1f1f1]"
        }`}
      >
        {milestone.title}
      </span>
      {milestone.dueDate && (
        <span className="shrink-0 text-[11px] text-[#5a5a5a]">
          {new Date(milestone.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      )}
      <button
        onClick={onDelete}
        className="shrink-0 text-[11px] text-[#5a5a5a] opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
        title="Delete milestone"
      >
        &times;
      </button>
    </li>
  )
}
