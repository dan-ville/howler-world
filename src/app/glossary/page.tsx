import { Metadata } from "next";
import { glossary } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Terms, concepts, and institutions from the Red Rising universe.",
};

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));

  // Group by first letter
  const grouped = sorted.reduce<Record<string, typeof sorted>>(
    (acc, term) => {
      const letter = term.term[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(term);
      return acc;
    },
    {}
  );

  const letters = Object.keys(grouped).sort();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gold">Glossary</h1>
      <p className="mb-8 text-gray-400">
        Key terms, concepts, and institutions from the Red Rising universe,
        alphabetically organized.
      </p>

      {/* Letter quick-nav */}
      <div className="mb-8 flex flex-wrap gap-2">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="flex h-8 w-8 items-center justify-center rounded bg-obsidian-light text-sm font-bold text-gray-400 transition-colors hover:bg-gold hover:text-obsidian-dark"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Terms */}
      <div className="space-y-10">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="mb-4 border-b border-gold/20 pb-2 text-xl font-bold text-gold">
              {letter}
            </h2>
            <div className="space-y-6">
              {grouped[letter].map((entry) => (
                <div key={entry.term}>
                  <h3 className="mb-1 text-lg font-semibold text-gray-100">
                    {entry.term}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {entry.definition}
                  </p>
                  {entry.relatedTerms.length > 0 && (
                    <p className="mt-2 text-xs text-gray-500">
                      <span className="font-semibold">Related:</span>{" "}
                      {entry.relatedTerms.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
