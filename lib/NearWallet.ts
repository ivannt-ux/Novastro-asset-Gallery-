// lib/NearWallet.ts
import { setupWalletSelector, WalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

let selector: WalletSelector | null = null;
let accountId: string | null = null;

/**
 * Initialize NEAR wallet selector
 */
export async function initNear() {
  if (!selector) {
    selector = await setupWalletSelector({
      network: "testnet",
      modules: [setupMyNearWallet()],
    });

    const wallet = await selector.wallet();
    const accounts = await wallet.getAccounts();
    accountId = accounts.length > 0 ? accounts[0].accountId : null;

    if (accountId) {
      localStorage.setItem("near_account_id", accountId);
    }
  } else {
    accountId = localStorage.getItem("near_account_id");
  }
}

/**
 * Connect wallet
 */
export async function connectWallet() {
  if (!selector) {
    await initNear();
  }
  const wallet = await selector!.wallet();
  await wallet.signIn({
    contractId: "your-contract.testnet", // Replace with your NEAR contract
  });
  const accounts = await wallet.getAccounts();
  accountId = accounts.length > 0 ? accounts[0].accountId : null;

  if (accountId) {
    localStorage.setItem("near_account_id", accountId);
  }
}

/**
 * Disconnect wallet
 */
export async function disconnectWallet() {
  if (selector) {
    const wallet = await selector.wallet();
    await wallet.signOut();
  }
  accountId = null;
  localStorage.removeItem("near_account_id");
}

/**
 * Get current account ID
 */
export function getAccountId() {
  return accountId || localStorage.getItem("near_account_id");
}