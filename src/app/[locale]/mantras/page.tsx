import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllMantras } from "@/lib/content";
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
  const t = await getTranslations({ locale, namespace: "mantras" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default async function MantrasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("mantras");
  const mantras = getAllMantras();

  return (
    <div style={{ paddingTop: "5rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      <div style={{ background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontSize: "3.5rem", color: "var(--bright-gold)", animation: "glow 3s ease-in-out infinite alternate", marginBottom: "1rem" }}>ॐ</div>
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
        {mantras.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-light)" }}>{t("empty")}</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {mantras.map((mantra) => (
              <FadeIn key={mantra.slug}>
                <Card href={`/mantras/${mantra.slug}`}>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                    {mantra.frontmatter.deity?.map((d) => <Badge key={d}>{d}</Badge>)}
                  </div>
                  <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1rem", color: "var(--text-dark)", marginBottom: "0.5rem" }}>
                    {mantra.frontmatter.title}
                  </h2>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", color: "var(--saffron)", marginBottom: "0.5rem", fontStyle: "italic", lineHeight: 1.5 }}>
                    {mantra.frontmatter.transliteration}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-medium)", lineHeight: 1.6 }}>
                    {mantra.frontmatter.meaning}
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
