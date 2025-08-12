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
    <nav className="navbar bg-gray-900 text-white shadow-md py-3 px-4 sticky top-0 z-50 animate-fade-in">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="navbar-title text-sky-400 text-2xl font-bold tracking-wide">
            Novastro
          </Link>
          <div className="flex space-x-6">
            <Link href="/gallery" className="navbar-link text-lg text-sky-300 hover:text-sky-100 transition-colors duration-200">
              Gallery
            </Link>
            <Link href="/assets/create" className="navbar-link text-lg text-sky-300 hover:text-sky-100 transition-colors duration-200">
              Create Asset
            </Link>
          </div>
        </div>
        <div>
          {account ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Connected: {account}</span>
              <button
                onClick={handleDisconnect}
                className="btn btn-secondary px-4 py-2 text-sm rounded-full"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={(e) => { e.preventDefault(); handleConnect(); }}
              className="btn btn-primary relative overflow-hidden inline-block"
            >
              <span className="relative z-10 px-6 py-2 text-base font-semibold bg-sky-600 rounded-full shadow-md transform transition-all duration-300 hover:scale-105">
                Connect Wallet
              </span>
              <span className="absolute inset-0 bg-sky-400 opacity-0 hover:opacity-60 transition-opacity duration-300 rounded-full"></span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}