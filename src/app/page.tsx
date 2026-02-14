import Link from "next/link";

const sections = [
  {
    href: "/characters",
    title: "Characters",
    description:
      "Explore the heroes, villains, and everyone in between — from Darrow to the Sovereign.",
  },
  {
    href: "/locations",
    title: "Locations",
    description:
      "From the mines of Lykos to the halls of Luna, discover the worlds of the Society.",
  },
  {
    href: "/books",
    title: "Books",
    description:
      "Synopses, themes, and key events from all six books of the saga.",
  },
  {
    href: "/colors",
    title: "Colors",
    description:
      "The fourteen-Color caste system that defines every life in the Society.",
  },
  {
    href: "/glossary",
    title: "Glossary",
    description:
      "Terms, concepts, and institutions of the Red Rising universe explained.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-dark via-obsidian to-obsidian-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 animate-fade-in-up">
          <h1 className="mb-3 font-heading text-5xl font-bold tracking-tight text-gold glow-text sm:text-6xl">
            Red Rising Wiki
          </h1>
          <p className="mb-5 text-xl text-mars-red-light italic">
            <span className="inline-block border-l-2 border-mars-red/40 pl-3">
              &quot;Break the chains.&quot;
            </span>
          </p>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Your guide to Pierce Brown&apos;s Red Rising saga. Explore
            characters, locations, the Color hierarchy, and more from{" "}
            <em>Red Rising</em> through <em>Light Bringer</em>.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      </section>

      {/* Table of Contents */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-2xl font-bold text-gray-100">
          Explore the Wiki
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="glass-card gradient-border group p-6 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-gold/5"
            >
              <h3 className="mb-2 font-heading text-lg font-bold text-gold transition-colors group-hover:text-gold-light">
                {section.title}
                <span className="ml-2 inline-block translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  &rarr;
                </span>
              </h3>
              <p className="text-sm text-gray-400">{section.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Brief Intro */}
      <section className="relative border-t border-white/[0.04]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="glass-card p-8">
            <h2 className="mb-4 font-heading text-xl font-bold text-gray-100">
              About the Saga
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                The <em>Red Rising</em> saga by Pierce Brown is a science fiction
                epic set in a future where humanity has colonized the solar system
                and organized itself into a rigid caste system of fourteen Colors.
                At the top stand the Golds — genetically engineered rulers who
                maintain their power through tradition, violence, and the
                subjugation of all others.
              </p>
              <p>
                The story follows Darrow, a Red miner from beneath the surface of
                Mars, who discovers that everything he has been told is a lie. His
                wife Eo dreamed of a free world, and after her death Darrow is
                transformed into a Gold to infiltrate and destroy the Society from
                within. The original trilogy follows his revolution against the
                Society. The second trilogy — <em>Iron Gold</em>,{" "}
                <em>Dark Age</em>, and <em>Light Bringer</em> — explores the
                devastating aftermath: the fragile Solar Republic, new enemies, and
                the question of what comes after the old world burns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
