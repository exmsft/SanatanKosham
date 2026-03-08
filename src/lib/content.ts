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

function getContentDir(section: string) {
  return path.join(CONTENT_DIR, section);
}

function readMdxFile<T>(filePath: string): ContentItem<T> {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, ".mdx");
  return { slug, frontmatter: data as T, content };
}

function getAllItems<T extends { status: string }>(
  section: string
): ContentItem<T>[] {
  const dir = getContentDir(section);
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
  slug: string
): ContentItem<T> | null {
  const filePath = path.join(getContentDir(section), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readMdxFile<T>(filePath);
}

function getAllSlugs(section: string): string[] {
  const dir = getContentDir(section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

// ─── Festivals ───────────────────────────────────────────────────────────────

export function getAllFestivals() {
  return getAllItems<FestivalFrontmatter>("festivals");
}

export function getFestivalBySlug(slug: string) {
  return getItemBySlug<FestivalFrontmatter>("festivals", slug);
}

export function getFestivalSlugs() {
  return getAllSlugs("festivals");
}

export function getFeaturedFestivals() {
  return getAllFestivals().filter((f) => f.frontmatter.featured);
}

export function getUpcomingFestivals(limit = 5) {
  const today = new Date().toISOString().split("T")[0];
  return getAllFestivals()
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

export function getAllTemples() {
  return getAllItems<TempleFrontmatter>("temples");
}

export function getTempleBySlug(slug: string) {
  return getItemBySlug<TempleFrontmatter>("temples", slug);
}

export function getTempleSlugs() {
  return getAllSlugs("temples");
}

// ─── Deities ─────────────────────────────────────────────────────────────────

export function getAllDeities() {
  return getAllItems<DeityFrontmatter>("deities");
}

export function getDeityBySlug(slug: string) {
  return getItemBySlug<DeityFrontmatter>("deities", slug);
}

export function getDeitySlugs() {
  return getAllSlugs("deities");
}

// ─── Mantras ─────────────────────────────────────────────────────────────────

export function getAllMantras() {
  return getAllItems<MantraFrontmatter>("mantras");
}

export function getMantraBySlug(slug: string) {
  return getItemBySlug<MantraFrontmatter>("mantras", slug);
}

export function getMantraSlugs() {
  return getAllSlugs("mantras");
}

// ─── Scriptures ──────────────────────────────────────────────────────────────

export function getAllScriptures() {
  return getAllItems<ScriptureFrontmatter>("scriptures");
}

export function getScriptureBySlug(slug: string) {
  return getItemBySlug<ScriptureFrontmatter>("scriptures", slug);
}

export function getScriptureSlugs() {
  return getAllSlugs("scriptures");
}
