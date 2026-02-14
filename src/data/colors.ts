import { ColorInfo } from "./types";

export const colors: ColorInfo[] = [
  {
    color: "Gold",
    role: "Rulers & Conquerors",
    description:
      "The apex of the Society's hierarchy. Golds rule as planetary governors, military commanders, and political leaders. They are physically superior — tall, beautiful, and engineered for dominance. Gold children are forged through brutal competition at the Institute. They wield razors, shape-shifting weapons that are the hallmark of their caste. Gold sigils are marked by a triangle with an internal eye-like symbol, representing their all-seeing dominion.",
    notableMembers: [
      "Darrow (adopted)",
      "Mustang",
      "Sevro",
      "Cassius",
      "The Jackal",
      "Nero au Augustus",
      "Octavia au Lune",
      "Lysander au Lune",
      "Apollonius au Valii-Rath",
      "Atalantia au Grimmus",
      "Diomedes au Raa",
      "Atlas au Raa",
      "Alexandar au Arcos",
      "Aja au Grimmus",
      "Kavax au Telemanus",
      "Romulus au Raa",
    ],
    cssClass: "bg-gold text-obsidian-dark",
  },
  {
    color: "Silver",
    role: "Financiers & Industrialists",
    description:
      "Silvers manage the economy of the Society. They are businesspeople, bankers, and captains of industry who keep the machinery of civilization running. While subservient to Golds, Silvers wield enormous economic influence and live in luxury. Some Silvers chafe under Gold rule, seeing themselves as equally capable of leadership. Their sigil bears a trident-like symbol, representing their reach across commerce.",
    notableMembers: ["Regulus ag Sun (Quicksilver)"],
    cssClass: "bg-silver text-obsidian-dark",
  },
  {
    color: "White",
    role: "Clergy & Judges",
    description:
      "Whites serve as priests, judges, and arbiters of the Society's laws and customs. They officiate duels, oversee legal proceedings, and maintain the religious and philosophical framework that justifies the Color hierarchy. Whites are expected to be impartial, though in practice they serve Gold interests. Their sigil features a serpent-and-staff symbol, reflecting their role as interpreters of law and truth.",
    notableMembers: [],
    cssClass: "bg-rr-white text-obsidian-dark border border-obsidian/20",
  },
  {
    color: "Copper",
    role: "Bureaucrats & Administrators",
    description:
      "Coppers are the administrators and bureaucrats who keep the Society's vast governmental apparatus functioning. They manage records, enforce regulations, and handle the day-to-day governance that Golds consider beneath them. Efficient and detail-oriented, Coppers are essential but rarely appreciated. Their sigil is a winged symbol, representing the swift movement of information and orders.",
    notableMembers: ["Publius cu Caraval"],
    cssClass: "bg-copper text-white",
  },
  {
    color: "Blue",
    role: "Navigators & Pilots",
    description:
      "Blues are bred and trained for space navigation and piloting. They crew the Society's vast fleets of starships, their minds engineered for the complex calculations required for interplanetary travel. Blues are often plugged directly into their ships' systems, becoming one with their vessels. Their sigil features a trident-and-arrow symbol pointing in multiple directions, representing navigation across the stars.",
    notableMembers: ["Quinn"],
    cssClass: "bg-rr-blue text-white",
  },
  {
    color: "Yellow",
    role: "Doctors & Scientists",
    description:
      "Yellows are the physicians, researchers, and scientists of the Society. They perform the Carvings that modify bodies, conduct medical research, and maintain the genetic engineering programs that keep the Color system functioning. Yellow Carvers are among the most skilled professionals in the Society. Their sigil is a downward-pointing triangle within a triangle, symbolizing their focus and precision.",
    notableMembers: ["Mickey (Carver)"],
    cssClass: "bg-rr-yellow text-obsidian-dark",
  },
  {
    color: "Green",
    role: "Technicians & Programmers",
    description:
      "Greens are the programmers, hackers, and technology specialists of the Society. They build and maintain the vast computer networks, communication systems, and digital infrastructure that connects the worlds. Greens are essential to both the Society's function and, secretly, to the Rising's operations. Their sigil features a circle with radiating arrows, representing interconnected systems.",
    notableMembers: [],
    cssClass: "bg-rr-green text-white",
  },
  {
    color: "Violet",
    role: "Artists & Creatives",
    description:
      "Violets are the Society's artists, designers, and creative professionals. They create the beauty that Golds surround themselves with — architecture, fashion, music, and visual arts. Violets are valued for their aesthetic contributions but have no political power. Their sigil bears a branching symbol, representing the many forms of creative expression. Mickey the Carver is a Violet who practices the art of body modification.",
    notableMembers: ["Mickey (Carver)"],
    cssClass: "bg-rr-violet text-white",
  },
  {
    color: "Orange",
    role: "Mechanics & Engineers",
    description:
      "Oranges are the engineers and mechanics who maintain the Society's ships, infrastructure, and technology. They are the hands that keep everything running — from starship engines to atmospheric processors. Skilled and practical, Oranges work closely with both Blues and Greens. Their sigil features a gear-like circle, representing the machinery they tend.",
    notableMembers: [],
    cssClass: "bg-rr-orange text-white",
  },
  {
    color: "Gray",
    role: "Soldiers & Police",
    description:
      "Grays serve as the Society's soldiers, police, and security forces. They are the rank-and-file military, enforcing Gold rule through force. Grays are disciplined, trained for combat, and utterly loyal to the hierarchy — though some join the Rising. They crew warships, garrison cities, and fight the wars that Golds command. Their sigil is a horned circle, representing their martial role as the Society's shield and sword.",
    notableMembers: ["Holiday ti Nakamura", "Ephraim ti Horn", "Trigg ti Nakamura"],
    cssClass: "bg-rr-gray text-white",
  },
  {
    color: "Brown",
    role: "Servants & Cooks",
    description:
      "Browns are the domestic servants, cooks, and manual laborers of the Society. They clean the homes of Golds, prepare their food, and perform the countless mundane tasks that keep households and institutions running. Browns are largely invisible to the upper Colors. Their sigil features a crossed-circle symbol, representing their bound service.",
    notableMembers: [],
    cssClass: "bg-brown text-white",
  },
  {
    color: "Obsidian",
    role: "Elite Warriors & Bodyguards",
    description:
      "Obsidians are massive, fearsome warriors bred for combat. They serve as bodyguards and shock troops for the Golds. Obsidians are kept in primitive conditions in the polar regions, told that Golds are gods, and conditioned to serve through religious manipulation. When freed from these lies, Obsidians become some of the Rising's most powerful allies. Their sigil is a crescent moon on black, reflecting the mythological lies used to control them.",
    notableMembers: ["Ragnar Volarus", "Volga Fjorgan", "Tongueless"],
    cssClass: "bg-obsidian text-white",
  },
  {
    color: "Pink",
    role: "Pleasure Servants & Companions",
    description:
      "Pinks are bred and trained for beauty and companionship. They serve as pleasure slaves and social companions for the upper Colors, particularly Golds. Pinks are conditioned from birth for submission and service. Their exploitation is one of the Society's most visible cruelties, and their liberation is a key goal of the Rising. Their sigil is a simple triangle, representing their prescribed role.",
    notableMembers: ["Matteo", "Evey"],
    cssClass: "bg-rr-pink text-obsidian-dark",
  },
  {
    color: "Red",
    role: "Miners & Manual Laborers",
    description:
      "Reds are the foundation of the Society's hierarchy — the base of the pyramid. They toil as miners, farmers, and manual laborers, performing the most dangerous and grueling work. Many Reds, like those in Lykos, are kept underground and deceived about the state of the world above. Their sigil features a circle-and-line symbol, representing the tools of their labor. Darrow's journey from Red Helldiver to revolutionary leader is the beating heart of the saga.",
    notableMembers: ["Darrow (born)", "Eo", "Dancer", "Harmony", "Lyria of Lagalos", "Kieran of Lykos"],
    cssClass: "bg-red text-white",
  },
];
