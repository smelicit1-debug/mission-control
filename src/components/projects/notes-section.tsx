"use client"

import { useState, type FormEvent } from "react"
import { useProjectStore } from "./project-store"
import type { Note } from "./project-data"

interface NotesSectionProps {
  projectId: string
  notes: Note[]
}

export function NotesSection({ projectId, notes }: NotesSectionProps) {
  const { addNote, deleteNote } = useProjectStore()
  const [content, setContent] = useState("")

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = content.trim()
    if (!trimmed) return
    addNote(projectId, trimmed)
    setContent("")
  }

  return (
    <div className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
      <h3 className="mb-3 text-[15px] font-medium text-[#f1f1f1]">Notes</h3>

      {/* Add form */}
      <form onSubmit={handleAdd} className="mb-3 space-y-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a note..."
          rows={3}
          className="w-full resize-none rounded border border-[#1e1e1e] bg-[#111] px-3 py-2 text-[12px] text-[#f1f1f1] placeholder-[#5a5a5a] outline-none focus:border-indigo-500"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim()}
            className="rounded bg-indigo-500 px-4 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add Note
          </button>
        </div>
      </form>

      {/* Notes list */}
      {notes.length === 0 ? (
        <p className="py-2 text-center text-[12px] text-[#5a5a5a]">
          No notes yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <NoteRow
              key={note.id}
              note={note}
              onDelete={() => deleteNote(projectId, note.id)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

function NoteRow({
  note,
  onDelete,
}: {
  note: Note
  onDelete: () => void
}) {
  const formattedDate = (() => {
    try {
      return new Date(note.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return note.createdAt
    }
  })()

  return (
    <li className="group rounded border border-[#1e1e1e] bg-[#111] p-3 transition-colors hover:border-[#2a2a2a]">
      <div className="mb-1 flex items-start justify-between gap-2">
        <p className="flex-1 whitespace-pre-wrap break-words text-[12px] leading-relaxed text-[#d1d1d1]">
          {note.content}
        </p>
        <button
          onClick={onDelete}
          className="shrink-0 text-[11px] text-[#5a5a5a] opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
          title="Delete note"
        >
          &times;
        </button>
      </div>
      <span className="text-[11px] text-[#5a5a5a]">{formattedDate}</span>
    </li>
  )
}
