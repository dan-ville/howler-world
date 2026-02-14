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
      <h1 className="mb-2 text-3xl font-bold text-gold">The Saga</h1>
      <p className="mb-8 text-gray-400">
        All six books of Pierce Brown&apos;s Red Rising saga — the original
        trilogy and the Iron Gold trilogy.
      </p>

      <div className="space-y-6">
        {books.map((book) => (
          <Link
            key={book.slug}
            href={`/books/${book.slug}`}
            className="group block rounded-lg border border-gold/20 bg-obsidian-light p-6 transition-all hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-obsidian-dark">
                {book.position}
              </span>
              <div>
                <h2 className="text-xl font-bold text-gray-100 group-hover:text-gold">
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
                  className="rounded bg-obsidian px-2 py-1 text-xs text-gray-400"
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
