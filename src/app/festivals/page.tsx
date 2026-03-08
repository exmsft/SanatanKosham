import { getAllFestivals } from "@/lib/content";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/shared/FadeIn";
import Badge from "@/components/ui/Badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hindu Festivals",
  description: "Explore major Hindu festivals — their origin, rituals, significance, and calendar dates.",
};

export default function FestivalsPage() {
  const festivals = getAllFestivals();

  return (
    <div style={{ paddingTop: "5rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      {/* Page hero */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
        }}
      >
        <FadeIn>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🪔</div>
          <h1
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              background: "linear-gradient(135deg, var(--bright-gold), var(--saffron))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
            }}
          >
            Hindu Festivals
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto", fontSize: "1rem", lineHeight: 1.7 }}>
            The sacred calendar of Sanatana Dharma — festivals that connect us to the divine, to nature, and to each other through ritual, devotion, and celebration.
          </p>
        </FadeIn>
      </div>

      {/* Festival grid */}
      <section style={{ padding: "4rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <SectionTitle>Parv, Vrat & Tyohaar</SectionTitle>
        </FadeIn>

        {festivals.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-light)" }}>No festivals published yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {festivals.map((festival) => (
              <FadeIn key={festival.slug}>
                <Card href={`/festivals/${festival.slug}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <Badge>{festival.frontmatter.month}</Badge>
                    {festival.frontmatter.featured && (
                      <span style={{ fontSize: "0.75rem", color: "var(--gold)" }}>★ Featured</span>
                    )}
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      fontSize: "1.05rem",
                      color: "var(--text-dark)",
                      marginBottom: "0.5rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {festival.frontmatter.title}
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: 1.7, marginBottom: "1rem" }}>
                    {festival.frontmatter.description}
                  </p>
                  {festival.frontmatter.gregorianDates?.[0] && (
                    <div style={{ fontSize: "0.78rem", color: "var(--saffron)", fontWeight: 600 }}>
                      Next: {festival.frontmatter.gregorianDates.find((d) => d.date >= new Date().toISOString().split("T")[0])?.date ?? festival.frontmatter.gregorianDates[0].date}
                    </div>
                  )}
                  <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {festival.frontmatter.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: "rgba(230,168,23,0.08)", color: "var(--text-light)", border: "1px solid rgba(230,168,23,0.2)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
