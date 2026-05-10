import { Plus, Search } from "lucide-react"
import { ToolCard } from "@/components/tool-card"

const allTools = [
  { name: "Web Scraper", description: "Extract structured data from any webpage with CSS selectors and pagination support.", category: "Data", runs: 142, status: "active" as const, href: "/tools/web-scraper" },
  { name: "Image Generator", description: "Generate images via Leonardo AI with style presets and batch processing.", category: "Media", runs: 89, status: "active" as const, href: "/tools/image-gen" },
  { name: "Data Transformer", description: "Transform, filter, and reshape JSON/CSV data pipelines.", category: "Data", runs: 56, status: "active" as const, href: "/tools/data-xform" },
  { name: "LLM Router", description: "Route prompts across multiple LLMs with cost-aware fallback logic.", category: "AI", runs: 67, status: "active" as const, href: "/tools/llm-router" },
  { name: "SEO Analyzer", description: "Audit pages for meta tags, structure, and ranking signals.", category: "Marketing", runs: 34, status: "draft" as const, href: "/tools/seo-analyzer" },
  { name: "Slack Notifier", description: "Post formatted alerts to Slack channels from any tool run.", category: "Integrations", runs: 23, status: "active" as const, href: "/tools/slack-notifier" },
  { name: "GitHub Release Bot", description: "Auto-generate release notes and publish GitHub releases.", category: "DevOps", runs: 18, status: "active" as const, href: "/tools/gh-release" },
  { name: "PDF Report Builder", description: "Assemble and style PDF reports from template + JSON data.", category: "Documents", runs: 12, status: "draft" as const, href: "/tools/pdf-builder" },
  { name: "API Monitor", description: "Health-check endpoints and alert on status changes.", category: "Monitoring", runs: 9, status: "broken" as const, href: "/tools/api-monitor" },
]

export default function ToolsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-[#f1f1f1]">Tools</h1>
          <p className="mt-0.5 text-xs text-[#5a5a5a]">
            {allTools.filter((t) => t.status === "active").length} active ·{" "}
            {allTools.length} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-md border border-[#1e1e1e] bg-[#111111] px-3 py-1.5 text-sm">
            <Search className="h-3.5 w-3.5 text-[#5a5a5a]" />
            <input
              type="text"
              placeholder="Filter tools..."
              className="w-40 bg-transparent text-xs text-[#c1c1c1] placeholder-[#5a5a5a] outline-none"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-400">
            <Plus className="h-3.5 w-3.5" />
            New Tool
          </button>
        </div>
      </div>

      {/* Tool grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allTools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </div>
  )
}
