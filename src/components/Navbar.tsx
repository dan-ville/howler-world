import Link from "next/link";

const navLinks = [
  { href: "/characters", label: "Characters" },
  { href: "/locations", label: "Locations" },
  { href: "/books", label: "Books" },
  { href: "/colors", label: "Colors" },
  { href: "/glossary", label: "Glossary" },
];

export default function Navbar() {
  return (
    <nav className="bg-obsidian-dark border-b border-gold/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gold">
              Red Rising Wiki
            </span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-2 py-1 text-sm text-gray-300 transition-colors hover:bg-obsidian-light hover:text-gold sm:px-3 sm:py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
