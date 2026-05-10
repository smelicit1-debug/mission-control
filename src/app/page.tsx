import { Puzzle, Play, GitBranch, Activity } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { ToolCard } from "@/components/tool-card"
import { RecentRuns } from "@/components/recent-runs"

export default function OverviewPage() {
  return (
    <div className="space-y-8 p-6">
      {/* Stats grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Tools"
          value={12}
          change="+2 this month"
          changeDirection="up"
          icon={<Puzzle className="h-4 w-4" />}
        />
        <StatCard
          label="Runs Today"
          value={47}
          change="+12.5%"
          changeDirection="up"
          icon={<Play className="h-4 w-4" />}
        />
        <StatCard
          label="Success Rate"
          value="94.2%"
          change="+0.8%"
          changeDirection="up"
          icon={<Activity className="h-4 w-4" />}
        />
        <StatCard
          label="Active Integrations"
          value={8}
          change="1 disconnected"
          changeDirection="down"
          icon={<GitBranch className="h-4 w-4" />}
        />
      </div>

      {/* Recently used tools */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-[#e1e1e1]">
            Recently Used
          </h2>
          <button className="text-xs text-[#5a5a5a] transition-colors hover:text-indigo-400">
            View all tools
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            name="Web Scraper"
            description="Extract structured data from any webpage with CSS selectors and pagination support."
            category="Data"
            runs={142}
            status="active"
            href="/tools/web-scraper"
          />
          <ToolCard
            name="Image Generator"
            description="Generate images via Leonardo AI with style presets and batch processing."
            category="Media"
            runs={89}
            status="active"
            href="/tools/image-gen"
          />
          <ToolCard
            name="LLM Router"
            description="Route prompts across multiple LLMs with cost-aware fallback logic."
            category="AI"
            runs={67}
            status="active"
            href="/tools/llm-router"
          />
        </div>
      </section>

      {/* Recent Runs */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-[#e1e1e1]">
            Recent Activity
          </h2>
          <button className="text-xs text-[#5a5a5a] transition-colors hover:text-indigo-400">
            View all runs
          </button>
        </div>
        <RecentRuns />
      </section>
    </div>
  )
}
