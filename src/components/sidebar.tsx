"use client"

import {
  LayoutDashboard,
  Columns3,
  Puzzle,
  History,
  Settings,
  Terminal,
  ChevronDown,
  Plus,
  FolderKanban,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "Board", icon: Columns3, href: "/board" },
  { label: "Projects", icon: FolderKanban, href: "/projects" },
  { label: "Tools", icon: Puzzle, href: "/tools" },
  { label: "Run History", icon: History, href: "/runs" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

const toolLinks = [
  { label: "Web Scraper", href: "/tools/web-scraper" },
  { label: "Image Generator", href: "/tools/image-gen" },
  { label: "Data Transformer", href: "/tools/data-xform" },
  { label: "LLM Router", href: "/tools/llm-router" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-full w-60 flex-col border-r border-[#1e1e1e] bg-[#111111]">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-[#1e1e1e] px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500">
          <Terminal className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-[#e1e1e1]">
          Mission Control
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-2 py-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#1e1e1e] text-[#e1e1e1]"
                  : "text-[#6b6b6b] hover:bg-[#181818] hover:text-[#c1c1c1]",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Quick Tools */}
      <div className="border-t border-[#1e1e1e] px-2 py-3">
        <div className="mb-2 flex items-center justify-between px-2.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#5a5a5a]">
            Quick Tools
          </span>
          <Plus className="h-3 w-3 cursor-pointer text-[#5a5a5a] hover:text-[#c1c1c1]" />
        </div>
        <div className="space-y-0.5">
          {toolLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#1e1e1e] text-[#e1e1e1]"
                  : "text-[#5a5a5a] hover:bg-[#181818] hover:text-[#a1a1a1]",
              )}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/50" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#1e1e1e] px-2 py-2">
        <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-[#5a5a5a] transition-colors hover:bg-[#181818] hover:text-[#c1c1c1]">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1e1e1e] text-[10px] font-medium text-[#8a8a8a]">
            SM
          </div>
          <span className="flex-1 text-left text-sm">smelicit1</span>
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </aside>
  )
}
