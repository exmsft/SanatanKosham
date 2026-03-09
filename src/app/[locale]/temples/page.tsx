import { getTranslations, setRequestLocale } from "next-intl/server";
import { baseMetadata } from "@/lib/seo";
import { getAllTemples } from "@/lib/content";
import { Link } from "@/i18n/navigation";
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
  const t = await getTranslations({ locale, namespace: "temples" });
  return { title: t("pageTitle"), description: t("pageDescription"), ...baseMetadata(locale, "/temples") };
}

export default async function TemplesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("temples");
  const temples = getAllTemples();

  return (
    <div style={{ paddingTop: "5rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      <div style={{ background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛕</div>
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
        {temples.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-light)" }}>{t("empty")}</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {temples.map((temple) => (
              <FadeIn key={temple.slug}>
                <Card href={`/temples/${temple.slug}`}>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                    {temple.frontmatter.templeType?.slice(0, 2).map((tp) => <Badge key={tp}>{tp}</Badge>)}
                  </div>
                  <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1rem", color: "var(--text-dark)", marginBottom: "0.4rem", lineHeight: 1.4 }}>
                    {temple.frontmatter.title}
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--saffron)", marginBottom: "0.5rem", fontWeight: 500 }}>
                    📍 {temple.frontmatter.location}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: 1.6 }}>
                    {temple.frontmatter.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
