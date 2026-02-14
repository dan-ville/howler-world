import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "@/data/books";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const book = books.find((b) => b.slug === params.slug);
  if (!book) return { title: "Book Not Found" };
  return {
    title: book.title,
    description: `${book.title} by Pierce Brown — Book ${book.position} of the Red Rising trilogy.`,
  };
}

export default function BookDetailPage({ params }: PageProps) {
  const book = books.find((b) => b.slug === params.slug);
  if (!book) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/books"
        className="mb-6 inline-block text-sm text-gray-400 transition-colors hover:text-gold"
      >
        &larr; All Books
      </Link>

      <div className="glass-card p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/90 text-lg font-bold text-obsidian-dark ring-2 ring-gold/20">
            {book.position}
          </span>
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-100">{book.title}</h1>
            <p className="text-sm text-gray-500">Published {book.year}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-wide">
            <span className="h-px w-4 bg-gold/30" />
            Synopsis
          </h2>
          <p className="leading-relaxed text-gray-300">{book.synopsis}</p>
        </div>

        <div className="mb-6">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-wide">
            <span className="h-px w-4 bg-gold/30" />
            Major Characters
          </h2>
          <div className="flex flex-wrap gap-2">
            {book.majorCharacters.map((name) => (
              <span
                key={name}
                className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-sm text-gray-300"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-wide">
            <span className="h-px w-4 bg-gold/30" />
            Key Events
          </h2>
          <ul className="space-y-2">
            {book.keyEvents.map((event) => (
              <li key={event} className="flex items-start gap-2 text-gray-300">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mars-red" />
                {event}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-wide">
            <span className="h-px w-4 bg-gold/30" />
            Themes
          </h2>
          <div className="flex flex-wrap gap-2">
            {book.themes.map((theme) => (
              <span
                key={theme}
                className="rounded-md border border-gold/15 bg-gold/[0.04] px-2 py-1 text-sm text-gray-300"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation between books */}
      <div className="mt-8 flex justify-between">
        {book.position > 1 && (
          <Link
            href={`/books/${books.find((b) => b.position === book.position - 1)?.slug}`}
            className="text-sm text-gray-400 transition-colors hover:text-gold"
          >
            &larr;{" "}
            {books.find((b) => b.position === book.position - 1)?.title}
          </Link>
        )}
        <div />
        {book.position < books.length && (
          <Link
            href={`/books/${books.find((b) => b.position === book.position + 1)?.slug}`}
            className="text-sm text-gray-400 transition-colors hover:text-gold"
          >
            {books.find((b) => b.position === book.position + 1)?.title}{" "}
            &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
