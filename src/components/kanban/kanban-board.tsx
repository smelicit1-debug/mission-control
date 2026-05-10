"use client"

import { useState, useCallback, useMemo } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { KanbanColumn } from "./kanban-column"
import { TaskCard } from "./task-card"
import { NewTaskModal } from "./new-task-modal"
import { columns, type Task, type TaskStatus } from "./task-data"
import { useTaskStore } from "./task-store"

interface KanbanBoardProps {
  filter?: "user" | "agent" | "all"
}

export function KanbanBoard({ filter = "all" }: KanbanBoardProps) {
  const { tasks, moveTask } = useTaskStore()
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [overColumnId, setOverColumnId] = useState<string | null>(null)
  const [showNewTask, setShowNewTask] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Filter + group tasks
  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      backlog: [],
      in_progress: [],
      in_review: [],
      done: [],
    }
    const filtered =
      filter === "all"
        ? tasks
        : tasks.filter((t) => t.assignee === filter)
    for (const task of filtered) {
      grouped[task.status]?.push(task) ?? grouped.backlog.push(task)
    }
    return grouped
  }, [tasks, filter])

  const findTask = useCallback(
    (id: string) => tasks.find((t) => t.id === id) ?? null,
    [tasks],
  )

  const findColumn = useCallback(
    (id: string): TaskStatus | null => {
      if (columns.some((c) => c.id === id)) return id as TaskStatus
      const task = findTask(id)
      return task?.status ?? null
    },
    [findTask],
  )

  const handleDragStart = (event: DragStartEvent) => {
    const task = findTask(event.active.id as string)
    if (task) setActiveTask(task)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) {
      setOverColumnId(null)
      return
    }
    const activeCol = findColumn(active.id as string)
    const overCol = findColumn(over.id as string)
    setOverColumnId(overCol)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)
    setOverColumnId(null)
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string
    const activeTask = findTask(activeId)
    if (!activeTask) return

    let targetStatus: TaskStatus | null = null
    if (columns.some((c) => c.id === overId)) {
      targetStatus = overId as TaskStatus
    } else {
      targetStatus = findColumn(overId)
    }

    if (targetStatus && targetStatus !== activeTask.status) {
      moveTask(activeId, targetStatus)
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto pb-4">
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              status={col.id}
              tasks={tasksByStatus[col.id]}
              isOver={overColumnId === col.id}
              onAdd={col.id === "backlog" ? () => setShowNewTask(true) : undefined}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="w-[264px]">
              <TaskCard task={activeTask} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {showNewTask && (
        <NewTaskModal onClose={() => setShowNewTask(false)} />
      )}
    </>
  )
}
