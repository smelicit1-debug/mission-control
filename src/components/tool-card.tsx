import { cn } from "@/lib/utils"
import { Play, MoreHorizontal } from "lucide-react"
import Link from "next/link"

interface ToolCardProps {
  name: string
  description: string
  category: string
  runs: number
  status: "active" | "draft" | "broken"
  href: string
}

const statusColors = {
  active: "bg-emerald-500",
  draft: "bg-amber-500",
  broken: "bg-red-500",
}

export function ToolCard({
  name,
  description,
  category,
  runs,
  status,
  href,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-[#1e1e1e] bg-[#0d0d0d] p-4 transition-all hover:border-[#2a2a2a] hover:bg-[#111111]"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#e1e1e1]">{name}</span>
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                statusColors[status],
              )}
            />
          </div>
          <p className="text-xs leading-relaxed text-[#5a5a5a] line-clamp-2">
            {description}
          </p>
        </div>
        <button className="ml-2 flex h-7 w-7 items-center justify-center rounded text-[#3a3a3a] opacity-0 transition-all hover:bg-[#1e1e1e] hover:text-[#a1a1a1] group-hover:opacity-100">
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3 border-t border-[#181818] pt-3">
        <span className="text-[11px] text-[#4a4a4a]">{category}</span>
        <span className="text-[10px] text-[#3a3a3a]">·</span>
        <span className="text-[11px] text-[#4a4a4a]">{runs} runs</span>
        <div className="ml-auto">
          <button className="flex items-center gap-1 rounded px-2 py-1 text-[11px] text-[#5a5a5a] transition-colors hover:bg-[#181818] hover:text-indigo-400">
            <Play className="h-3 w-3" />
            Run
          </button>
        </div>
      </div>
    </Link>
  )
}
