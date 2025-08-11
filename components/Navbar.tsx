"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { useEffect, useState } from "react";
import { initNearWallet } from "@/lib/NearWallet";

export default function Navbar() {
  const pathname = usePathname();
  const [selector, setSelector] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    async function initWallet() {
      const { selector, wallet } = await initNearWallet();
      setSelector(selector);
      setWallet(wallet);

      const accounts = await wallet?.getAccounts();
      if (accounts?.length > 0) {
        setAccountId(accounts[0].accountId);
      }
    }
    initWallet();
  }, []);

  const handleSignIn = async () => {
    const modal = new WalletSelectorModal(selector, { contractId: "example.testnet" });
    modal.show();
  };

  const handleSignOut = async () => {
    if (wallet) {
      await wallet.signOut();
      setAccountId(null);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-lg">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Novastro
        </Link>
        <Link
          href="/gallery"
          className={`hover:text-teal-400 ${pathname === "/gallery" ? "text-teal-300" : ""}`}
        >
          Gallery
        </Link>
        <Link
          href="/login"
          className={`hover:text-teal-400 ${pathname === "/login" ? "text-teal-300" : ""}`}
        >
          Login
        </Link>
      </div>
      <div>
        {accountId ? (
          <div className="flex items-center space-x-4">
            <span className="bg-gray-800 px-3 py-1 rounded-lg">{accountId}</span>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-teal-500 hover:bg-teal-600 px-3 py-1 rounded-lg"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
