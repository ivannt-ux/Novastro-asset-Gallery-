// lib/NearWallet.ts
import { setupWalletSelector, WalletSelector } from "@near-wallet-selector/core";
import { setupModal, WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { providers } from "near-api-js";

let selector: WalletSelector | null = null;
let modal: WalletSelectorModal | null = null;
let wallet: any = null;

/**
 * Initialize NEAR wallet selector
 */
export async function initNear() {
  if (!selector) {
    selector = await setupWalletSelector({
      network: "testnet",
      modules: [setupNearWallet()],
    });

    modal = setupModal(selector, { contractId: "example-contract.testnet" });
  }
  return selector;
}

/**
 * Opens wallet selector modal for connection
 */
export async function connectWallet() {
  if (!selector) await initNear();
  if (!modal) throw new Error("Wallet selector modal not initialized");
  modal.show();
}

/**
 * Disconnects the current wallet
 */
export async function disconnectWallet() {
  if (!wallet) return;
  await wallet.signOut();
  wallet = null;
}

/**
 * Returns the currently connected account ID
 */
export async function getAccountId(): Promise<string | null> {
  if (!selector) await initNear();
  const accounts = selector?.store?.getState()?.accounts || [];
  const activeAccount = accounts.find((a: any) => a.active);
  return activeAccount ? activeAccount.accountId : null;
}

/**
 * Get NEAR JSON-RPC provider
 */
export function getProvider() {
  return new providers.JsonRpcProvider({ url: "https://rpc.testnet.near.org" });
}