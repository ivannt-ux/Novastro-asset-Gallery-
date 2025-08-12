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
    <nav className="navbar bg-gray-900 text-white shadow-lg animate-fade-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="navbar-title text-sky-400">
            Novastro
          </Link>
          <div className="navbar-links">
            <Link href="/gallery" className="navbar-link">
              Gallery
            </Link>
            <Link href="/assets/create" className="navbar-link">
              Create Asset
            </Link>
          </div>
        </div>
        <div>
          {account ? (
            <div className="flex items-center gap-6">
              <span className="text-base text-gray-300">Hello, {account}</span>
              <button
                onClick={handleDisconnect}
                className="btn btn-secondary"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="btn btn-primary"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}