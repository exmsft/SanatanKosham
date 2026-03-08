import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTempleBySlug, getTempleSlugs } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/shared/FadeIn";
import type { Metadata } from "next";
import { locales } from "@/i18n/config";

interface Props { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getTempleSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const temple = getTempleBySlug(slug);
  if (!temple) return {};
  return { title: temple.frontmatter.title, description: temple.frontmatter.description };
}

export default async function TemplePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("templeDetail");
  const temple = getTempleBySlug(slug);
  if (!temple) notFound();
  const { frontmatter, content } = temple;

  const mapsUrl = frontmatter.coordinates
    ? `https://www.google.com/maps?q=${frontmatter.coordinates.lat},${frontmatter.coordinates.lng}`
    : `https://www.google.com/maps/search/${encodeURIComponent(frontmatter.title)}`;

  return (
    <div style={{ paddingTop: "4rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      <div style={{ background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))", padding: "4rem 2rem 5rem", textAlign: "center" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            {frontmatter.templeType?.map((tp) => <Badge key={tp}>{tp}</Badge>)}
          </div>
          <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.5rem, 4vw, 3rem)", background: "linear-gradient(135deg, var(--bright-gold), var(--saffron))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "0.75rem", lineHeight: 1.2 }}>
            {frontmatter.title}
          </h1>
          <p style={{ color: "rgba(255,215,100,0.8)", fontSize: "0.95rem", letterSpacing: "1px", marginBottom: "0.5rem" }}>
            📍 {frontmatter.location}
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
            {frontmatter.description}
          </p>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="sk-btn sk-btn-outline" style={{ color: "var(--bright-gold)", borderColor: "var(--bright-gold)" }}>
            View on Maps →
          </a>
        </FadeIn>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 2rem" }}>
        {frontmatter.visitingInfo && (
          <FadeIn>
            <div style={{ background: "rgba(230,168,23,0.08)", border: "1px solid rgba(230,168,23,0.25)", borderRadius: "12px", padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--saffron)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.4rem" }}>Visiting Information</div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-medium)", lineHeight: 1.7 }}>{frontmatter.visitingInfo}</p>
            </div>
          </FadeIn>
        )}

        <FadeIn>
          <article className="sk-prose">
            <MDXRemote source={content} />
          </article>
        </FadeIn>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/temples" className="sk-btn sk-btn-outline">{t("backToTemples")}</Link>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="sk-btn sk-btn-primary">View on Maps</a>
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
