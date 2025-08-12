import { Asset } from "@/lib/types";

interface AssetCardProps {
  asset: Asset;
}

export default function AssetCard({ asset }: AssetCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <h3 className="text-lg font-semibold text-purple-400">{asset.name}</h3>
      <p className="text-gray-300 mt-2">{asset.description}</p>
      <Link href={`/assets/${asset.id}`} className="text-purple-400 hover:underline mt-4 inline-block">
        View Details
      </Link>
    </div>
  );
}