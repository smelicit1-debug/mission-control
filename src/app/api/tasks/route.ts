import { NextResponse } from "next/server"

// In-memory store for Vercel serverless (file not available on serverless)
// For production, swap in Vercel KV or Supabase
let store: any[] | null = null

export async function GET() {
  return NextResponse.json({ tasks: store ?? [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  if (body.action === "auto-complete") {
    if (!store) {
      return NextResponse.json({ message: "No tasks loaded yet" })
    }
    const today = new Date().toISOString().split("T")[0]
    let count = 0
    for (const t of store) {
      if (t.status === "backlog" && t.assignee === "agent") {
        t.status = "done"
        t.updatedAt = today
        count++
      }
    }
    return NextResponse.json({ completed: count, tasks: store })
  }
  if (body.tasks) {
    store = body.tasks
    return NextResponse.json({ stored: store!.length })
  }
  return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
}
