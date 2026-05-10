"use client"

import { useState, type FormEvent } from "react"
import { useProjectStore } from "./project-store"
import {
  type Asset,
  assetTypeLabels,
  assetTypeColors,
} from "./project-data"

interface AssetsSectionProps {
  projectId: string
  assets: Asset[]
}

const assetTypes: Asset["type"][] = ["link", "image", "file", "reference"]

export function AssetsSection({ projectId, assets }: AssetsSectionProps) {
  const { addAsset, deleteAsset } = useProjectStore()
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [type, setType] = useState<Asset["type"]>("link")

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedUrl = url.trim()
    if (!trimmedTitle || !trimmedUrl) return
    addAsset(projectId, trimmedTitle, trimmedUrl, type)
    setTitle("")
    setUrl("")
    setType("link")
  }

  return (
    <div className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
      <h3 className="mb-3 text-[15px] font-medium text-[#f1f1f1]">Assets</h3>

      {/* Add form */}
      <form onSubmit={handleAdd} className="mb-3 space-y-2">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded border border-[#1e1e1e] bg-[#111] px-3 py-1.5 text-[12px] text-[#f1f1f1] placeholder-[#5a5a5a] outline-none focus:border-indigo-500"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Asset["type"])}
            className="rounded border border-[#1e1e1e] bg-[#111] px-2 py-1.5 text-[12px] text-[#f1f1f1] outline-none focus:border-indigo-500"
          >
            {assetTypes.map((t) => (
              <option key={t} value={t}>
                {assetTypeLabels[t]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="min-w-0 flex-1 rounded border border-[#1e1e1e] bg-[#111] px-3 py-1.5 text-[12px] text-[#f1f1f1] placeholder-[#5a5a5a] outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!title.trim() || !url.trim()}
            className="shrink-0 rounded bg-indigo-500 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add
          </button>
        </div>
      </form>

      {/* Assets list */}
      {assets.length === 0 ? (
        <p className="py-2 text-center text-[12px] text-[#5a5a5a]">
          No assets yet.
        </p>
      ) : (
        <ul className="space-y-1">
          {assets.map((asset) => (
            <AssetRow
              key={asset.id}
              asset={asset}
              onDelete={() => deleteAsset(projectId, asset.id)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

function AssetRow({
  asset,
  onDelete,
}: {
  asset: Asset
  onDelete: () => void
}) {
  return (
    <li className="group flex items-center gap-2 rounded px-2 py-1.5 transition-colors hover:bg-[#111]">
      <a
        href={asset.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 flex-1 items-center gap-2"
      >
        <span className="truncate text-[12px] text-indigo-400 underline-offset-2 hover:underline">
          {asset.title}
        </span>
        <span
          className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${assetTypeColors[asset.type]}`}
        >
          {assetTypeLabels[asset.type]}
        </span>
      </a>
      <button
        onClick={onDelete}
        className="shrink-0 text-[11px] text-[#5a5a5a] opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
        title="Delete asset"
      >
        &times;
      </button>
    </li>
  )
}
