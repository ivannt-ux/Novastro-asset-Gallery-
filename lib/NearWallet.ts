import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

export async function initNearWallet() {
  const selector = await setupWalletSelector({
    network: "testnet",
    modules: [setupNearWallet()],
  });

  const modal = setupModal(selector, { contractId: "example.testnet" });

  const wallet = await selector.wallet();
  return { selector, modal, wallet };
}
