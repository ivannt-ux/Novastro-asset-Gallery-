// components/AssetCard.tsx
import Link from "next/link";

export interface Asset {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

interface AssetCardProps {
  asset: Asset; // ✅ Define the asset prop
}

export default function AssetCard({ asset }: AssetCardProps) {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      {asset.image && (
        <img
          src={asset.image}
          alt={asset.name}
          className="w-full h-48 object-cover mb-2 rounded"
        />
      )}
      <h2 className="text-lg font-semibold">{asset.name}</h2>
      {asset.description && (
        <p className="text-sm text-gray-500">{asset.description}</p>
      )}
      <Link
        href={`/assets/${asset.id}`}
        className="inline-block mt-2 text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}