import { ArrowLeft, Play, Settings, Clock, Trash2 } from "lucide-react"
import Link from "next/link"
import { RecentRuns } from "@/components/recent-runs"

// This would come from a database or API in production
const toolData: Record<string, { name: string; description: string; category: string; config: { key: string; value: string }[] }> = {
  "web-scraper": {
    name: "Web Scraper",
    description: "Extract structured data from any webpage with CSS selectors and pagination support. Supports dynamic content via headless browser rendering.",
    category: "Data",
    config: [
      { key: "User Agent", value: "MissionControl/1.0" },
      { key: "Timeout", value: "30s" },
      { key: "Rate Limit", value: "10 req/min" },
      { key: "Cache TTL", value: "300s" },
    ],
  },
  "image-gen": {
    name: "Image Generator",
    description: "Generate images via Leonardo AI with style presets, aspect ratio control, and batch processing for up to 4 images per run.",
    category: "Media",
    config: [
      { key: "Model", value: "Leonardo Kino XL" },
      { key: "Default Size", value: "1024x1024" },
      { key: "Style Preset", value: "Cinematic" },
      { key: "Max Batch", value: "4" },
    ],
  },
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tool = toolData[id]

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-[#5a5a5a]">Tool not found</p>
        <Link href="/tools" className="mt-2 text-xs text-indigo-400 hover:underline">
          Back to tools
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      {/* Back + header */}
      <div className="space-y-4">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-xs text-[#5a5a5a] transition-colors hover:text-[#c1c1c1]"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Tools
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-[#f1f1f1]">
                {tool.name}
              </h1>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                Active
              </span>
            </div>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-[#5a5a5a]">
              {tool.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-md border border-[#1e1e1e] px-3 py-1.5 text-xs text-[#c1c1c1] transition-colors hover:bg-[#181818]">
              <Settings className="h-3.5 w-3.5" />
              Configure
            </button>
            <button className="flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-400">
              <Play className="h-3.5 w-3.5" />
              Run Now
            </button>
          </div>
        </div>
      </div>

      {/* Config + activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Config panel */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-[#1e1e1e] bg-[#0d0d0d]">
            <div className="border-b border-[#1e1e1e] px-4 py-3">
              <h3 className="text-sm font-medium text-[#e1e1e1]">
                Configuration
              </h3>
            </div>
            <div className="divide-y divide-[#1a1a1a] px-4 py-2">
              {tool.config.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-xs text-[#5a5a5a]">{item.key}</span>
                  <span className="text-xs font-mono text-[#c1c1c1]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="mt-3 rounded-lg border border-red-500/10 bg-[#0d0d0d] p-4">
            <div className="flex items-center gap-2">
              <Trash2 className="h-3.5 w-3.5 text-red-400" />
              <span className="text-xs font-medium text-red-400">
                Danger Zone
              </span>
            </div>
            <p className="mt-1 text-[11px] text-[#5a5a5a]">
              Deleting this tool is permanent and cannot be undone.
            </p>
            <button className="mt-3 rounded-md border border-red-500/20 px-3 py-1 text-xs text-red-400 transition-colors hover:bg-red-500/10">
              Delete Tool
            </button>
          </div>
        </div>

        {/* Activity */}
        <div className="lg:col-span-2">
          <RecentRuns />
        </div>
      </div>
    </div>
  )
}
