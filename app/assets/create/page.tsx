// app/assets/create/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createAsset } from "@/lib/data";
import { getAccountId, connectWallet } from "@/lib/NearWallet";
import { useRouter } from "next/navigation";

export default function CreateAssetPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getAccountId().then(setAccountId).catch(() => setAccountId(null));
  }, []);

  if (!accountId) {
    return (
      <main className="p-6 text-center">
        <p className="mb-4">Connect your wallet to create an asset.</p>
        <button onClick={() => connectWallet()} className="px-4 py-2 bg-blue-600 rounded text-white">Connect Wallet</button>
      </main>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = createAsset({ name, description });
    router.push(`/assets/${asset.id}`);
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Asset</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full p-3 rounded bg-slate-800"
          placeholder="Asset name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          className="w-full p-3 rounded bg-slate-800"
          placeholder="Short description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white">Create</button>
        </div>
      </form>
    </main>
  );
}
