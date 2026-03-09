import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getScriptureBySlug, getScriptureSlugs } from "@/lib/content";
import { baseMetadata, SITE_URL } from "@/lib/seo";
import { scriptureSchema, breadcrumbSchema, jsonLdScript } from "@/lib/jsonld";
import { Link } from "@/i18n/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/shared/FadeIn";
import type { Metadata } from "next";
import { locales } from "@/i18n/config";

interface Props { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getScriptureSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const scripture = getScriptureBySlug(slug);
  if (!scripture) return {};
  return {
    title: scripture.frontmatter.title,
    description: scripture.frontmatter.description,
    keywords: scripture.frontmatter.tags,
    ...baseMetadata(locale, `/scriptures/${slug}`),
  };
}

export default async function ScripturePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("scriptureDetail");
  const scripture = getScriptureBySlug(slug);
  if (!scripture) notFound();
  const { frontmatter, content } = scripture;

  const jsonLd = [
    scriptureSchema({
      title: frontmatter.title,
      description: frontmatter.description,
      slug,
      locale,
      category: frontmatter.category,
      language: frontmatter.language,
      period: frontmatter.period,
      chapters: frontmatter.chapters,
      tags: frontmatter.tags,
    }),
    breadcrumbSchema([
      { name: "Home", url: `${SITE_URL}/${locale}` },
      { name: "Scriptures", url: `${SITE_URL}/${locale}/scriptures` },
      { name: frontmatter.title, url: `${SITE_URL}/${locale}/scriptures/${slug}` },
    ]),
  ];

  return (
    <div style={{ paddingTop: "4rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}
      <div style={{ background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))", padding: "4rem 2rem 5rem", textAlign: "center" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <Badge>{frontmatter.category}</Badge>
            {frontmatter.language && <Badge>{frontmatter.language}</Badge>}
            {frontmatter.chapters && <Badge>{frontmatter.chapters} chapters</Badge>}
          </div>
          <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", background: "linear-gradient(135deg, var(--bright-gold), var(--saffron))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem" }}>
            {frontmatter.title}
          </h1>
          {frontmatter.period && (
            <p style={{ color: "rgba(255,215,100,0.7)", fontSize: "0.9rem", marginBottom: "0.5rem", letterSpacing: "1px" }}>
              {frontmatter.period}
            </p>
          )}
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            {frontmatter.description}
          </p>
        </FadeIn>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 2rem" }}>
        <FadeIn>
          <article className="sk-prose">
            <MDXRemote source={content} />
          </article>
        </FadeIn>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/scriptures" className="sk-btn sk-btn-outline">{t("backToScriptures")}</Link>
        </div>
      </div>

      <style>{`
        .sk-prose h2 { font-family: 'Cinzel Decorative', serif; font-size: 1.5rem; color: var(--saffron); margin: 2.5rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid rgba(230,168,23,0.2); }
        .sk-prose h3 { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: var(--text-dark); margin: 1.8rem 0 0.75rem; }
        .sk-prose p { margin-bottom: 1.2rem; color: var(--text-medium); line-height: 1.9; }
        .sk-prose ul, .sk-prose ol { padding-left: 1.5rem; margin-bottom: 1.2rem; }
        .sk-prose li { margin-bottom: 0.4rem; color: var(--text-medium); }
        .sk-prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
        .sk-prose th { background: rgba(230,168,23,0.1); color: var(--saffron); padding: 0.6rem 1rem; text-align: left; border: 1px solid rgba(230,168,23,0.2); }
        .sk-prose td { padding: 0.6rem 1rem; border: 1px solid rgba(230,168,23,0.1); color: var(--text-medium); }
        .sk-prose blockquote { border-left: 3px solid var(--saffron); padding-left: 1.5rem; margin: 1.5rem 0; font-style: italic; color: var(--text-light); }
        .sk-prose strong { color: var(--text-dark); }
      `}</style>
    </div>
  );
}
