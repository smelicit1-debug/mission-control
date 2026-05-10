import { cn } from "@/lib/utils"
import { Play, CheckCircle2, XCircle, Clock } from "lucide-react"

interface Run {
  id: string
  tool: string
  status: "success" | "failed" | "running" | "pending"
  duration: string
  timestamp: string
  trigger: string
}

const statusIcons = {
  success: CheckCircle2,
  failed: XCircle,
  running: Play,
  pending: Clock,
}

const statusColors = {
  success: "text-emerald-400",
  failed: "text-red-400",
  running: "text-indigo-400",
  pending: "text-amber-400",
}

const runs: Run[] = [
  {
    id: "run_9k2m",
    tool: "Web Scraper",
    status: "success",
    duration: "1.2s",
    timestamp: "2 min ago",
    trigger: "Manual",
  },
  {
    id: "run_8j1l",
    tool: "Image Generator",
    status: "running",
    duration: "--",
    timestamp: "5 min ago",
    trigger: "Cron (every 6h)",
  },
  {
    id: "run_7h0k",
    tool: "Data Transformer",
    status: "failed",
    duration: "0.8s",
    timestamp: "12 min ago",
    trigger: "Webhook",
  },
  {
    id: "run_6g9j",
    tool: "LLM Router",
    status: "success",
    duration: "3.4s",
    timestamp: "18 min ago",
    trigger: "Manual",
  },
  {
    id: "run_5f8i",
    tool: "Web Scraper",
    status: "success",
    duration: "0.9s",
    timestamp: "34 min ago",
    trigger: "Cron (every 1h)",
  },
]

export function RecentRuns() {
  return (
    <div className="rounded-lg border border-[#1e1e1e] bg-[#0d0d0d]">
      <div className="flex items-center justify-between border-b border-[#1e1e1e] px-4 py-3">
        <h3 className="text-sm font-medium text-[#e1e1e1]">Recent Runs</h3>
        <button className="text-xs text-[#5a5a5a] transition-colors hover:text-indigo-400">
          View all
        </button>
      </div>
      <div className="divide-y divide-[#1a1a1a]">
        {runs.map((run) => {
          const StatusIcon = statusIcons[run.status]
          return (
            <div
              key={run.id}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[#111111]"
            >
              <StatusIcon
                className={cn("h-3.5 w-3.5 shrink-0", statusColors[run.status])}
              />
              <span className="flex-1 text-sm text-[#c1c1c1]">
                {run.tool}
              </span>
              <span className="hidden w-16 text-right text-xs text-[#4a4a4a] sm:block">
                {run.trigger}
              </span>
              <span className="w-12 text-right text-xs tabular-nums text-[#4a4a4a]">
                {run.duration}
              </span>
              <span className="w-20 text-right text-xs text-[#4a4a4a]">
                {run.timestamp}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
