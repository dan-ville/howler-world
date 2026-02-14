import { Metadata } from "next";
import { characters } from "@/data/characters";
import SearchFilter from "@/components/SearchFilter";

export const metadata: Metadata = {
  title: "Characters",
  description:
    "All major characters from the Red Rising saga — Red Rising through Light Bringer.",
};

export default function CharactersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gold">Characters</h1>
      <p className="mb-8 text-gray-400">
        Major characters of the Red Rising saga. Use the
        filters to search by name, Color, or book appearance.
      </p>
      <SearchFilter characters={characters} />
    </div>
  );
}
