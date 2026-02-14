import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations } from "@/data/locations";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const location = locations.find((l) => l.slug === params.slug);
  if (!location) return { title: "Location Not Found" };
  return {
    title: location.name,
    description: `${location.name} — ${location.planet}. ${location.description.slice(0, 140)}...`,
  };
}

export default function LocationDetailPage({ params }: PageProps) {
  const location = locations.find((l) => l.slug === params.slug);
  if (!location) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/locations"
        className="mb-6 inline-block text-sm text-gray-400 transition-colors hover:text-gold"
      >
        &larr; All Locations
      </Link>

      <div className="glass-card p-8">
        <h1 className="mb-1 font-heading text-3xl font-bold text-gray-100">
          {location.name}
        </h1>
        <p className="mb-6 text-sm font-medium text-mars-red-light uppercase tracking-wide">
          {location.planet}
        </p>

        <p className="mb-8 leading-relaxed text-gray-300">
          {location.description}
        </p>

        {location.notableEvents.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-wide">
              <span className="h-px w-4 bg-gold/30" />
              Notable Events
            </h2>
            <ul className="space-y-2">
              {location.notableEvents.map((event) => (
                <li key={event} className="flex items-start gap-2 text-gray-300">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mars-red" />
                  {event}
                </li>
              ))}
            </ul>
          </div>
        )}

        {location.associatedCharacters.length > 0 && (
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-wide">
              <span className="h-px w-4 bg-gold/30" />
              Associated Characters
            </h2>
            <div className="flex flex-wrap gap-2">
              {location.associatedCharacters.map((name) => (
                <span
                  key={name}
                  className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-sm text-gray-300"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
