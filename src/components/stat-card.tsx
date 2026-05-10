import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  change?: string
  changeDirection?: "up" | "down" | "neutral"
  icon?: React.ReactNode
}

export function StatCard({
  label,
  value,
  change,
  changeDirection = "neutral",
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-[#1e1e1e] bg-[#0d0d0d] p-4 transition-colors hover:border-[#2a2a2a]">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
            {label}
          </p>
          <p className="text-2xl font-semibold tracking-tight text-[#f1f1f1]">
            {value}
          </p>
        </div>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#181818] text-indigo-400">
            {icon}
          </div>
        )}
      </div>
      {change && (
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={cn(
              "text-xs font-medium",
              changeDirection === "up" && "text-emerald-400",
              changeDirection === "down" && "text-red-400",
              changeDirection === "neutral" && "text-[#6b6b6b]",
            )}
          >
            {change}
          </span>
          <span className="text-xs text-[#4a4a4a]">vs last week</span>
        </div>
      )}
    </div>
  )
}
