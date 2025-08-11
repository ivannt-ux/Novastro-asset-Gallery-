// app/gallery/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllAssets } from "@/lib/data";
import { getAccountId, connectWallet } from "@/lib/NearWallet";
import AssetCard from "@/components/AssetCard";

export default function GalleryPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const a = getAccountId(); // synchronous call now
    setAccountId(a);
    if (a) {
      setAssets(getAllAssets());
    }
  }, []);

  if (!accountId) {
    return (
      <main className="p-6 text-center">
        <p className="mb-4">Please connect your wallet to view the gallery.</p>
        <button
          onClick={() => connectWallet()}
          className="px-4 py-2 bg-blue-600 rounded text-white"
        >
          Connect Wallet
        </button>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Novastro Asset Gallery</h1>
        <Link
          href="/assets/create"
          className="px-3 py-2 bg-green-600 rounded text-white"
        >
          Create Asset
        </Link>
      </div>

      {assets.length === 0 ? (
        <p className="text-slate-400">No assets yet. Create one to get started.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </main>
  );
}