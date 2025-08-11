// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-extrabold mb-4">Novastro Provenance Gallery</h1>
      <p className="text-slate-300 max-w-xl mx-auto mb-8">
        Represent real-world assets as living onchain profiles. Add milestones (repairs, owners, sales) and
        show a visual, interactive timeline of an asset’s life.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/login" className="px-5 py-3 bg-blue-600 rounded text-white">Connect Wallet</Link>
        <Link href="/gallery" className="px-5 py-3 bg-slate-800 border border-slate-700 rounded text-white">View Gallery</Link>
        <Link href="/assets/create" className="px-5 py-3 bg-green-600 rounded text-white">Create Asset</Link>
      </div>
    </div>
  );
}
