import { Search, Download, Filter } from "lucide-react"
import { RecentRuns } from "@/components/recent-runs"

export default function RunsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-[#f1f1f1]">Run History</h1>
          <p className="mt-0.5 text-xs text-[#5a5a5a]">
            All tool executions across your workspace
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-md border border-[#1e1e1e] px-3 py-1.5 text-xs text-[#c1c1c1] transition-colors hover:bg-[#181818]">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>
          <button className="flex items-center gap-1.5 rounded-md border border-[#1e1e1e] px-3 py-1.5 text-xs text-[#c1c1c1] transition-colors hover:bg-[#181818]">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 rounded-md border border-[#1e1e1e] bg-[#111111] px-3 py-2">
        <Search className="h-4 w-4 text-[#5a5a5a]" />
        <input
          type="text"
          placeholder="Search by tool name, run ID, or trigger..."
          className="w-full bg-transparent text-xs text-[#c1c1c1] placeholder-[#5a5a5a] outline-none"
        />
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        <div className="space-y-0.5">
          <p className="text-[11px] text-[#5a5a5a]">Today</p>
          <p className="text-lg font-semibold text-[#f1f1f1]">47</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-[11px] text-[#5a5a5a]">This Week</p>
          <p className="text-lg font-semibold text-[#f1f1f1]">312</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-[11px] text-[#5a5a5a]">Avg. Duration</p>
          <p className="text-lg font-semibold text-[#f1f1f1]">1.8s</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-[11px] text-[#5a5a5a]">Success Rate</p>
          <p className="text-lg font-semibold text-[#e1e1e1]">94.2%</p>
        </div>
      </div>

      {/* Run list */}
      <RecentRuns />
    </div>
  )
}
