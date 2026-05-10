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
import { mockTasks, columns, type Task, type TaskStatus } from "./task-data"

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [overColumnId, setOverColumnId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      backlog: [],
      todo: [],
      in_progress: [],
      in_review: [],
      done: [],
    }
    for (const task of tasks) {
      if (grouped[task.status]) {
        grouped[task.status].push(task)
      } else {
        grouped.backlog.push(task)
      }
    }
    return grouped
  }, [tasks])

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

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const task = findTask(event.active.id as string)
      if (task) setActiveTask(task)
    },
    [findTask],
  )

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      if (!over) {
        setOverColumnId(null)
        return
      }

      const activeColumn = findColumn(active.id as string)
      const overColumn = findColumn(over.id as string)

      if (!activeColumn || !overColumn || activeColumn === overColumn) {
        setOverColumnId(overColumn)
        return
      }

      setOverColumnId(overColumn)
    },
    [findColumn],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveTask(null)
      setOverColumnId(null)

      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      const activeTask = findTask(activeId)
      if (!activeTask) return

      // Determine target status
      let targetStatus: TaskStatus | null = null

      if (columns.some((c) => c.id === overId)) {
        // Dropped on a column
        targetStatus = overId as TaskStatus
      } else {
        // Dropped on another task — find its column
        targetStatus = findColumn(overId)
      }

      if (!targetStatus || targetStatus === activeTask.status) return

      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, status: targetStatus! } : t,
        ),
      )
    },
    [findTask, findColumn],
  )

  return (
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
  )
}
