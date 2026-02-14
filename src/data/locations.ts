import { Location } from "./types";

export const locations: Location[] = [
  {
    slug: "lykos",
    name: "Lykos",
    planet: "Mars (Subsurface)",
    description:
      "Lykos is a subterranean Red mining colony deep beneath the surface of Mars. Its inhabitants, including Darrow, are Helldivers who mine helium-3 while believing they are terraforming the planet for future generations. In reality, Mars was terraformed long ago, and the Reds of Lykos are slaves kept ignorant of the world above. Lykos is a claustrophobic, harsh place defined by hard labor, tight tunnels, and a close-knit community bound together by shared suffering.",
    notableEvents: [
      "Darrow's life as a Helldiver",
      "Eo's execution by hanging",
      "Darrow's recruitment by the Sons of Ares",
    ],
    associatedCharacters: ["Darrow", "Eo", "Dancer", "Harmony"],
  },
  {
    slug: "the-institute",
    name: "The Institute",
    planet: "Mars (Surface)",
    description:
      "The Institute is a brutal proving ground where young Golds are forged into leaders. Students are divided into houses named after Roman gods and must conquer rival houses through warfare, strategy, and sheer brutality. The Passage — a fight to the death between paired students — begins the trials. The Institute is where Darrow first proves himself as a Gold, conquering House Mars and demonstrating the tactical genius that will carry him through the trilogy.",
    notableEvents: [
      "The Passage — students kill their paired partner",
      "Darrow's conquest as Primus of House Mars",
      "Formation of the Howlers",
      "The Jackal cutting off his own hand",
    ],
    associatedCharacters: [
      "Darrow",
      "Mustang",
      "Sevro",
      "Cassius",
      "The Jackal",
      "Roque",
      "Fitchner",
    ],
  },
  {
    slug: "agea",
    name: "Agea",
    planet: "Mars",
    description:
      "Agea is the capital city of Mars and seat of the ArchGovernor. A sprawling Gold metropolis on the Martian surface, it is the political heart of Mars where the great houses scheme and maneuver for power. Darrow enters Gold society in Agea after winning the Institute and becomes a lancer of House Augustus within its glittering halls.",
    notableEvents: [
      "Darrow's entry into Gold society",
      "Political intrigues of the Great Houses",
      "The Gala massacre",
    ],
    associatedCharacters: [
      "Darrow",
      "Nero au Augustus",
      "Mustang",
      "Cassius",
    ],
  },
  {
    slug: "luna",
    name: "Luna",
    planet: "Earth's Moon",
    description:
      "Luna is the seat of the Sovereign and the political capital of the entire Society. From here, Octavia au Lune rules over all the Color-coded worlds. Luna is a place of extreme wealth and opulence for the Golds, and extreme servitude for everyone else. The Citadel of the Sovereign dominates the landscape, and the moon serves as the ultimate prize in the war between the Rising and the Society.",
    notableEvents: [
      "Seat of the Sovereign's power",
      "The final battle of Morning Star",
      "Fall of the Society",
      "Capital of the Solar Republic",
      "Mustang governs as Sovereign of the Republic",
      "Atalantia's assault on Luna in Light Bringer",
    ],
    associatedCharacters: [
      "Octavia au Lune",
      "Matteo",
      "Darrow",
      "Mustang",
      "Lysander",
      "Ephraim",
    ],
  },
  {
    slug: "olympus-mons",
    name: "Olympus Mons",
    planet: "Mars",
    description:
      "Olympus Mons, the tallest mountain in the solar system, serves as a significant landmark on Mars. In the Society, it holds strategic and symbolic importance. Its massive caldera and surrounding regions feature in the military campaigns that sweep across Mars during the Rising.",
    notableEvents: [
      "Military engagements during the Rising",
      "Strategic significance in the Martian campaigns",
    ],
    associatedCharacters: ["Darrow", "Nero au Augustus"],
  },
  {
    slug: "the-rim",
    name: "The Rim",
    planet: "Outer Planets (Jupiter & Saturn Systems)",
    description:
      "The Rim refers to the outer planets and their moons — the domains of the Rim Golds. The Moon Lords of the Rim maintain a distinct culture from the Core Golds, valuing austerity, martial prowess, and self-reliance over the decadence of Luna and Mars. The Rim's neutrality or allegiance is a pivotal factor in the power struggles of the trilogy.",
    notableEvents: [
      "Lorn au Arcos's retirement on Europa",
      "Political negotiations with the Moon Lords",
      "Rim fleet's role in the war",
      "Lysander and Cassius arrive in exile",
      "Lysander's campaign against the Rim",
      "The climactic Battle of the Rim in Light Bringer",
    ],
    associatedCharacters: ["Lorn au Arcos", "Romulus au Raa", "Diomedes au Raa", "Lysander", "Cassius"],
  },
  {
    slug: "earth",
    name: "Earth",
    planet: "Earth",
    description:
      "Earth, the cradle of humanity, still exists in the Society but is no longer the center of power. Much of its history has been rewritten or forgotten. It remains populated but is overshadowed by Luna and Mars as centers of political and military power. Earth serves as a reminder of what humanity was before the Color system remade civilization.",
    notableEvents: [
      "Original home of humanity",
      "Diminished role under the Society",
    ],
    associatedCharacters: [],
  },
  {
    slug: "ganymede",
    name: "Ganymede",
    planet: "Jupiter System",
    description:
      "Ganymede is one of Jupiter's moons and a significant Rim settlement. Home to Rim Gold families and their fleets, Ganymede represents the power and independence of the outer colonies. Its shipyards and military installations make it a strategic prize in any conflict that extends beyond the Core worlds.",
    notableEvents: [
      "Rim Gold stronghold",
      "Strategic military significance",
      "Dockyards of Ganymede destroyed in Dark Age",
      "Major battle site in Light Bringer",
    ],
    associatedCharacters: ["Romulus au Raa", "Diomedes au Raa"],
  },
  {
    slug: "phobos",
    name: "Phobos",
    planet: "Mars (Moon)",
    description:
      "Phobos is one of Mars's two moons and a major hub of commerce, entertainment, and vice. Its docking stations serve as a gateway to Mars, and its lower levels contain fight pits, pleasure houses, and black markets. Phobos plays a crucial role in Golden Son, serving as the site of major plot developments and betrayals.",
    notableEvents: [
      "Key events during Golden Son",
      "Major battle and betrayal",
      "Hub of Martian commerce",
    ],
    associatedCharacters: ["Darrow", "Sevro", "Cassius"],
  },
  {
    slug: "tinos",
    name: "Tinos",
    planet: "Asteroid Belt",
    description:
      "Tinos is a hidden rebel base used by the Sons of Ares. Located in the asteroid belt, it serves as a refuge for escaped low-Colors and a staging ground for resistance operations. Tinos represents the fragile hope of the rebellion — a place where Reds, Obsidians, and other oppressed Colors can live free, however tenuously.",
    notableEvents: [
      "Sons of Ares headquarters",
      "Ragnar's time as the Shield of Tinos",
      "Rebel planning and staging",
    ],
    associatedCharacters: ["Dancer", "Sevro", "Ragnar", "Harmony"],
  },
  {
    slug: "mercury",
    name: "Mercury",
    planet: "Mercury",
    description:
      "Mercury is the sun-scorched innermost planet, a world of extreme heat, vast deserts, and fortified cities built to withstand solar radiation. In the post-Rising era, Mercury becomes the primary battleground between Darrow's Free Legions and the Society Remnant. Darrow's unsanctioned invasion of Mercury triggers a devastating war that consumes much of Iron Gold and Dark Age. The planet's brutal environment becomes as much an enemy as the opposing forces, and the siege of Mercury is one of the saga's most harrowing sequences.",
    notableEvents: [
      "Darrow's unsanctioned invasion",
      "The Ash Lord's trap",
      "The Fall of Heliopolis",
      "The Storm Gods' bombardment",
      "Darrow stranded and besieged in Dark Age",
      "Lysander's betrayal at the Battle of Mercury",
    ],
    associatedCharacters: [
      "Darrow",
      "Lysander",
      "Atalantia",
      "Alexandar au Arcos",
      "Atlas au Raa",
    ],
  },
  {
    slug: "heliopolis",
    name: "Heliopolis",
    planet: "Mercury",
    description:
      "Heliopolis is a major city on Mercury and a key strategic objective during Darrow's campaign. A sprawling metropolis shielded from the sun's radiation, Heliopolis becomes the site of one of the war's most devastating battles. Its fall marks a turning point in the Mercury campaign and demonstrates the horrifying cost of the conflict between the Republic and the Society Remnant.",
    notableEvents: [
      "Major battle during the Mercury campaign",
      "The Fall of Heliopolis in Dark Age",
      "Massive civilian and military casualties",
    ],
    associatedCharacters: ["Darrow", "Atalantia", "Lysander"],
  },
  {
    slug: "europa",
    name: "Europa",
    planet: "Jupiter System",
    description:
      "Europa is one of Jupiter's moons and a stronghold of the Rim Dominion. An ice-covered world with a subsurface ocean, Europa is home to Rim Gold families who maintain a more austere and martial culture than the Core Golds. Lorn au Arcos retired to Europa, and House Raa holds significant influence here. Europa plays an increasingly important role in the later books as the Rim becomes a decisive factor in the war.",
    notableEvents: [
      "Lorn au Arcos's retirement home",
      "Rim Gold cultural center",
      "Key location in Light Bringer's Rim campaign",
    ],
    associatedCharacters: ["Lorn au Arcos", "Diomedes au Raa", "Cassius"],
  },
];
