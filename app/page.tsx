// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="hero bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-center space-y-10 px-4">
        <h1 className="hero-title text-sky-400 drop-shadow-2xl animate-slide-in">
          Novastro Asset Gallery 
        </h1>
        <div className="space-y-6">
          <p className="hero-subtitle text-gray-300 max-w-md mx-auto">
            Transform real-world assets into living onchain profiles. Track milestones like repairs, ownership, and sales with an interactive timeline.
          </p>
          <p className="text-base text-gray-350 max-w-sm mx-auto">
            Join the future of asset provenance on the blockchain.
          </p>
        </div>
        <Link
          href="/login"
          className="btn btn-primary relative overflow-hidden group"
        >
          <span className="relative z-10">Connect Wallet</span>
          <span className="absolute inset-0 bg-sky-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
        </Link>
      </div>
    </div>
  );
}