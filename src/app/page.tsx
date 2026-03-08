import Link from "next/link";
import { getUpcomingFestivals, getAllFestivals, getAllTemples, getAllDeities } from "@/lib/content";
import SacredGeometry from "@/components/shared/SacredGeometry";
import Particles from "@/components/shared/Particles";
import FadeIn from "@/components/shared/FadeIn";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

const CATEGORIES = [
  {
    title: "Festivals",
    href: "/festivals",
    icon: "🪔",
    description: "Discover the origins, rituals, and significance of major Hindu festivals throughout the sacred calendar.",
    color: "var(--saffron)",
  },
  {
    title: "Temples",
    href: "/temples",
    icon: "🛕",
    description: "Explore sacred temples across India and the world — their history, architecture, and travel guidelines.",
    color: "var(--gold)",
  },
  {
    title: "Deities",
    href: "/deities",
    icon: "✨",
    description: "Learn about the Hindu pantheon — the stories, symbolism, and worship of deva, devi, and divine forms.",
    color: "var(--vermillion)",
  },
  {
    title: "Mantras",
    href: "/mantras",
    icon: "ॐ",
    description: "Sacred Sanskrit mantras with transliteration, meaning, pronunciation, and audio playback.",
    color: "var(--bright-gold)",
  },
  {
    title: "Scriptures",
    href: "/scriptures",
    icon: "📜",
    description: "The Vedas, Puranas, Upanishads, and Smritis — the timeless texts of Sanatana Dharma.",
    color: "var(--warm-orange)",
  },
];

export default function Home() {
  const upcomingFestivals = getUpcomingFestivals(4);
  const allFestivals = getAllFestivals();
  const allTemples = getAllTemples();
  const allDeities = getAllDeities();

  return (
    <>
      <Particles />

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          padding: "6rem 2rem 4rem",
          background: "linear-gradient(135deg, var(--deep-blue) 0%, var(--royal-purple) 60%, #1a0520 100%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(700px, 100vw)",
            height: "min(700px, 100vw)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <SacredGeometry />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
          <div
            style={{
              fontSize: "5rem",
              color: "var(--bright-gold)",
              animation: "glow 3s ease-in-out infinite alternate",
              marginBottom: "1rem",
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            ॐ
          </div>

          <h1
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, var(--bright-gold), var(--saffron), var(--bright-gold))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.75rem",
              lineHeight: 1.2,
            }}
          >
            SanatanKosham
          </h1>

          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              color: "var(--soft-white)",
              marginBottom: "0.5rem",
            }}
          >
            सनातन कोशम् — The Treasury of Sanatana Dharma
          </p>

          <p
            style={{
              fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
              color: "rgba(255,215,100,0.75)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "2.5rem",
            }}
          >
            Festivals · Temples · Deities · Mantras · Scriptures
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/festivals" className="sk-btn sk-btn-primary">
              Explore Festivals
            </Link>
            <Link
              href="/temples"
              className="sk-btn sk-btn-outline"
              style={{ color: "var(--bright-gold)", borderColor: "var(--bright-gold)" }}
            >
              Sacred Temples
            </Link>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.75rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          ↓ Explore
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "var(--deep-blue)", padding: "1.5rem 2rem", position: "relative", zIndex: 1 }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          {[
            { value: allFestivals.length, label: "Festivals" },
            { value: allTemples.length, label: "Temples" },
            { value: allDeities.length, label: "Deities" },
            { value: "∞", label: "Wisdom" },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.8rem", color: "var(--bright-gold)", lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", letterSpacing: "2px", textTransform: "uppercase", marginTop: "0.3rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Festivals */}
      {upcomingFestivals.length > 0 && (
        <section style={{ padding: "5rem 2rem", background: "var(--warm-bg)", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FadeIn>
              <SectionTitle>Upcoming Sacred Days</SectionTitle>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {upcomingFestivals.map((f) => (
                <FadeIn key={f.slug}>
                  <Card href={`/festivals/${f.slug}`}>
                    <div style={{ fontSize: "0.75rem", color: "var(--saffron)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                      {f.nextDate?.date}
                    </div>
                    <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1rem", color: "var(--text-dark)", marginBottom: "0.5rem" }}>
                      {f.frontmatter.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: 1.6 }}>
                      {f.frontmatter.description}
                    </p>
                    <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--light-saffron)", fontWeight: 600 }}>
                      Explore →
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Grid */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "linear-gradient(180deg, var(--warm-bg-alt) 0%, var(--warm-bg) 100%)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <SectionTitle>Explore the Kosham</SectionTitle>
            <p
              style={{
                textAlign: "center",
                color: "var(--text-medium)",
                maxWidth: 650,
                margin: "0 auto 3rem",
                fontSize: "1rem",
                lineHeight: 1.8,
              }}
            >
              SanatanKosham is a living digital library of Hindu knowledge — growing steadily with festivals, sacred sites, divine lore, mantras, and scripture.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {CATEGORIES.map((cat) => (
              <FadeIn key={cat.href}>
                <Card href={cat.href}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{cat.icon}</div>
                  <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1rem", color: cat.color, marginBottom: "0.5rem" }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: 1.7 }}>
                    {cat.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none" }}>
          <SacredGeometry />
        </div>
        <FadeIn style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: "rgba(255,215,100,0.9)", lineHeight: 1.9, marginBottom: "1rem" }}>
            &ldquo;सर्वे भवन्तु सुखिनः | सर्वे सन्तु निरामयाः&rdquo;
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", letterSpacing: "1px" }}>
            May all beings be happy. May all be free from disease. — Brihadaranyaka Upanishad
          </p>
        </FadeIn>
      </section>
    </>
  );
}
