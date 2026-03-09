import { SITE_URL } from "./seo";

// ─── WebSite + Organization (root layout) ─────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "SanatanKosham",
        description:
          "The definitive digital knowledge hub for Sanatana Dharma — Hindu festivals, temples, deities, mantras, and scriptures.",
        inLanguage: ["en", "hi", "kn", "te", "bn"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/en/festivals?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "SanatanKosham",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icons/icon-512.png`,
          width: 512,
          height: 512,
        },
        sameAs: ["https://github.com/exmsft/SanatanKosham"],
      },
    ],
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

export function breadcrumbSchema(
  crumbs: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// ─── Festival → Event schema ──────────────────────────────────────────────────

export function festivalSchema(opts: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  gregorianDates?: { date: string }[];
  deity?: string[];
  tags?: string[];
}) {
  const url = `${SITE_URL}/${opts.locale}/festivals/${opts.slug}`;
  const nextDate = opts.gregorianDates
    ?.map((d) => d.date)
    .filter((d) => d >= new Date().toISOString().split("T")[0])
    .sort()[0];

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: opts.title,
    description: opts.description,
    url,
    ...(nextDate && { startDate: nextDate }),
    eventAttendanceMode:
      "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "SanatanKosham",
    },
    about: opts.tags?.map((tag) => ({ "@type": "Thing", name: tag })),
    keywords: opts.tags?.join(", "),
    inLanguage: opts.locale,
  };
}

// ─── Deity → Person schema ────────────────────────────────────────────────────

export function deitySchema(opts: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  pantheon?: string;
  consort?: string;
  attributes?: string[];
  tags?: string[];
}) {
  const url = `${SITE_URL}/${opts.locale}/deities/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.title,
    description: opts.description,
    url,
    ...(opts.consort && { spouse: { "@type": "Person", name: opts.consort } }),
    ...(opts.pantheon && {
      memberOf: { "@type": "Organization", name: `Hindu ${opts.pantheon} Tradition` },
    }),
    ...(opts.attributes && {
      knowsAbout: opts.attributes,
    }),
    keywords: opts.tags?.join(", "),
    inLanguage: opts.locale,
    additionalType: "https://schema.org/Thing",
  };
}

// ─── Mantra → CreativeWork schema ─────────────────────────────────────────────

export function mantraSchema(opts: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  sanskrit?: string;
  transliteration?: string;
  meaning?: string;
  deity?: string[];
  benefits?: string[];
  audioSrc?: string;
}) {
  const url = `${SITE_URL}/${opts.locale}/mantras/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.title,
    description: opts.description,
    url,
    ...(opts.sanskrit && { text: opts.sanskrit }),
    ...(opts.transliteration && { alternateName: opts.transliteration }),
    ...(opts.meaning && { abstract: opts.meaning }),
    inLanguage: "sa", // Sanskrit
    genre: "Religious Text",
    ...(opts.deity && {
      about: opts.deity.map((d) => ({ "@type": "Person", name: d })),
    }),
    ...(opts.audioSrc && {
      associatedMedia: {
        "@type": "AudioObject",
        contentUrl: opts.audioSrc,
        encodingFormat: "audio/mpeg",
      },
    }),
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#org` },
  };
}

// ─── Temple → TouristAttraction schema ───────────────────────────────────────

export function templeSchema(opts: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  location?: string;
  state?: string;
  country?: string;
  coordinates?: { lat: number; lng: number };
  templeType?: string[];
  tags?: string[];
}) {
  const url = `${SITE_URL}/${opts.locale}/temples/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": ["LandmarksOrHistoricalBuildings", "TouristAttraction", "PlaceOfWorship"],
    name: opts.title,
    description: opts.description,
    url,
    ...(opts.location && {
      address: {
        "@type": "PostalAddress",
        streetAddress: opts.location,
        ...(opts.state && { addressRegion: opts.state }),
        ...(opts.country && { addressCountry: opts.country }),
      },
    }),
    ...(opts.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: opts.coordinates.lat,
        longitude: opts.coordinates.lng,
      },
    }),
    ...(opts.templeType && {
      additionalType: opts.templeType.map((t) => `https://en.wikipedia.org/wiki/${encodeURIComponent(t)}`),
    }),
    keywords: opts.tags?.join(", "),
    inLanguage: opts.locale,
    publicAccess: true,
  };
}

// ─── Scripture → Book schema ──────────────────────────────────────────────────

export function scriptureSchema(opts: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  category?: string;
  language?: string;
  period?: string;
  chapters?: number;
  tags?: string[];
}) {
  const url = `${SITE_URL}/${opts.locale}/scriptures/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: opts.title,
    description: opts.description,
    url,
    ...(opts.language && { inLanguage: opts.language }),
    ...(opts.period && { dateCreated: opts.period }),
    ...(opts.chapters && { numberOfPages: opts.chapters }),
    genre: opts.category ?? "Religious Text",
    about: { "@type": "Thing", name: "Sanatana Dharma" },
    keywords: opts.tags?.join(", "),
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#org` },
    isAccessibleForFree: true,
  };
}

// ─── Helper: render JSON-LD as a <script> tag string (for use in JSX) ─────────

export function jsonLdScript(data: object): string {
  return JSON.stringify(data);
}
