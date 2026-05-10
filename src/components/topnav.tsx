"use client"

import { Search, Bell, Command } from "lucide-react"

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#1e1e1e] bg-[#0a0a0a] px-6">
      {/* Breadcrumb area */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-[#6b6b6b]">Mission Control</span>
        <span className="text-xs text-[#3a3a3a]">/</span>
        <span className="text-sm font-medium text-[#e1e1e1]">Overview</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-md border border-[#1e1e1e] bg-[#111111] px-3 py-1.5 text-sm text-[#5a5a5a]">
          <Search className="h-3.5 w-3.5" />
          <span className="text-xs">Search tools, runs...</span>
          <div className="ml-4 flex items-center gap-0.5 rounded border border-[#1e1e1e] bg-[#181818] px-1 py-0.5">
            <Command className="h-2.5 w-2.5" />
            <span className="text-[10px]">K</span>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-[#5a5a5a] transition-colors hover:bg-[#181818] hover:text-[#c1c1c1]">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-500" />
        </button>
      </div>
    </header>
  )
}
