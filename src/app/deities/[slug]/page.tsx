import { notFound } from "next/navigation";
import { getDeityBySlug, getDeitySlugs } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import VirtualAarti from "@/components/shared/VirtualAarti";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/shared/FadeIn";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getDeitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const deity = getDeityBySlug(slug);
  if (!deity) return {};
  return { title: deity.frontmatter.title, description: deity.frontmatter.description };
}

export default async function DeityPage({ params }: Props) {
  const { slug } = await params;
  const deity = getDeityBySlug(slug);
  if (!deity) notFound();
  const { frontmatter, content } = deity;

  return (
    <div style={{ paddingTop: "4rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      <div style={{ background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))", padding: "4rem 2rem 5rem", textAlign: "center" }}>
        <FadeIn>
          <Badge>{frontmatter.pantheon}</Badge>
          <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.8rem, 4vw, 3.5rem)", background: "linear-gradient(135deg, var(--bright-gold), var(--saffron))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: "1rem 0", lineHeight: 1.2 }}>
            {frontmatter.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            {frontmatter.description}
          </p>
          {frontmatter.attributes && (
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
              {frontmatter.attributes.map((attr) => (
                <span key={attr} style={{ fontSize: "0.78rem", padding: "0.25rem 0.75rem", borderRadius: "999px", background: "rgba(230,168,23,0.15)", color: "rgba(255,215,100,0.9)", border: "1px solid rgba(230,168,23,0.3)" }}>
                  {attr}
                </span>
              ))}
            </div>
          )}
        </FadeIn>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 2rem" }}>
        {/* Info cards */}
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {frontmatter.consort && (
              <div style={{ background: "var(--cream)", border: "1px solid rgba(230,168,23,0.2)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Consort</div>
                <div style={{ fontWeight: 600, color: "var(--text-dark)" }}>{frontmatter.consort}</div>
              </div>
            )}
            {frontmatter.vehicle && (
              <div style={{ background: "var(--cream)", border: "1px solid rgba(230,168,23,0.2)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Vehicle (Vahana)</div>
                <div style={{ fontWeight: 600, color: "var(--text-dark)" }}>{frontmatter.vehicle}</div>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn>
          <article className="sk-prose">
            <MDXRemote source={content} />
          </article>
        </FadeIn>

        <FadeIn>
          <div style={{ background: "var(--cream)", border: "1px solid rgba(230,168,23,0.2)", borderRadius: "16px", padding: "2rem", marginTop: "3rem", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.3rem", color: "var(--saffron)", marginBottom: "2rem" }}>
              Offer Aarti
            </h2>
            <VirtualAarti deity={frontmatter.title} storageKey={`sk_aarti_deity_${slug}`} />
          </div>
        </FadeIn>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/deities" className="sk-btn sk-btn-outline">← All Deities</Link>
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
