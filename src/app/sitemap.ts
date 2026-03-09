import { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import {
  getFestivalSlugs,
  getTempleSlugs,
  getDeitySlugs,
  getMantraSlugs,
  getScriptureSlugs,
} from "@/lib/content";

const BASE = "https://www.sanatankosham.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  const sections = [
    { path: "", changeFreq: "daily" as const, priority: 1.0 },
    { path: "/festivals", changeFreq: "weekly" as const, priority: 0.9 },
    { path: "/temples", changeFreq: "weekly" as const, priority: 0.9 },
    { path: "/deities", changeFreq: "weekly" as const, priority: 0.9 },
    { path: "/mantras", changeFreq: "weekly" as const, priority: 0.9 },
    { path: "/scriptures", changeFreq: "weekly" as const, priority: 0.9 },
    { path: "/panchang", changeFreq: "daily" as const, priority: 0.8 },
  ];

  // Section index pages per locale
  for (const locale of locales) {
    for (const { path, changeFreq, priority } of sections) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        changeFrequency: changeFreq,
        priority,
      });
    }
  }

  // Content slug pages per locale
  const slugMaps = [
    { section: "festivals", slugs: getFestivalSlugs() },
    { section: "temples", slugs: getTempleSlugs() },
    { section: "deities", slugs: getDeitySlugs() },
    { section: "mantras", slugs: getMantraSlugs() },
    { section: "scriptures", slugs: getScriptureSlugs() },
  ];

  for (const { section, slugs } of slugMaps) {
    for (const locale of locales) {
      for (const slug of slugs) {
        entries.push({
          url: `${BASE}/${locale}/${section}/${slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}
