import { KanbanBoard } from "@/components/kanban/kanban-board"
import { Filter, List, User, Bot } from "lucide-react"

export default function BoardPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-[#f1f1f1]">Task Board</h1>
          <p className="mt-0.5 text-xs text-[#5a5a5a]">
            Kanban workflow — drag tasks to update status
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Assignee filters */}
          <div className="flex items-center gap-1.5 rounded-md border border-[#1e1e1e] bg-[#111111] px-2 py-1">
            <button className="flex items-center gap-1 rounded px-2 py-1 text-xs text-[#c1c1c1] transition-colors hover:bg-[#1e1e1e]">
              <User className="h-3 w-3" />
              Mine
            </button>
            <button className="flex items-center gap-1 rounded px-2 py-1 text-xs text-[#5a5a5a] transition-colors hover:bg-[#1e1e1e] hover:text-[#c1c1c1]">
              <Bot className="h-3 w-3" />
              Agent
            </button>
            <button className="flex items-center gap-1 rounded px-2 py-1 text-xs text-[#5a5a5a] transition-colors hover:bg-[#1e1e1e] hover:text-[#c1c1c1]">
              <List className="h-3 w-3" />
              All
            </button>
          </div>

          <button className="flex items-center gap-1.5 rounded-md border border-[#1e1e1e] px-3 py-1.5 text-xs text-[#c1c1c1] transition-colors hover:bg-[#181818]">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>
        </div>
      </div>

      {/* Kanban board */}
      <KanbanBoard />
    </div>
  )
}
