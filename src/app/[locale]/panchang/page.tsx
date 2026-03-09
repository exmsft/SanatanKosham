import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { baseMetadata } from "@/lib/seo";
import FadeIn from "@/components/shared/FadeIn";
import SectionTitle from "@/components/ui/SectionTitle";
import { locales } from "@/i18n/config";
import { getUpcomingFestivals } from "@/lib/content";
import PanchangDisplay from "@/components/panchang/PanchangDisplay";
import VikramSamvatCalendar from "@/components/panchang/VikramSamvatCalendar";
import Choghadiya from "@/components/panchang/Choghadiya";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "panchang" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    ...baseMetadata(locale, "/panchang"),
  };
}

export default async function PanchangPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("panchang");

  // Serialize festivals for client calendar component (only needed fields)
  const upcomingFestivals = getUpcomingFestivals(30);
  const festivalRefs = upcomingFestivals.map((f) => ({
    slug: f.slug,
    title: f.frontmatter.title,
    gregorianDates: f.frontmatter.gregorianDates ?? [],
  }));

  const panchangLabels = {
    todayTitle:   t("todayTitle"),
    tithi:        t("tithi"),
    vara:         t("vara"),
    nakshatra:    t("nakshatra"),
    yoga:         t("yoga"),
    karana:       t("karana"),
    shuklaPaksha: t("shuklaPaksha"),
    krishnaPaksha:t("krishnaPaksha"),
    vikramSamvat: t("vikramSamvat"),
    sunrise:      t("sunrise"),
    sunset:       t("sunset"),
  };

  const calendarLabels = {
    prevMonth:    t("prevMonth"),
    nextMonth:    t("nextMonth"),
    vikramSamvat: t("vikramSamvat"),
    today:        t("today"),
  };

  const choghadiyaLabels = {
    dayChoghadiya:   t("dayChoghadiya"),
    nightChoghadiya: t("nightChoghadiya"),
    excellent:       t("excellent"),
    good:            t("good"),
    neutral:         t("neutral"),
    bad:             t("bad"),
    currentPeriod:   t("currentPeriod"),
  };

  return (
    <div style={{ paddingTop: "5rem", minHeight: "100vh", background: "var(--warm-bg)" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--deep-blue), var(--royal-purple))",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
        }}
      >
        <FadeIn>
          <div style={{ fontSize: "3.5rem", color: "var(--bright-gold)", animation: "glow 3s ease-in-out infinite alternate", marginBottom: "1rem" }}>
            🗓️
          </div>
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
            {t("pageTitle")}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              maxWidth: 620,
              margin: "0 auto",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            {t("heroSubtitle")}
          </p>
        </FadeIn>
      </div>

      {/* Today's Panchang */}
      <section style={{ padding: "3rem 0 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <FadeIn>
            <SectionTitle>{t("todayTitle")}</SectionTitle>
          </FadeIn>
        </div>
        <PanchangDisplay labels={panchangLabels} />
      </section>

      {/* Vikram Samvat Calendar */}
      <section style={{ padding: "2rem 0 0", background: "var(--warm-bg-alt)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <FadeIn>
            <SectionTitle>{t("calendarTitle")}</SectionTitle>
          </FadeIn>
        </div>
        <VikramSamvatCalendar festivals={festivalRefs} labels={calendarLabels} />
      </section>

      {/* Daily Choghadiya */}
      <section style={{ padding: "2rem 0 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <FadeIn>
            <SectionTitle>{t("choghadiyaTitle")}</SectionTitle>
          </FadeIn>
        </div>
        <Choghadiya labels={choghadiyaLabels} />
      </section>
    </div>
  );
}
