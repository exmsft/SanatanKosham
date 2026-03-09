"use client";

import { useState, useEffect } from "react";
import {
  getCurrentVSMonthYear,
  getVikramSamvatCalendar,
  HINDU_MONTHS,
  type FestivalRef,
  type CalendarDay,
} from "@/lib/panchang";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Labels {
  prevMonth: string;
  nextMonth: string;
  vikramSamvat: string;
  today: string;
}

interface Props {
  festivals: FestivalRef[];
  labels: Labels;
}

export default function VikramSamvatCalendar({ festivals, labels }: Props) {
  const [vsYear, setVsYear] = useState(0);
  const [vsMonthIndex, setVsMonthIndex] = useState(0);
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [startWeekday, setStartWeekday] = useState(0);

  useEffect(() => {
    const { vsYear: y, vsMonthIndex: m } = getCurrentVSMonthYear(new Date());
    setVsYear(y);
    setVsMonthIndex(m);
  }, []);

  useEffect(() => {
    if (!vsYear) return;
    const calDays = getVikramSamvatCalendar(vsYear, vsMonthIndex, festivals);
    setDays(calDays);
    setStartWeekday(calDays[0]?.gregorianDate.getDay() ?? 0);
  }, [vsYear, vsMonthIndex, festivals]);

  function prevMonth() {
    setVsMonthIndex((m) => {
      if (m === 0) { setVsYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }

  function nextMonth() {
    setVsMonthIndex((m) => {
      if (m === 11) { setVsYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }

  const typeColor = (type: string) => {
    switch (type) {
      case "excellent": return "#10b981";
      case "good":      return "#22c55e";
      case "neutral":   return "#f59e0b";
      default:          return "#ef4444";
    }
  };

  return (
    <div style={{ padding: "0 2rem 3rem", maxWidth: 1100, margin: "0 auto" }}>
      {/* Month navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <button
          onClick={prevMonth}
          className="sk-btn sk-btn-outline"
          style={{ fontSize: "0.85rem", padding: "0.4rem 1rem" }}
        >
          {labels.prevMonth}
        </button>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.4rem", color: "var(--saffron)" }}>
            {HINDU_MONTHS[vsMonthIndex]}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-light)", letterSpacing: "1px" }}>
            {labels.vikramSamvat} {vsYear}
          </div>
        </div>

        <button
          onClick={nextMonth}
          className="sk-btn sk-btn-outline"
          style={{ fontSize: "0.85rem", padding: "0.4rem 1rem" }}
        >
          {labels.nextMonth}
        </button>
      </div>

      {/* Weekday headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "4px" }}>
        {WEEKDAY_LABELS.map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--text-light)",
              letterSpacing: "1px",
              textTransform: "uppercase",
              padding: "0.4rem 0",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {/* Empty cells before first day */}
        {Array.from({ length: startWeekday }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          const isToday = day.isToday;
          const hasFestival = !!day.festivalSlug;

          return (
            <div
              key={day.gregorianDate.toISOString()}
              title={day.festivalTitle ?? ""}
              style={{
                background: isToday ? "rgba(230,168,23,0.12)" : "var(--cream)",
                border: isToday
                  ? "2px solid var(--saffron)"
                  : "1px solid rgba(230,168,23,0.15)",
                borderRadius: "8px",
                padding: "0.4rem 0.3rem",
                textAlign: "center",
                cursor: hasFestival ? "pointer" : "default",
                position: "relative",
                minHeight: "56px",
                transition: "box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (hasFestival) (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(230,168,23,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Festival dot */}
              {hasFestival && (
                <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--bright-gold)",
                  }}
                />
              )}

              {/* Gregorian date */}
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: isToday ? 700 : 400,
                  color: isToday ? "var(--saffron)" : "var(--text-dark)",
                  lineHeight: 1.2,
                }}
              >
                {day.gregorianDate.getDate()}
              </div>

              {/* Tithi */}
              <div
                style={{
                  fontSize: "0.6rem",
                  color: "var(--bright-gold)",
                  marginTop: "2px",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {day.tithi}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-light)" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--bright-gold)" }} />
          Festival day
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-light)" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: "2px solid var(--saffron)", background: "rgba(230,168,23,0.12)" }} />
          Today
        </div>
      </div>
    </div>
  );
}
