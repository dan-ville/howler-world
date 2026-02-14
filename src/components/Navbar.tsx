import Link from "next/link";

const navLinks = [
  { href: "/characters", label: "Characters" },
  { href: "/locations", label: "Locations" },
  { href: "/galaxy", label: "Galaxy Map" },
  { href: "/books", label: "Books" },
  { href: "/colors", label: "Colors" },
  { href: "/glossary", label: "Glossary" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gold/10 bg-obsidian-dark/70 backdrop-blur-xl">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold text-gold glow-text">
              Red Rising Wiki
            </span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative rounded px-2 py-1 text-sm text-gray-400 transition-colors hover:text-gold sm:px-3 sm:py-2"
              >
                {link.label}
                <span className="absolute inset-x-2 -bottom-px h-px scale-x-0 bg-gold/50 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
