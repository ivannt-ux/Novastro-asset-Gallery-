"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { initNear, connectWallet, disconnectWallet, getAccountId } from "@/lib/NearWallet";

export default function Navbar() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    async function loadAccount() {
      try {
        await initNear();
        const accountId = await getAccountId();
        setAccount(accountId);
      } catch (error) {
        console.error("Failed to load account:", error);
        setAccount(null);
      }
    }
    loadAccount();
  }, []);

  async function handleConnect() {
    try {
      await connectWallet();
      const accountId = await getAccountId();
      setAccount(accountId);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setAccount(null);
    }
  }

  async function handleDisconnect() {
    try {
      await disconnectWallet();
      setAccount(null);
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-2xl text-purple-400">
            Novastro
          </Link>
          <Link href="/gallery" className="hover:text-purple-400 transition duration-300">
            Gallery
          </Link>
          <Link href="/assets/create" className="hover:text-purple-400 transition duration-300">
            Create Asset
          </Link>
        </div>
        <div>
          {account ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">Hello, {account}</span>
              <button
                onClick={handleDisconnect}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg transition duration-300"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}