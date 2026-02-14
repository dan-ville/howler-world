import { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Worlds, moons, and places from the Red Rising original trilogy.",
};

export default function LocationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gold">Locations</h1>
      <p className="mb-8 text-gray-400">
        Worlds, moons, and key locations across the solar system.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <Link
            key={location.slug}
            href={`/locations/${location.slug}`}
            className="group rounded-lg border border-gold/20 bg-obsidian-light p-5 transition-all hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5"
          >
            <h3 className="mb-1 text-lg font-bold text-gray-100 group-hover:text-gold">
              {location.name}
            </h3>
            <p className="mb-3 text-xs font-medium text-mars-red-light uppercase tracking-wide">
              {location.planet}
            </p>
            <p className="text-sm text-gray-400 line-clamp-3">
              {location.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
