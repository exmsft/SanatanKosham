"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "sk_vrat_start";

const MILESTONES = [
  { hours: 6, label: "6h — Pratah Kaal" },
  { hours: 12, label: "12h — Madhyahna" },
  { hours: 18, label: "18h — Sandhya" },
  { hours: 24, label: "24h — Full Vrat" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

export default function VratTimer() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (saved > 0) {
      startRef.current = saved;
      setRunning(true);
      setElapsed(Date.now() - saved);
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startRef.current);
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  function start() {
    const now = Date.now();
    startRef.current = now;
    localStorage.setItem(STORAGE_KEY, String(now));
    setRunning(true);
    setElapsed(0);
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 1000);
  }

  function stop() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    localStorage.removeItem(STORAGE_KEY);
    startRef.current = 0;
    setRunning(false);
    setElapsed(0);
  }

  const hours = elapsed / 3600000;

  return (
    <div style={{ textAlign: "center" }}>
      <div className="vrat-display" style={{ margin: "1rem 0" }}>
        {formatDuration(elapsed)}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {MILESTONES.map((m) => (
          <div key={m.hours} className={`milestone${hours >= m.hours ? " reached" : ""}`}>
            {m.label} {hours >= m.hours ? "✓" : ""}
          </div>
        ))}
      </div>

      {!running ? (
        <button className="sk-btn sk-btn-primary" onClick={start}>
          Begin Vrat
        </button>
      ) : (
        <button className="sk-btn sk-btn-outline" onClick={stop}>
          End Vrat
        </button>
      )}
    </div>
  );
}
