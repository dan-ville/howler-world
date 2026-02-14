import { Color } from "@/data/types";

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const colorMap: Record<Color, string> = {
  Gold: "bg-gold text-obsidian-dark",
  Silver: "bg-silver text-obsidian-dark",
  White: "bg-rr-white text-obsidian-dark border border-obsidian/20",
  Copper: "bg-copper text-white",
  Blue: "bg-rr-blue text-white",
  Yellow: "bg-rr-yellow text-obsidian-dark",
  Green: "bg-rr-green text-white",
  Violet: "bg-rr-violet text-white",
  Orange: "bg-rr-orange text-white",
  Gray: "bg-rr-gray text-white",
  Brown: "bg-brown text-white",
  Obsidian: "bg-obsidian text-white",
  Pink: "bg-rr-pink text-obsidian-dark",
  Red: "bg-red text-white",
};

export function getColorClasses(color: Color): string {
  return colorMap[color] ?? "bg-gray-200 text-gray-800";
}

const colorAccentMap: Record<Color, string> = {
  Gold: "border-gold",
  Silver: "border-silver",
  White: "border-rr-white-dark",
  Copper: "border-copper",
  Blue: "border-rr-blue",
  Yellow: "border-rr-yellow",
  Green: "border-rr-green",
  Violet: "border-rr-violet",
  Orange: "border-rr-orange",
  Gray: "border-rr-gray",
  Brown: "border-brown",
  Obsidian: "border-obsidian",
  Pink: "border-rr-pink",
  Red: "border-red",
};

export function getColorBorderClass(color: Color): string {
  return colorAccentMap[color] ?? "border-gray-300";
}
