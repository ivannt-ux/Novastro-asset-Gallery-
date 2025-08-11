import Link from "next/link";

interface AssetCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function AssetCard({ id, name, description, image }: AssetCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        <Link
          href={`/assets/${id}`}
          className="mt-4 inline-block text-teal-500 hover:underline text-sm"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
