import { Metadata } from "next";
import Link from "next/link";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "Books",
  description:
    "All six books of Pierce Brown's Red Rising saga — from Red Rising to Light Bringer.",
};

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 font-heading text-3xl font-bold text-gold">The Saga</h1>
      <p className="mb-8 text-gray-400">
        All six books of Pierce Brown&apos;s Red Rising saga — the original
        trilogy and the Iron Gold trilogy.
      </p>

      <div className="space-y-6">
        {books.map((book) => (
          <Link
            key={book.slug}
            href={`/books/${book.slug}`}
            className="glass-card gradient-border group block p-6 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-gold/5"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/90 text-sm font-bold text-obsidian-dark ring-2 ring-gold/20">
                {book.position}
              </span>
              <div>
                <h2 className="font-heading text-xl font-bold text-gray-100 group-hover:text-gold transition-colors">
                  {book.title}
                </h2>
                <p className="text-xs text-gray-500">
                  Published {book.year}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 line-clamp-3">
              {book.synopsis}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {book.themes.slice(0, 3).map((theme) => (
                <span
                  key={theme}
                  className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-xs text-gray-400"
                >
                  {theme}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
