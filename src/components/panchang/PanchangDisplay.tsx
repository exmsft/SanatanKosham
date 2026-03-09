"use client";

import { useState, useEffect } from "react";
import { getPanchangForDate, type PanchangData } from "@/lib/panchang";

interface Labels {
  todayTitle: string;
  tithi: string;
  vara: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  shuklaPaksha: string;
  krishnaPaksha: string;
  vikramSamvat: string;
  sunrise: string;
  sunset: string;
}

interface Props {
  labels: Labels;
}

const ELEMENT_DESCRIPTIONS: Record<string, string> = {
  tithi: "Lunar day — one of 30 in the lunar month",
  vara: "Day of the week — ruled by a planet",
  nakshatra: "Lunar mansion — one of 27 stars",
  yoga: "Auspicious combination of Sun & Moon",
  karana: "Half of a Tithi — half lunar day",
};

export default function PanchangDisplay({ labels }: Props) {
  const [data, setData] = useState<PanchangData | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const today = new Date();
    setNow(today);
    setData(getPanchangForDate(today));

    // Refresh at midnight
    const msUntilMidnight = () => {
      const n = new Date();
      return new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1).getTime() - n.getTime();
    };
    const timer = setTimeout(() => {
      const d = new Date();
      setNow(d);
      setData(getPanchangForDate(d));
    }, msUntilMidnight());

    return () => clearTimeout(timer);
  }, []);

  if (!data || !now) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-light)" }}>
        Loading Panchang…
      </div>
    );
  }

  const paksha = data.paksha === "Shukla" ? labels.shuklaPaksha : labels.krishnaPaksha;

  const elements = [
    { key: "tithi",     label: labels.tithi,     value: data.tithi,     sub: `${data.tithiNumber}${getOrdinal(data.tithiNumber)} Tithi · ${paksha}` },
    { key: "vara",      label: labels.vara,      value: data.vara,      sub: now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }) },
    { key: "nakshatra", label: labels.nakshatra, value: data.nakshatra, sub: ELEMENT_DESCRIPTIONS.nakshatra },
    { key: "yoga",      label: labels.yoga,      value: data.yoga,      sub: ELEMENT_DESCRIPTIONS.yoga },
    { key: "karana",    label: labels.karana,    value: data.karana,    sub: ELEMENT_DESCRIPTIONS.karana },
  ];

  return (
    <div style={{ padding: "2rem 2rem 3rem", maxWidth: 1100, margin: "0 auto" }}>
      {/* Header bar */}
      <div
        style={{
          background: "var(--cream)",
          border: "1px solid rgba(230,168,23,0.25)",
          borderRadius: "16px",
          padding: "1.25rem 2rem",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.2rem" }}>
            {labels.vikramSamvat}
          </div>
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.4rem", color: "var(--bright-gold)", lineHeight: 1 }}>
            {data.vikramSamvatYear}
          </div>
        </div>
        <div style={{ width: "1px", height: "40px", background: "rgba(230,168,23,0.2)" }} />
        <div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.2rem" }}>
            Hindu Month
          </div>
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.1rem", color: "var(--saffron)" }}>
            {data.hinduMonth}
          </div>
        </div>
        <div style={{ width: "1px", height: "40px", background: "rgba(230,168,23,0.2)" }} />
        <div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.2rem" }}>
            Paksha
          </div>
          <div style={{ fontSize: "1rem", color: "var(--text-dark)", fontWeight: 600 }}>{paksha}</div>
        </div>
        <div style={{ width: "1px", height: "40px", background: "rgba(230,168,23,0.2)" }} />
        <div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.2rem" }}>
            {labels.sunrise}
          </div>
          <div style={{ fontSize: "1rem", color: "var(--text-dark)", fontWeight: 600 }}>🌅 {data.sunrisePretty}</div>
        </div>
        <div style={{ width: "1px", height: "40px", background: "rgba(230,168,23,0.2)" }} />
        <div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.2rem" }}>
            {labels.sunset}
          </div>
          <div style={{ fontSize: "1rem", color: "var(--text-dark)", fontWeight: 600 }}>🌇 {data.sunsetPretty}</div>
        </div>
      </div>

      {/* 5-element grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {elements.map((el) => (
          <div
            key={el.key}
            style={{
              background: "var(--cream)",
              border: "1px solid rgba(230,168,23,0.2)",
              borderRadius: "12px",
              padding: "1.25rem 1rem",
              textAlign: "center",
              transition: "box-shadow 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(230,168,23,0.15)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            <div style={{ fontSize: "0.65rem", color: "var(--saffron)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.5rem", fontWeight: 600 }}>
              {el.label}
            </div>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.05rem", color: "var(--text-dark)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
              {el.value}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-light)", lineHeight: 1.5 }}>
              {el.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] ?? s[v] ?? s[0];
}
