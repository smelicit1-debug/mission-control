import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import {
  type Task,
  priorityColors,
  assigneeInitials,
  assigneeColor,
} from "./task-data"
import {
  MessageSquare,
  Calendar,
  Zap,
  ArrowUp,
  Minus,
  ArrowDown,
  GripVertical,
  Trash2,
} from "lucide-react"
import { useTaskStore } from "./task-store"

const priorityIcons = {
  urgent: Zap,
  high: ArrowUp,
  medium: Minus,
  low: ArrowDown,
}

interface TaskCardProps {
  task: Task
  isDragging?: boolean
}

export function TaskCard({ task, isDragging }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const { deleteTask } = useTaskStore()
  const PriorityIcon = priorityIcons[task.priority]
  const initials = assigneeInitials(task.assignee)
  const color = assigneeColor(task.assignee)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group rounded-lg border border-[#1e1e1e] bg-[#0d0d0d] p-3 transition-all",
        isDragging || isSortDragging
          ? "z-50 border-indigo-500/50 shadow-xl shadow-indigo-500/10"
          : "hover:border-[#2a2a2a] hover:bg-[#111111]",
      )}
    >
      {/* Drag handle + ID row */}
      <div className="mb-2 flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-[#2a2a2a] opacity-0 transition-opacity hover:text-[#5a5a5a] group-hover:opacity-100"
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>
        <span className="text-[11px] font-mono text-[#4a4a4a]">{task.id}</span>
        <div className="ml-auto flex items-center gap-1">
          <PriorityIcon
            className={cn("h-3 w-3", priorityColors[task.priority])}
          />
        </div>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-[#2a2a2a] opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>

      {/* Title */}
      <h4 className="mb-1.5 text-sm leading-snug text-[#e1e1e1]">
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="mb-2 text-xs leading-relaxed text-[#5a5a5a] line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="mb-2.5 flex flex-wrap gap-1">
          {task.labels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-[#181818] px-2 py-0.5 text-[10px] text-[#6b6b6b]"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-3 border-t border-[#181818] pt-2">
        {/* Assignee */}
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-medium",
            color,
            task.assignee === "agent" ? "text-[10px]" : "text-white",
          )}
        >
          {initials}
        </div>

        {/* Comments */}
        <div className="flex items-center gap-1 text-[#4a4a4a]">
          <MessageSquare className="h-3 w-3" />
          <span className="text-[11px] tabular-nums">{task.comments}</span>
        </div>

        {/* Due date */}
        {task.dueDate && (
          <div className="ml-auto flex items-center gap-1 text-[#4a4a4a]">
            <Calendar className="h-3 w-3" />
            <span className="text-[11px]">{task.dueDate}</span>
          </div>
        )}
      </div>
    </div>
  )
}
