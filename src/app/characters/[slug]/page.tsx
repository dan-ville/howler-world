import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { characters } from "@/data/characters";
import ColorBadge from "@/components/ColorBadge";
import { getColorBorderClass } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return characters.map((character) => ({ slug: character.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const character = characters.find((c) => c.slug === params.slug);
  if (!character) return { title: "Character Not Found" };
  return {
    title: character.name,
    description: character.shortDescription,
  };
}

export default function CharacterDetailPage({ params }: PageProps) {
  const character = characters.find((c) => c.slug === params.slug);
  if (!character) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/characters"
        className="mb-6 inline-block text-sm text-gray-400 transition-colors hover:text-gold"
      >
        &larr; All Characters
      </Link>

      <div
        className={`glass-card border-l-4 p-8 ${getColorBorderClass(character.color)}`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h1 className="font-heading text-3xl font-bold text-gray-100">
            {character.name}
          </h1>
          <ColorBadge color={character.color} size="md" />
        </div>

        {character.aliases.length > 0 && (
          <p className="mb-6 text-gray-400 italic">
            Also known as: {character.aliases.join(", ")}
          </p>
        )}

        <p className="mb-8 leading-relaxed text-gray-300">
          {character.description}
        </p>

        <div className="space-y-4">
          {character.affiliations.length > 0 && (
            <div>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-wide">
                <span className="h-px w-4 bg-gold/30" />
                Affiliations
              </h2>
              <div className="flex flex-wrap gap-2">
                {character.affiliations.map((affiliation) => (
                  <span
                    key={affiliation}
                    className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-sm text-gray-300"
                  >
                    {affiliation}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-wide">
              <span className="h-px w-4 bg-gold/30" />
              Appears In
            </h2>
            <div className="flex flex-wrap gap-2">
              {character.books.map((book) => (
                <Link
                  key={book}
                  href={`/books/${book.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-sm text-gray-300 transition-colors hover:text-gold"
                >
                  {book}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
