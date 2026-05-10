# Mission Control

Custom tools & operator dashboard — Linear-inspired, built with Next.js 16.

**Dashboard:** `https://mission.openclawtank.com`  
**Repo:** `github.com/smelicit1-debug/mission-control`

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 + `class-variance-authority`
- **Icons:** Lucide React
- **Font:** Geist (Vercel)
- **Deployment:** Vercel (auto-deploy on push to `main`)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout (Sidebar + TopNav + Main)
│   ├── page.tsx          # Overview dashboard (stats, recent tools, activity)
│   ├── tools/
│   │   ├── page.tsx      # Tools catalog
│   │   └── [id]/
│   │       └── page.tsx  # Individual tool detail (config, runs, danger zone)
│   ├── runs/
│   │   └── page.tsx      # Run history
│   └── settings/
│       └── page.tsx      # Settings (API keys, integrations, notifications, theme)
├── components/
│   ├── sidebar.tsx       # Linear-style dark sidebar
│   ├── topnav.tsx        # Top bar with search ⌘K, notifications
│   ├── stat-card.tsx     # Metric card with change indicator
│   ├── tool-card.tsx     # Tool card with status dot and quick-run
│   └── recent-runs.tsx   # Activity feed table
└── lib/
    └── utils.ts          # cn() utility
```

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/smelicit1-debug/mission-control)

After deploying:
1. Go to **Vercel Dashboard > Project > Settings > Domains**
2. Add `mission.openclawtank.com`
3. Create a CNAME record in Netlify DNS:
   - **Type:** CNAME
   - **Name:** mission
   - **Target:** `cname.vercel-dns.com`
   - **TTL:** 3600

## Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Design Principles

- **Dark-only:** True dark theme, `#0a0a0a` background
- **Linear-inspired:** Clean sidebar, thin borders (`#1e1e1e`), subtle dividers
- **Accent:** Indigo (`#6366f1`) for CTAs, emerald for success, red for errors
- **Spacing:** Compact, information-dense layouts
- **Typography:** Geist sans, 11px-13px body, 15px-18px headings
