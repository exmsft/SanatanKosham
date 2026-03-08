"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string; // ISO date string e.g. "2027-03-06T18:00:00+05:30"
  celebrationMessage?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculate(target: number): TimeLeft | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({
  targetDate,
  celebrationMessage = "The Sacred Day is Here!",
}: CountdownTimerProps) {
  const target = new Date(targetDate).getTime();
  const [time, setTime] = useState<TimeLeft | null>(() => calculate(target));

  useEffect(() => {
    const id = setInterval(() => setTime(calculate(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!time) {
    return (
      <p
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          color: "var(--bright-gold)",
          fontSize: "1.4rem",
          textAlign: "center",
          letterSpacing: "3px",
          animation: "pulse-text 2s ease-in-out infinite",
        }}
      >
        {celebrationMessage}
      </p>
    );
  }

  const units = [
    { label: "Days", value: pad(time.days) },
    { label: "Hours", value: pad(time.hours) },
    { label: "Minutes", value: pad(time.minutes) },
    { label: "Seconds", value: pad(time.seconds) },
  ];

  return (
    <div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem",
          color: "rgba(255,255,255,0.85)",
          marginBottom: "1rem",
          letterSpacing: "3px",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Counting down to the sacred night
      </h3>
      <div className="countdown">
        {units.map((u) => (
          <div key={u.label} className="countdown-item">
            <span className="number">{u.value}</span>
            <span className="label">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
