// lib/types.ts
export interface Asset {
  id: string | number; // Unique identifier for the asset
  name: string;        // Name of the asset
  description?: string; // Optional description
  // Add other fields based on your getAllAssets data, e.g.:
  // owner: string;      // Wallet address of the owner
  // createdAt?: Date;   // Creation timestamp
  // imageUrl?: string;  // URL to asset image
}