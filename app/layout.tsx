// app/layout.tsx
import "../styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Novastro Provenance Gallery",
  description: "Living on-chain provenance for real-world assets."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 min-h-screen text-slate-100">
        <Navbar />
        <main className="max-w-4xl mx-auto p-4">{children}</main>
        <footer className="text-center text-sm text-slate-400 py-6">
          © {new Date().getFullYear()} Novastro — Living on-chain provenance.
        </footer>
      </body>
    </html>
  );
}
