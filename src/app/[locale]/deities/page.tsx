import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllDeities } from "@/lib/content";
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
  const t = await getTranslations({ locale, namespace: "deities" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default async function DeitiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("deities");
  const deities = getAllDeities();

  return (
    <div style={{ paddingTop: "5rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      <div style={{ background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
          <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", background: "linear-gradient(135deg, var(--bright-gold), var(--saffron))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem" }}>
            {t("pageTitle")}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto", fontSize: "1rem", lineHeight: 1.7 }}>
            {t("heroSubtitle")}
          </p>
        </FadeIn>
      </div>

      <section style={{ padding: "4rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><SectionTitle>{t("sectionTitle")}</SectionTitle></FadeIn>
        {deities.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-light)" }}>{t("empty")}</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {deities.map((deity) => (
              <FadeIn key={deity.slug}>
                <Card href={`/deities/${deity.slug}`}>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <Badge>{deity.frontmatter.pantheon}</Badge>
                  </div>
                  <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1rem", color: "var(--text-dark)", marginBottom: "0.4rem" }}>
                    {deity.frontmatter.title}
                  </h2>
                  {deity.frontmatter.consort && (
                    <p style={{ fontSize: "0.78rem", color: "var(--text-light)", marginBottom: "0.5rem" }}>
                      Consort: {deity.frontmatter.consort}
                    </p>
                  )}
                  <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: 1.6 }}>
                    {deity.frontmatter.description}
                  </p>
                  {deity.frontmatter.attributes && (
                    <div style={{ marginTop: "1rem", display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                      {deity.frontmatter.attributes.slice(0, 3).map((attr) => (
                        <span key={attr} style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: "rgba(230,168,23,0.08)", color: "var(--text-light)", border: "1px solid rgba(230,168,23,0.15)" }}>
                          {attr}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
