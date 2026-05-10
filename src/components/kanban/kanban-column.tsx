import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "@/lib/utils"
import { TaskCard } from "./task-card"
import { type Task, type TaskStatus, columns, statusColors } from "./task-data"
import { Plus } from "lucide-react"

interface KanbanColumnProps {
  status: TaskStatus
  tasks: Task[]
  isOver?: boolean
}

export function KanbanColumn({ status, tasks, isOver }: KanbanColumnProps) {
  const column = columns.find((c) => c.id === status)!
  const taskIds = tasks.map((t) => t.id)

  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex w-[280px] shrink-0 flex-col rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] transition-colors",
        isOver && "border-indigo-500/40 bg-[#0d0d0d]",
      )}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 border-b border-[#1e1e1e] px-3 py-2.5">
        <span
          className={cn("h-2 w-2 rounded-full", statusColors[status])}
        />
        <span className="text-xs font-medium text-[#c1c1c1]">
          {column.label}
        </span>
        <span className="ml-auto rounded bg-[#181818] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-[#5a5a5a]">
          {tasks.length}
        </span>
        <button className="text-[#2a2a2a] transition-colors hover:text-[#6b6b6b]">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Task list */}
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="flex-1 space-y-2 overflow-y-auto p-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <p className="text-xs text-[#3a3a3a]">Drop tasks here</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
