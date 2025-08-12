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
    async function loadData() {
      try {
        const a = await getAccountId();
        setAccountId(a);
        if (a) {
          const fetchedAssets = await getAllAssets();
          setAssets(fetchedAssets);
        }
      } catch (error) {
        console.error("Failed to load gallery data:", error);
        setAccountId(null);
        setAssets([]);
      }
    }
    loadData();
  }, []);

  // Shared SVG component
  const LogoGraphic = () => (
    <div className="w-32 h-32 mx-auto mb-4">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M10 10 Q50 0 90 10 Q70 50 90 90 Q50 100 10 90 Q30 50 10 10"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="10"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#9333EA" }} />
            <stop offset="100%" style={{ stopColor: "#A855F7" }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  if (!accountId) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <LogoGraphic />
          <h1 className="text-4xl font-bold mb-4 text-purple-400">
            Novastro Provenance Gallery
          </h1>
          <p className="mb-6 text-gray-300">
            Represent real-world assets as living on-chain profiles. Add milestones (repairs, owners, sales) and show a visual, interactive timeline of an asset's life.
          </p>
          <button
            onClick={() => connectWallet()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Connect Your Wallet
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Secure verification via blockchain data
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 text-center sm:text-left">
          <div>
            <LogoGraphic />
            <h1 className="text-4xl font-bold text-purple-400">
              Novastro Provenance Gallery
            </h1>
          </div>
          <Link
            href="/assets/create"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mt-4 sm:mt-0"
          >
            Create Asset
          </Link>
        </div>
        {assets.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            No assets yet. Create one to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}