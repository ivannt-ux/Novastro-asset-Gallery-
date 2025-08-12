import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata = {
  title: "Novastro Provenance Gallery",
  description: "Living on-chain provenance for real-world assets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-gray-900 min-h-screen text-white" style={{ backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADYSURBVHgBjZJBEsMgDARtP7/8/P+AAJ8AhG6v7u46uS+Z2wZsaU2VmTVuLl6L9pIb+9dK8bMyF4zsSMmY8nO8/DCCGS7Gws9KEZ8uL4GCgQoxJg6VN+32rL6T9eRYbCaKfKjOG1fpiXJuWqVYxppb6DcmhJObaxBBUjtM+ae36/4nD6Xj0J7+nxX0D4iHMM/DuYoQ6u+v9fY5GfX0mAwEtsuLs3X3em4zN9Xs5aoqV/n9T5J1LiXwDA4P34ynQJAAAAAElFTkSuQmCC')", backgroundRepeat: "repeat" }}>
        <Navbar />
        <main className="max-w-6xl mx-auto p-6 animate-fade-in">{children}</main>
        <footer className="text-center text-base text-sky-300 py-8 animate-fade-in">
          © {new Date().getFullYear()} Novastro — Living on-chain provenance.
        </footer>
      </body>
    </html>
  );
}