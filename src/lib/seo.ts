import { Metadata } from "next";
import { locales } from "@/i18n/config";

export const SITE_URL = "https://www.sanatankosham.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

/** Build canonical URL for a given locale + path */
export function canonicalUrl(locale: string, path = ""): string {
  return `${SITE_URL}/${locale}${path}`;
}

/** Build hreflang alternate links for all 5 locales + x-default */
export function hreflangAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/en${path}`;
  return languages;
}

/** Base metadata spread — canonical, hreflang, twitter, og:url + og:image */
export function baseMetadata(
  locale: string,
  path = "",
  overrides?: Partial<Metadata>
): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl(locale, path),
      languages: hreflangAlternates(path),
    },
    twitter: {
      card: "summary_large_image",
      site: "@SanatanKosham",
      creator: "@SanatanKosham",
    },
    openGraph: {
      url: canonicalUrl(locale, path),
      siteName: "SanatanKosham",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "SanatanKosham — The Treasury of Sanatana Dharma",
        },
      ],
      ...((overrides?.openGraph as object) ?? {}),
    },
    ...overrides,
  };
}
