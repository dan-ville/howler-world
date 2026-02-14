import Link from "next/link";
import { Character } from "@/data/types";
import { getColorBorderClass } from "@/lib/utils";
import ColorBadge from "./ColorBadge";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      className={`glass-card block border-l-4 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-gold/10 ${getColorBorderClass(character.color)}`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-heading font-bold text-gray-100">{character.name}</h3>
        <ColorBadge color={character.color} />
      </div>
      {character.aliases.length > 0 && (
        <p className="mb-2 text-xs text-gray-400 italic">
          {character.aliases.join(" · ")}
        </p>
      )}
      <p className="text-sm text-gray-300 line-clamp-2">
        {character.shortDescription}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {character.books.map((book) => (
          <span
            key={book}
            className="rounded border border-white/[0.06] bg-white/[0.04] px-1.5 py-0.5 text-xs text-gray-400"
          >
            {book}
          </span>
        ))}
      </div>
    </Link>
  );
}
