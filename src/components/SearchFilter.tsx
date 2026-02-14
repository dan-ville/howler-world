"use client";

import { useState } from "react";
import { Character, Color, BookTitle } from "@/data/types";
import CharacterCard from "./CharacterCard";

const ALL_COLORS: Color[] = [
  "Gold",
  "Silver",
  "White",
  "Copper",
  "Blue",
  "Yellow",
  "Green",
  "Violet",
  "Orange",
  "Gray",
  "Brown",
  "Obsidian",
  "Pink",
  "Red",
];

const ALL_BOOKS: BookTitle[] = ["Red Rising", "Golden Son", "Morning Star", "Iron Gold", "Dark Age", "Light Bringer"];

interface SearchFilterProps {
  characters: Character[];
}

export default function SearchFilter({ characters }: SearchFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState<Color | "">("");
  const [selectedBook, setSelectedBook] = useState<BookTitle | "">("");

  const usedColors = ALL_COLORS.filter((color) =>
    characters.some((c) => c.color === color)
  );

  const filtered = characters.filter((character) => {
    const matchesSearch =
      search === "" ||
      character.name.toLowerCase().includes(search.toLowerCase()) ||
      character.aliases.some((a) =>
        a.toLowerCase().includes(search.toLowerCase())
      );

    const matchesColor =
      selectedColor === "" || character.color === selectedColor;

    const matchesBook =
      selectedBook === "" || character.books.includes(selectedBook);

    return matchesSearch && matchesColor && matchesBook;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name or alias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-gray-100 placeholder-gray-500 outline-none backdrop-blur-sm transition-all focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
        />
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value as Color | "")}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-gray-100 outline-none backdrop-blur-sm transition-all focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
        >
          <option value="">All Colors</option>
          {usedColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value as BookTitle | "")}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-gray-100 outline-none backdrop-blur-sm transition-all focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
        >
          <option value="">All Books</option>
          {ALL_BOOKS.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-gray-400">
          No characters match your filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))}
        </div>
      )}

      <p className="mt-4 text-sm text-gray-500">
        Showing {filtered.length} of {characters.length} characters
      </p>
    </div>
  );
}
