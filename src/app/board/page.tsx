"use client"

import { useState } from "react"
import { KanbanBoard } from "@/components/kanban/kanban-board"
import { Filter, List, User, Bot, Plus } from "lucide-react"

type AssigneeFilter = "user" | "agent" | "all"

export default function BoardPage() {
  const [filter, setFilter] = useState<AssigneeFilter>("all")

  const filters: { key: AssigneeFilter; label: string; icon: typeof User }[] = [
    { key: "user", label: "Mine", icon: User },
    { key: "agent", label: "Agent", icon: Bot },
    { key: "all", label: "All", icon: List },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-[#f1f1f1]">Task Board</h1>
          <p className="mt-0.5 text-xs text-[#5a5a5a]">
            Shared kanban — drag to update, changes persist instantly
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Assignee filter chips */}
          <div className="flex items-center gap-1 rounded-md border border-[#1e1e1e] bg-[#111111] p-0.5">
            {filters.map((f) => {
              const Icon = f.icon
              const active = filter === f.key
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`flex items-center gap-1 rounded px-2.5 py-1 text-xs transition-colors ${
                    active
                      ? "bg-[#1e1e1e] text-[#e1e1e1]"
                      : "text-[#5a5a5a] hover:text-[#c1c1c1]"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {f.label}
                </button>
              )
            })}
          </div>

          <button className="flex items-center gap-1.5 rounded-md border border-[#1e1e1e] px-3 py-1.5 text-xs text-[#5a5a5a] transition-colors hover:bg-[#181818] hover:text-[#c1c1c1]">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>
        </div>
      </div>

      {/* Kanban */}
      <KanbanBoard filter={filter} />
    </div>
  )
}
