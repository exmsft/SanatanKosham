import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllScriptures } from "@/lib/content";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/shared/FadeIn";
import Badge from "@/components/ui/Badge";
import type { Metadata } from "next";
import { locales } from "@/i18n/config";

interface Props { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "scriptures" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

const SCRIPTURE_CATEGORIES = [
  { category: "veda", label: "The Four Vedas", icon: "🔥", description: "The oldest scriptures — Rigveda, Samaveda, Yajurveda, Atharvaveda — revealed (Shruti) wisdom." },
  { category: "upanishad", label: "Upanishads", icon: "🧘", description: "The philosophical culmination of the Vedas — 108 texts on the nature of Brahman and Atman." },
  { category: "purana", label: "Puranas", icon: "📖", description: "18 major texts of mythology, cosmology, genealogy, and devotional teachings." },
  { category: "itihasa", label: "Itihasa", icon: "⚔️", description: "The great epics — Ramayana and Mahabharata (including the Bhagavad Gita)." },
  { category: "smriti", label: "Smritis", icon: "⚖️", description: "Codes of law and conduct — Manu Smriti, Yajnavalkya Smriti, and the Dharmashastra tradition." },
  { category: "agama", label: "Agamas & Tantras", icon: "🌸", description: "Sectarian scriptures of Shaivism, Vaishnavism, and Shaktism on worship and yoga." },
];

export default async function ScripturesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("scriptures");
  const scriptures = getAllScriptures();

  return (
    <div style={{ paddingTop: "5rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      <div style={{ background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📜</div>
          <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", background: "linear-gradient(135deg, var(--bright-gold), var(--saffron))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem" }}>
            {t("pageTitle")}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto", fontSize: "1rem", lineHeight: 1.7 }}>
            {t("heroSubtitle")}
          </p>
        </FadeIn>
      </div>

      <section style={{ padding: "4rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><SectionTitle>{t("sectionTitle")}</SectionTitle></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
          {SCRIPTURE_CATEGORIES.map((cat) => (
            <FadeIn key={cat.category}>
              <div style={{ background: "var(--cream)", border: "1px solid rgba(230,168,23,0.2)", borderRadius: "16px", padding: "1.5rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{cat.icon}</div>
                <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1rem", color: "var(--saffron)", marginBottom: "0.5rem" }}>{cat.label}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: 1.7 }}>{cat.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {scriptures.length > 0 && (
          <>
            <FadeIn>
              <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.5rem", color: "var(--saffron)", textAlign: "center", marginBottom: "0.5rem" }}>
                In the Kosham
              </h2>
              <div style={{ width: "80px", height: "3px", background: "linear-gradient(90deg, transparent, var(--light-saffron), transparent)", margin: "0 auto 2rem" }} />
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {scriptures.map((scripture) => (
                <FadeIn key={scripture.slug}>
                  <Card href={`/scriptures/${scripture.slug}`}>
                    <div style={{ marginBottom: "0.75rem", display: "flex", gap: "0.4rem" }}>
                      <Badge>{scripture.frontmatter.category}</Badge>
                      {scripture.frontmatter.chapters && <Badge>{scripture.frontmatter.chapters} chapters</Badge>}
                    </div>
                    <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1rem", color: "var(--text-dark)", marginBottom: "0.4rem" }}>
                      {scripture.frontmatter.title}
                    </h2>
                    {scripture.frontmatter.period && (
                      <p style={{ fontSize: "0.78rem", color: "var(--text-light)", marginBottom: "0.5rem" }}>{scripture.frontmatter.period}</p>
                    )}
                    <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: 1.6 }}>
                      {scripture.frontmatter.description}
                    </p>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
