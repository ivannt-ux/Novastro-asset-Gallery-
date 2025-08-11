// lib/NearWallet.ts
import { setupWalletSelector, WalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

let selector: WalletSelector | null = null;
let accountId: string | null = null;

// Connect the wallet
export async function connectWallet() {
  if (!selector) {
    selector = await setupWalletSelector({
      network: "testnet",
      modules: [setupMyNearWallet()],
    });
  }
  const wallet = await selector.wallet();
  await wallet.signIn({
    contractId: "your-contract.testnet", // replace with your contract
  });
  const accounts = await wallet.getAccounts();
  accountId = accounts.length > 0 ? accounts[0].accountId : null;
}

// Disconnect the wallet
export async function disconnectWallet() {
  if (selector) {
    const wallet = await selector.wallet();
    await wallet.signOut();
    accountId = null;
  }
}

// Get the current account ID
export function getAccountId() {
  return accountId;
}