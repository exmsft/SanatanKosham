"use client";

import { useState, useEffect } from "react";
import { getChoghadiya, type ChoghadiyaEntry, type ChoghadiyaType } from "@/lib/panchang";

interface Labels {
  dayChoghadiya: string;
  nightChoghadiya: string;
  excellent: string;
  good: string;
  neutral: string;
  bad: string;
  currentPeriod: string;
}

interface Props {
  labels: Labels;
}

function typeColor(type: ChoghadiyaType): string {
  switch (type) {
    case "excellent": return "#10b981";
    case "good":      return "#22c55e";
    case "neutral":   return "#f59e0b";
    default:          return "#ef4444";
  }
}

function typeBg(type: ChoghadiyaType): string {
  switch (type) {
    case "excellent": return "rgba(16,185,129,0.1)";
    case "good":      return "rgba(34,197,94,0.1)";
    case "neutral":   return "rgba(245,158,11,0.1)";
    default:          return "rgba(239,68,68,0.08)";
  }
}

function typeLabel(type: ChoghadiyaType, labels: Labels): string {
  switch (type) {
    case "excellent": return labels.excellent;
    case "good":      return labels.good;
    case "neutral":   return labels.neutral;
    default:          return labels.bad;
  }
}

function formatTimeRange(start: Date, end: Date): string {
  const fmt = (d: Date) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${fmt(start)} – ${fmt(end)}`;
}

export default function Choghadiya({ labels }: Props) {
  const [entries, setEntries] = useState<ChoghadiyaEntry[]>([]);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const update = () => {
      const n = new Date();
      setNow(n);
      setEntries(getChoghadiya(n));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const dayEntries   = entries.filter((e) => e.isDay);
  const nightEntries = entries.filter((e) => !e.isDay);

  const isActive = (e: ChoghadiyaEntry) =>
    now >= e.startTime && now < e.endTime;

  const renderSection = (title: string, icon: string, list: ChoghadiyaEntry[]) => (
    <div style={{ marginBottom: "2rem" }}>
      <h3
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: "1.1rem",
          color: "var(--saffron)",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span>{icon}</span> {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {list.map((entry, i) => {
          const active = isActive(entry);
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                alignItems: "center",
                gap: "1rem",
                padding: "0.65rem 1rem",
                borderRadius: "10px",
                background: active ? typeBg(entry.type) : "var(--cream)",
                border: active
                  ? `2px solid ${typeColor(entry.type)}`
                  : "1px solid rgba(230,168,23,0.12)",
                animation: active ? "pulse-border 2s ease-in-out infinite" : "none",
                transition: "all 0.2s ease",
              }}
            >
              {/* Time + Name */}
              <div>
                <div
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "0.95rem",
                    color: active ? typeColor(entry.type) : "var(--text-dark)",
                    fontWeight: active ? 700 : 400,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {entry.name}
                  {active && (
                    <span
                      style={{
                        fontSize: "0.65rem",
                        background: typeColor(entry.type),
                        color: "#fff",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "999px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        fontFamily: "inherit",
                      }}
                    >
                      {labels.currentPeriod}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-light)", marginTop: "2px" }}>
                  {formatTimeRange(entry.startTime, entry.endTime)}
                </div>
              </div>

              {/* Color bar */}
              <div
                style={{
                  width: "4px",
                  height: "36px",
                  borderRadius: "2px",
                  background: typeColor(entry.type),
                  opacity: 0.7,
                }}
              />

              {/* Type badge */}
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: typeColor(entry.type),
                  background: typeBg(entry.type),
                  border: `1px solid ${typeColor(entry.type)}30`,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "999px",
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                }}
              >
                {typeLabel(entry.type, labels)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ padding: "0 2rem 3rem", maxWidth: 900, margin: "0 auto" }}>
      {renderSection(labels.dayChoghadiya, "☀️", dayEntries)}
      {renderSection(labels.nightChoghadiya, "🌙", nightEntries)}

      <style>{`
        @keyframes pulse-border {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
      `}</style>
    </div>
  );
}
