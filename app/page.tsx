// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="hero bg-gray-900">
      <div className="text-center space-y-12 py-16 px-4">
        <h1 className="hero-title text-sky-400 drop-shadow-lg">
          Novastro Provenance
        </h1>
        <div className="space-y-6">
          <h2 className="hero-subtitle text-gray-200">
            Unleash the power of onchain provenance. Track assets with milestones—repairs, ownership changes, and sales—through an interactive timeline.
          </h2>
          <p className="text-lg md:text-xl font-light text-gray-400 max-w-xl mx-auto">
            Start your journey today and bring your assets to life on the blockchain.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/login" className="btn btn-primary">
            Connect Wallet
          </Link>
          <Link href="/gallery" className="btn btn-secondary">
            Explore Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}