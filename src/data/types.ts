export type Color =
  | "Gold"
  | "Silver"
  | "White"
  | "Copper"
  | "Blue"
  | "Yellow"
  | "Green"
  | "Violet"
  | "Orange"
  | "Gray"
  | "Brown"
  | "Obsidian"
  | "Pink"
  | "Red";

export type BookTitle = "Red Rising" | "Golden Son" | "Morning Star" | "Iron Gold" | "Dark Age" | "Light Bringer";

export interface Character {
  slug: string;
  name: string;
  color: Color;
  aliases: string[];
  affiliations: string[];
  books: BookTitle[];
  description: string;
  shortDescription: string;
}

export interface Location {
  slug: string;
  name: string;
  planet: string;
  description: string;
  notableEvents: string[];
  associatedCharacters: string[];
}

export interface Book {
  slug: string;
  title: BookTitle;
  position: number;
  year: number;
  synopsis: string;
  majorCharacters: string[];
  keyEvents: string[];
  themes: string[];
}

export interface ColorInfo {
  color: Color;
  role: string;
  description: string;
  notableMembers: string[];
  cssClass: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  relatedTerms: string[];
}
