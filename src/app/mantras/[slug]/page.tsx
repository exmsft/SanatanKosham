import { notFound } from "next/navigation";
import { getMantraBySlug, getMantraSlugs } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import AudioPlayer from "@/components/shared/AudioPlayer";
import OmVisualizer from "@/components/shared/OmVisualizer";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/shared/FadeIn";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getMantraSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mantra = getMantraBySlug(slug);
  if (!mantra) return {};
  return { title: mantra.frontmatter.title, description: mantra.frontmatter.description };
}

export default async function MantraPage({ params }: Props) {
  const { slug } = await params;
  const mantra = getMantraBySlug(slug);
  if (!mantra) notFound();
  const { frontmatter, content } = mantra;

  return (
    <div style={{ paddingTop: "4rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      <div style={{ background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))", padding: "4rem 2rem 5rem", textAlign: "center" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            {frontmatter.deity?.map((d) => <Badge key={d}>{d}</Badge>)}
          </div>
          <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", background: "linear-gradient(135deg, var(--bright-gold), var(--saffron))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1.5rem" }}>
            {frontmatter.title}
          </h1>
          <p
            style={{
              fontFamily: "'Noto Sans Devanagari', 'Playfair Display', serif",
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              color: "rgba(255,215,100,0.95)",
              letterSpacing: "3px",
              lineHeight: 1.8,
              marginBottom: "1rem",
              textShadow: "0 0 20px rgba(255,215,0,0.3)",
              maxWidth: 700,
              margin: "0 auto 1rem",
            }}
          >
            {frontmatter.sanskrit}
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "rgba(255,255,255,0.7)", fontSize: "1rem", letterSpacing: "1px", marginBottom: "1rem" }}>
            {frontmatter.transliteration}
          </p>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 auto", fontSize: "0.9rem", lineHeight: 1.7 }}>
            {frontmatter.meaning}
          </p>
        </FadeIn>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 2rem" }}>
        {/* Om Visualizer + Audio */}
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2rem", alignItems: "center", background: "var(--cream)", border: "1px solid rgba(230,168,23,0.2)", borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}>
            <OmVisualizer size={180} />
            <div>
              <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.1rem", color: "var(--saffron)", marginBottom: "1rem" }}>
                Listen & Chant
              </h2>
              {frontmatter.audioSrc ? (
                <AudioPlayer src={frontmatter.audioSrc} title={frontmatter.title} />
              ) : (
                <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Audio coming soon</p>
              )}
              {frontmatter.benefits && (
                <div style={{ marginTop: "1.5rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.5rem" }}>Benefits</div>
                  <ul style={{ paddingLeft: "1.2rem" }}>
                    {frontmatter.benefits.map((b) => (
                      <li key={b} style={{ fontSize: "0.85rem", color: "var(--text-medium)", marginBottom: "0.3rem" }}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <article className="sk-prose">
            <MDXRemote source={content} />
          </article>
        </FadeIn>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/mantras" className="sk-btn sk-btn-outline">← All Mantras</Link>
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
