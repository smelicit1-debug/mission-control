"use client"

import { useState, type FormEvent } from "react"
import { useProjectStore, type AddProjectInput } from "./project-store"
import type { TaskPriority } from "../kanban/task-data"
import { now } from "../kanban/task-data"

interface NewProjectModalProps {
  open: boolean
  onClose: () => void
}

const priorities: TaskPriority[] = ["urgent", "high", "medium", "low"]

export function NewProjectModal({ open, onClose }: NewProjectModalProps) {
  const { addProject } = useProjectStore()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<TaskPriority>("medium")
  const [tagsInput, setTagsInput] = useState("")
  const [startDate, setStartDate] = useState(now())
  const [targetDate, setTargetDate] = useState("")
  const [error, setError] = useState("")

  if (!open) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Project name is required")
      return
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const input: AddProjectInput = {
      name: name.trim(),
      description: description.trim(),
      priority,
      tags,
      startDate,
      targetDate: targetDate || undefined,
    }

    addProject(input)
    // Reset form
    setName("")
    setDescription("")
    setPriority("medium")
    setTagsInput("")
    setStartDate(now())
    setTargetDate("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-6 shadow-2xl">
        <h2 className="mb-5 text-[18px] font-semibold text-[#f1f1f1]">
          New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              className="w-full rounded border border-[#1e1e1e] bg-[#111] px-3 py-2 text-[13px] text-[#f1f1f1] placeholder-[#5a5a5a] outline-none focus:border-indigo-500"
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
              placeholder="What is this project about?"
              rows={3}
              className="w-full resize-none rounded border border-[#1e1e1e] bg-[#111] px-3 py-2 text-[13px] text-[#f1f1f1] placeholder-[#5a5a5a] outline-none focus:border-indigo-500"
            />
          </div>

          {/* Priority + Tags row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded border border-[#1e1e1e] bg-[#111] px-3 py-2 text-[13px] text-[#f1f1f1] outline-none focus:border-indigo-500"
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
                Tags
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="comma, separated"
                className="w-full rounded border border-[#1e1e1e] bg-[#111] px-3 py-2 text-[13px] text-[#f1f1f1] placeholder-[#5a5a5a] outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded border border-[#1e1e1e] bg-[#111] px-3 py-2 text-[13px] text-[#f1f1f1] outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
                Target Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full rounded border border-[#1e1e1e] bg-[#111] px-3 py-2 text-[13px] text-[#f1f1f1] outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-[12px] text-red-400">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-[12px] text-[#8a8a8a] transition-colors hover:text-[#f1f1f1]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-indigo-500 px-5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-indigo-600"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
