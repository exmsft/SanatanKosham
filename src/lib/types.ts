// ─── Shared types for all content ────────────────────────────────────────────

export type ContentStatus = "published" | "draft";

export interface FestivalFrontmatter {
  title: string;
  slug: string;
  type: "festival";
  deity: string[];
  month: string;
  paksha?: string;
  tithi?: string;
  gregorianDates: { year: number; date: string }[];
  temples?: string[];
  mantras?: string[];
  featured?: boolean;
  status: ContentStatus;
  coverImage?: string;
  description: string;
  tags: string[];
  significance?: string;
}

export interface TempleFrontmatter {
  title: string;
  slug: string;
  type: "temple";
  deity: string[];
  location: string;
  state: string;
  country: string;
  coordinates?: { lat: number; lng: number };
  templeType: string[]; // e.g. ["jyotirlinga", "char-dham", "shakti-peetha"]
  festivals?: string[];
  featured?: boolean;
  status: ContentStatus;
  coverImage?: string;
  description: string;
  tags: string[];
  visitingInfo?: string;
  established?: string;
}

export interface DeityFrontmatter {
  title: string;
  slug: string;
  type: "deity";
  pantheon: string; // e.g. "Shaiva", "Vaishnava", "Shakta"
  consort?: string;
  vehicle?: string;
  festivals?: string[];
  temples?: string[];
  mantras?: string[];
  featured?: boolean;
  status: ContentStatus;
  coverImage?: string;
  description: string;
  tags: string[];
  attributes?: string[];
}

export interface MantraFrontmatter {
  title: string;
  slug: string;
  type: "mantra";
  deity: string[];
  sanskrit: string;
  transliteration: string;
  meaning: string;
  benefits?: string[];
  audioSrc?: string;
  festivals?: string[];
  featured?: boolean;
  status: ContentStatus;
  description: string;
  tags: string[];
}

export interface ScriptureFrontmatter {
  title: string;
  slug: string;
  type: "scripture";
  category: string; // e.g. "veda", "purana", "upanishad", "smriti"
  language: string;
  period?: string;
  chapters?: number;
  featured?: boolean;
  status: ContentStatus;
  coverImage?: string;
  description: string;
  tags: string[];
}

export type Frontmatter =
  | FestivalFrontmatter
  | TempleFrontmatter
  | DeityFrontmatter
  | MantraFrontmatter
  | ScriptureFrontmatter;

export interface ContentItem<T = Frontmatter> {
  slug: string;
  frontmatter: T;
  content: string;
}
