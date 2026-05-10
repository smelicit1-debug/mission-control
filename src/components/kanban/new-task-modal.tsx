"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useTaskStore } from "./task-store"
import { type TaskPriority } from "./task-data"
import { useProjectStore } from "../projects/project-store"

interface NewTaskModalProps {
  onClose: () => void
  defaultProjectId?: string
}

export function NewTaskModal({ onClose, defaultProjectId }: NewTaskModalProps) {
  const { addTask } = useTaskStore()
  const { projects } = useProjectStore()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<TaskPriority>("medium")
  const [assignee, setAssignee] = useState<"user" | "agent">("user")
  const [labelInput, setLabelInput] = useState("")
  const [labels, setLabels] = useState<string[]>([])
  const [dueDate, setDueDate] = useState("")
  const [projectId, setProjectId] = useState(defaultProjectId ?? "")

  const handleAddLabel = () => {
    const trimmed = labelInput.trim()
    if (trimmed && !labels.includes(trimmed)) {
      setLabels([...labels, trimmed])
      setLabelInput("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask({
      title: title.trim(),
      description: description.trim(),
      status: "backlog",
      priority,
      assignee,
      labels,
      projectId: projectId || undefined,
      dueDate: dueDate || undefined,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-xl border border-[#1e1e1e] bg-[#111111] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e1e1e] px-5 py-3.5">
          <h2 className="text-sm font-semibold text-[#f1f1f1]">New Task</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[#5a5a5a] transition-colors hover:bg-[#1e1e1e] hover:text-[#c1c1c1]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              className="w-full rounded-md border border-[#1e1e1e] bg-[#0a0a0a] px-3 py-2 text-sm text-[#e1e1e1] placeholder-[#3a3a3a] outline-none transition-colors focus:border-indigo-500/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              rows={3}
              className="w-full resize-none rounded-md border border-[#1e1e1e] bg-[#0a0a0a] px-3 py-2 text-sm text-[#e1e1e1] placeholder-[#3a3a3a] outline-none transition-colors focus:border-indigo-500/50"
            />
          </div>

          {/* Priority + Assignee row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-md border border-[#1e1e1e] bg-[#0a0a0a] px-3 py-2 text-sm text-[#e1e1e1] outline-none focus:border-indigo-500/50"
              >
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
                Assignee
              </label>
              <select
                value={assignee}
                onChange={(e) =>
                  setAssignee(e.target.value as "user" | "agent")
                }
                className="w-full rounded-md border border-[#1e1e1e] bg-[#0a0a0a] px-3 py-2 text-sm text-[#e1e1e1] outline-none focus:border-indigo-500/50"
              >
                <option value="user">You (smelicit1)</option>
                <option value="agent">Agent (🤖)</option>
              </select>
            </div>
          </div>

          {/* Labels */}
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
              Labels
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddLabel())}
                placeholder="Type and press Enter..."
                className="flex-1 rounded-md border border-[#1e1e1e] bg-[#0a0a0a] px-3 py-2 text-sm text-[#e1e1e1] placeholder-[#3a3a3a] outline-none focus:border-indigo-500/50"
              />
              <button
                type="button"
                onClick={handleAddLabel}
                className="rounded-md border border-[#1e1e1e] px-3 py-2 text-xs text-[#6b6b6b] transition-colors hover:bg-[#181818] hover:text-[#c1c1c1]"
              >
                Add
              </button>
            </div>
            {labels.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {labels.map((l) => (
                  <span
                    key={l}
                    className="inline-flex items-center gap-1 rounded-full bg-[#181818] px-2 py-0.5 text-[10px] text-[#6b6b6b]"
                  >
                    {l}
                    <button
                      type="button"
                      onClick={() => setLabels(labels.filter((x) => x !== l))}
                      className="hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Project */}
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
              Project (optional)
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded-md border border-[#1e1e1e] bg-[#0a0a0a] px-3 py-2 text-sm text-[#e1e1e1] outline-none focus:border-indigo-500/50"
            >
              <option value="">— No project —</option>
              {projects
                .filter((p) => p.status !== "completed")
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Due date */}
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
              Due date (optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-md border border-[#1e1e1e] bg-[#0a0a0a] px-3 py-2 text-sm text-[#e1e1e1] outline-none focus:border-indigo-500/50"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-[#1e1e1e] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#1e1e1e] px-4 py-2 text-xs text-[#c1c1c1] transition-colors hover:bg-[#181818]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="rounded-md bg-indigo-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
