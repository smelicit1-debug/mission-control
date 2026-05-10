"use client"

import { useTaskStore } from "../kanban/task-store"
import { statusColors, priorityColors } from "../kanban/task-data"

interface TaskContextProps {
  projectId: string
  taskIds: string[]
}

export function TaskContext({ projectId, taskIds }: TaskContextProps) {
  const { tasks } = useTaskStore()

  // Filter tasks that are linked to this project (via projectId field or taskIds array)
  const linkedTasks = tasks.filter(
    (t) =>
      t.projectId === projectId || taskIds.includes(t.id),
  )

  if (linkedTasks.length === 0) {
    return (
      <div className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
        <h3 className="mb-2 text-[15px] font-medium text-[#f1f1f1]">
          Linked Tasks
        </h3>
        <p className="py-4 text-center text-[12px] text-[#5a5a5a]">
          No tasks linked to this project yet.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[15px] font-medium text-[#f1f1f1]">
          Linked Tasks
        </h3>
        <span className="text-[11px] text-[#5a5a5a]">
          {linkedTasks.length} task{linkedTasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-1">
        {linkedTasks.map((task) => {
          const statusLabel = task.status.replace(/_/g, " ")
          const priorityLabel = task.priority

          return (
            <a
              key={task.id}
              href={`/tools/${task.id}`}
              className="group flex items-center gap-2 rounded px-2 py-2 transition-colors hover:bg-[#111]"
            >
              {/* Status dot */}
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${statusColors[task.status]}`}
              />

              {/* Title */}
              <span className="min-w-0 flex-1 truncate text-[12px] text-[#d1d1d1] group-hover:text-[#f1f1f1]">
                {task.title}
              </span>

              {/* Priority */}
              <span
                className={`shrink-0 text-[11px] font-medium ${priorityColors[task.priority]}`}
              >
                {priorityLabel}
              </span>

              {/* Status label */}
              <span className="hidden shrink-0 text-[11px] capitalize text-[#5a5a5a] sm:inline">
                {statusLabel}
              </span>
            </a>
          )
        })}
      </div>

      <div className="mt-3 border-t border-[#1e1e1e] pt-2">
        <a
          href="/board"
          className="text-[11px] text-indigo-400 transition-colors hover:text-indigo-300"
        >
          View all on board &rarr;
        </a>
      </div>
    </div>
  )
}
