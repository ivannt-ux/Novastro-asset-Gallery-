"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { initNear, connectWallet, disconnectWallet, getAccountId } from "@/lib/NearWallet";

export default function Navbar() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    async function loadAccount() {
      await initNear();
      const accountId = await getAccountId();
      setAccount(accountId);
    }
    loadAccount();
  }, []);

  async function handleConnect() {
    await connectWallet();
    const accountId = await getAccountId();
    setAccount(accountId);
  }

  async function handleDisconnect() {
    await disconnectWallet();
    setAccount(null);
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-lg">
          Novastro Gallery
        </Link>
        <Link href="/gallery" className="hover:underline">
          Gallery
        </Link>
        <Link href="/assets/create" className="hover:underline">
          Create Asset
        </Link>
      </div>

      <div>
        {account ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Hello, {account}</span>
            <button
              onClick={handleDisconnect}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}