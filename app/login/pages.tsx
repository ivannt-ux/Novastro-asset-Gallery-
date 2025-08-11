// app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { connectWallet, getAccountId, disconnectWallet } from "@/lib/NearWallet";
import "@near-wallet-selector/modal-ui/styles.css";

export default function LoginPage() {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // on mount try to see if already connected
    getAccountId().then(setAccountId).catch(() => setAccountId(null));
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await connectWallet(); // opens selector modal
      const id = await getAccountId();
      setAccountId(id);
    } catch (err) {
      console.error("connect error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      await disconnectWallet();
      setAccountId(null);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>

      {!accountId ? (
        <>
          <p className="mb-4 text-slate-300">Connect your NEAR wallet (modal will open in-app).</p>
          <button
            onClick={handleConnect}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 rounded text-white disabled:opacity-60"
          >
            {loading ? "Opening..." : "Connect NEAR Wallet"}
          </button>
        </>
      ) : (
        <>
          <p className="mb-4">Connected as <span className="font-medium">{accountId}</span></p>
          <button
            onClick={handleDisconnect}
            disabled={loading}
            className="px-4 py-2 bg-red-600 rounded text-white disabled:opacity-60"
          >
            Disconnect
          </button>
        </>
      )}
    </main>
  );
}
