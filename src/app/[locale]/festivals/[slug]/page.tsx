import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getFestivalBySlug, getFestivalSlugs } from "@/lib/content";
import { baseMetadata } from "@/lib/seo";
import { festivalSchema, breadcrumbSchema, jsonLdScript } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CountdownTimer from "@/components/shared/CountdownTimer";
import PujaChecklist from "@/components/shared/PujaChecklist";
import VratTimer from "@/components/shared/VratTimer";
import VirtualAarti from "@/components/shared/VirtualAarti";
import AudioPlayer from "@/components/shared/AudioPlayer";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/shared/FadeIn";
import type { Metadata } from "next";
import { locales } from "@/i18n/config";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getFestivalSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) return {};
  const path = `/festivals/${slug}`;
  return {
    title: festival.frontmatter.title,
    description: festival.frontmatter.description,
    keywords: festival.frontmatter.tags,
    ...baseMetadata(locale, path),
    openGraph: {
      ...baseMetadata(locale, path).openGraph,
      type: "article",
      title: festival.frontmatter.title,
      description: festival.frontmatter.description,
    },
  };
}

const components = {
  CountdownTimer,
  PujaChecklist,
  VratTimer,
  VirtualAarti,
  AudioPlayer,
};

export default async function FestivalPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("festivalDetail");
  const festival = getFestivalBySlug(slug);
  if (!festival) notFound();

  const { frontmatter, content } = festival;

  const today = new Date().toISOString().split("T")[0];
  const nextDate = frontmatter.gregorianDates
    ?.filter((d) => d.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const jsonLd = [
    festivalSchema({
      title: frontmatter.title,
      description: frontmatter.description,
      slug,
      locale,
      gregorianDates: frontmatter.gregorianDates,
      deity: frontmatter.deity,
      tags: frontmatter.tags,
    }),
    breadcrumbSchema([
      { name: "Home", url: `${SITE_URL}/${locale}` },
      { name: "Festivals", url: `${SITE_URL}/${locale}/festivals` },
      { name: frontmatter.title, url: `${SITE_URL}/${locale}/festivals/${slug}` },
    ]),
  ];

  return (
    <div style={{ paddingTop: "4rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}
      {/* Festival Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--deep-blue) 0%, var(--royal-purple) 100%)",
          padding: "4rem 2rem 5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FadeIn>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <Badge>{frontmatter.month}</Badge>
            {frontmatter.paksha && <Badge>{frontmatter.paksha} Paksha</Badge>}
            {frontmatter.tithi && <Badge>{frontmatter.tithi}</Badge>}
          </div>
          <h1
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              background: "linear-gradient(135deg, var(--bright-gold), var(--saffron))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            {frontmatter.title}
          </h1>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.8)",
              maxWidth: 650,
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            {frontmatter.description}
          </p>

          {nextDate && (
            <div style={{ maxWidth: 600, margin: "0 auto 1rem" }}>
              <CountdownTimer
                targetDate={`${nextDate.date}T18:00:00+05:30`}
                celebrationMessage={t("celebrationMessage", { title: frontmatter.title })}
              />
            </div>
          )}
        </FadeIn>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 2rem" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {frontmatter.deity?.length > 0 && (
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  {t("deities")}
                </div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {frontmatter.deity.map((d) => (
                    <Link key={d} href={`/deities/${d}`}>
                      <Badge>{d}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {(frontmatter.mantras?.length ?? 0) > 0 && (
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  {t("mantras")}
                </div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {(frontmatter.mantras ?? []).map((m) => (
                    <Link key={m} href={`/mantras/${m}`}>
                      <Badge>{m.replace(/-/g, " ")}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn>
          <article
            style={{ lineHeight: 1.9, color: "var(--text-dark)", fontSize: "1rem" }}
            className="sk-prose"
          >
            <MDXRemote source={content} components={components} />
          </article>
        </FadeIn>

        <FadeIn>
          <div
            style={{
              background: "var(--cream)",
              border: "1px solid rgba(230,168,23,0.2)",
              borderRadius: "16px",
              padding: "2rem",
              marginTop: "3rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "1.3rem",
                color: "var(--saffron)",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              {t("pujaChecklist")}
            </h2>
            <PujaChecklist
              items={[
                { icon: "🥛", name: "Milk (Dudh)" },
                { icon: "🍯", name: "Honey (Madhu)" },
                { icon: "🫙", name: "Yogurt (Dahi)" },
                { icon: "🧈", name: "Ghee" },
                { icon: "💧", name: "Gangajal (Holy Water)" },
                { icon: "🌿", name: "Bel Patra / Sacred Leaves" },
                { icon: "🌸", name: "Flowers" },
                { icon: "🪔", name: "Diya (Oil Lamp)" },
                { icon: "🕯️", name: "Camphor (Kapoor)" },
                { icon: "🪷", name: "Incense Sticks (Agarbatti)" },
                { icon: "🍌", name: "Fruits and Prasad" },
                { icon: "🧡", name: "Devotion (Bhakti)" },
              ]}
              storageKey={`sk_puja_${slug}`}
            />
          </div>
        </FadeIn>

        <FadeIn>
          <div
            style={{
              background: "var(--cream)",
              border: "1px solid rgba(230,168,23,0.2)",
              borderRadius: "16px",
              padding: "2rem",
              marginTop: "2rem",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "1.3rem",
                color: "var(--saffron)",
                marginBottom: "2rem",
              }}
            >
              {t("virtualAarti")}
            </h2>
            <VirtualAarti deity={frontmatter.title} storageKey={`sk_aarti_${slug}`} />
          </div>
        </FadeIn>

        <FadeIn>
          <div
            style={{
              background: "var(--cream)",
              border: "1px solid rgba(230,168,23,0.2)",
              borderRadius: "16px",
              padding: "2rem",
              marginTop: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "1.3rem",
                color: "var(--saffron)",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              {t("vratTimer")}
            </h2>
            <VratTimer />
          </div>
        </FadeIn>

        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
          <Link href="/festivals" className="sk-btn sk-btn-outline">
            {t("backToFestivals")}
          </Link>
        </div>
      </div>

      <style>{`
        .sk-prose h2 {
          font-family: 'Cinzel Decorative', serif;
          font-size: 1.5rem;
          color: var(--saffron);
          margin: 2.5rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(230,168,23,0.2);
        }
        .sk-prose h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: var(--text-dark);
          margin: 1.8rem 0 0.75rem;
        }
        .sk-prose p { margin-bottom: 1.2rem; color: var(--text-medium); }
        .sk-prose ul, .sk-prose ol { padding-left: 1.5rem; margin-bottom: 1.2rem; }
        .sk-prose li { margin-bottom: 0.4rem; color: var(--text-medium); }
        .sk-prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
        .sk-prose th { background: rgba(230,168,23,0.1); color: var(--saffron); padding: 0.6rem 1rem; text-align: left; border: 1px solid rgba(230,168,23,0.2); }
        .sk-prose td { padding: 0.6rem 1rem; border: 1px solid rgba(230,168,23,0.1); color: var(--text-medium); }
        .sk-prose tr:nth-child(even) td { background: rgba(230,168,23,0.04); }
        .sk-prose blockquote { border-left: 3px solid var(--saffron); padding-left: 1.5rem; margin: 1.5rem 0; font-style: italic; color: var(--text-light); }
        .sk-prose strong { color: var(--text-dark); }
        .sk-prose a { color: var(--saffron); text-decoration: underline; }
      `}</style>
    </div>
  );
}
