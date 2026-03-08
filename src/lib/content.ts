import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  FestivalFrontmatter,
  TempleFrontmatter,
  DeityFrontmatter,
  MantraFrontmatter,
  ScriptureFrontmatter,
  ContentItem,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getContentDir(section: string, locale = "en"): string {
  if (locale !== "en") {
    const localeDir = path.join(CONTENT_DIR, locale, section);
    if (fs.existsSync(localeDir)) return localeDir;
  }
  return path.join(CONTENT_DIR, section);
}

function readMdxFile<T>(filePath: string): ContentItem<T> {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, ".mdx");
  return { slug, frontmatter: data as T, content };
}

function getAllItems<T extends { status: string }>(
  section: string,
  locale = "en"
): ContentItem<T>[] {
  const dir = getContentDir(section, locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
  return files
    .map((f) => readMdxFile<T>(path.join(dir, f)))
    .filter((item) => item.frontmatter.status === "published");
}

function getItemBySlug<T>(
  section: string,
  slug: string,
  locale = "en"
): ContentItem<T> | null {
  const filePath = path.join(getContentDir(section, locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readMdxFile<T>(filePath);
}

function getAllSlugs(section: string, locale = "en"): string[] {
  const dir = getContentDir(section, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

// ─── Festivals ───────────────────────────────────────────────────────────────

export function getAllFestivals(locale = "en") {
  return getAllItems<FestivalFrontmatter>("festivals", locale);
}

export function getFestivalBySlug(slug: string, locale = "en") {
  return getItemBySlug<FestivalFrontmatter>("festivals", slug, locale);
}

export function getFestivalSlugs(locale = "en") {
  return getAllSlugs("festivals", locale);
}

export function getFeaturedFestivals(locale = "en") {
  return getAllFestivals(locale).filter((f) => f.frontmatter.featured);
}

export function getUpcomingFestivals(limit = 5, locale = "en") {
  const today = new Date().toISOString().split("T")[0];
  return getAllFestivals(locale)
    .map((f) => {
      const nextDate = f.frontmatter.gregorianDates
        ?.filter((d) => d.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date))[0];
      return { ...f, nextDate };
    })
    .filter((f) => f.nextDate)
    .sort((a, b) => a.nextDate!.date.localeCompare(b.nextDate!.date))
    .slice(0, limit);
}

// ─── Temples ─────────────────────────────────────────────────────────────────

export function getAllTemples(locale = "en") {
  return getAllItems<TempleFrontmatter>("temples", locale);
}

export function getTempleBySlug(slug: string, locale = "en") {
  return getItemBySlug<TempleFrontmatter>("temples", slug, locale);
}

export function getTempleSlugs(locale = "en") {
  return getAllSlugs("temples", locale);
}

// ─── Deities ─────────────────────────────────────────────────────────────────

export function getAllDeities(locale = "en") {
  return getAllItems<DeityFrontmatter>("deities", locale);
}

export function getDeityBySlug(slug: string, locale = "en") {
  return getItemBySlug<DeityFrontmatter>("deities", slug, locale);
}

export function getDeitySlugs(locale = "en") {
  return getAllSlugs("deities", locale);
}

// ─── Mantras ─────────────────────────────────────────────────────────────────

export function getAllMantras(locale = "en") {
  return getAllItems<MantraFrontmatter>("mantras", locale);
}

export function getMantraBySlug(slug: string, locale = "en") {
  return getItemBySlug<MantraFrontmatter>("mantras", slug, locale);
}

export function getMantraSlugs(locale = "en") {
  return getAllSlugs("mantras", locale);
}

// ─── Scriptures ──────────────────────────────────────────────────────────────

export function getAllScriptures(locale = "en") {
  return getAllItems<ScriptureFrontmatter>("scriptures", locale);
}

export function getScriptureBySlug(slug: string, locale = "en") {
  return getItemBySlug<ScriptureFrontmatter>("scriptures", slug, locale);
}

export function getScriptureSlugs(locale = "en") {
  return getAllSlugs("scriptures", locale);
}
