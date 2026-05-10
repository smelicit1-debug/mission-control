import { Save, Key, Bell, Link, Palette, Globe } from "lucide-react"

const settingsSections = [
  {
    title: "API Keys",
    icon: Key,
    items: [
      { label: "OpenRouter", value: "sk-or-••••••••••••••", status: "connected" as const },
      { label: "Leonardo AI", value: "••••••••-••••-••••", status: "connected" as const },
      { label: "Supabase", value: "sb_••••••••••••••••", status: "connected" as const },
    ],
  },
  {
    title: "Integrations",
    icon: Link,
    items: [
      { label: "Slack", value: "#general, #alerts", status: "active" as const },
      { label: "GitHub", value: "smelicit1-debug", status: "active" as const },
      { label: "Email (Resend)", value: "notifications@...", status: "active" as const },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Slack Alerts", value: "On failure only", status: "enabled" as const },
      { label: "Email Reports", value: "Daily digest", status: "enabled" as const },
      { label: "Run Completion", value: "Off", status: "disabled" as const },
    ],
  },
  {
    title: "Appearance",
    icon: Palette,
    items: [
      { label: "Theme", value: "Dark", status: "active" as const },
      { label: "Accent Color", value: "Indigo", status: "active" as const },
      { label: "Compact Mode", value: "Off", status: "disabled" as const },
    ],
  },
]

export default function SettingsPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-lg font-semibold text-[#f1f1f1]">Settings</h1>
        <p className="mt-0.5 text-xs text-[#5a5a5a]">
          Manage your workspace configuration and integrations
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {settingsSections.map((section) => {
          const Icon = section.icon
          return (
            <div
              key={section.title}
              className="rounded-lg border border-[#1e1e1e] bg-[#0d0d0d]"
            >
              <div className="flex items-center gap-2 border-b border-[#1e1e1e] px-4 py-3">
                <Icon className="h-4 w-4 text-[#5a5a5a]" />
                <h3 className="text-sm font-medium text-[#e1e1e1]">
                  {section.title}
                </h3>
              </div>
              <div className="divide-y divide-[#1a1a1a]">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-[#c1c1c1]">{item.label}</p>
                      <p className="text-xs text-[#5a5a5a]">{item.value}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                        item.status === "connected" || item.status === "active" || item.status === "enabled"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-[#1e1e1e] text-[#5a5a5a]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Save */}
      <div className="flex items-center justify-end gap-3 border-t border-[#1e1e1e] pt-4">
        <button className="rounded-md border border-[#1e1e1e] px-4 py-2 text-xs text-[#c1c1c1] transition-colors hover:bg-[#181818]">
          Reset to Defaults
        </button>
        <button className="flex items-center gap-1.5 rounded-md bg-indigo-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-400">
          <Save className="h-3.5 w-3.5" />
          Save Changes
        </button>
      </div>
    </div>
  )
}
