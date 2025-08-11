// app/assets/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAssetById } from "@/lib/data";
import MilestoneTimeline from "@/components/Timeline";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AssetPage({ params }: { params: { id: string } }) {
  const [asset, setAsset] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const a = getAssetById(params.id);
    if (!a) setAsset(null);
    else setAsset(a);
  }, [params.id]);

  if (!asset) {
    return (
      <main className="p-6">
        <p>Asset not found.</p>
        <Link href="/gallery" className="text-blue-400">Back to gallery</Link>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{asset.name}</h1>
          <p className="text-slate-300">{asset.description}</p>
        </div>
        <div className="space-y-2">
          <Link href={`/assets/${asset.id}/milestone`} className="px-3 py-2 bg-blue-600 rounded text-white">Add Milestone</Link>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Timeline</h2>
        <MilestoneTimeline milestones={asset.milestones} />
      </section>
    </main>
  );
}
