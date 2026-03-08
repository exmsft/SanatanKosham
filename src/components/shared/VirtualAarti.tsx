"use client";

import { useEffect, useRef, useState } from "react";

interface VirtualAartiProps {
  deity?: string;
  storageKey?: string;
}

export default function VirtualAarti({ deity = "Ishvara", storageKey = "sk_aarti_count" }: VirtualAartiProps) {
  const [count, setCount] = useState(0);
  const [offering, setOffering] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setCount(parseInt(localStorage.getItem(storageKey) || "0", 10));
  }, [storageKey]);

  function ringBell() {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.5);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 2.2);
    } catch {
      // audio unavailable
    }
  }

  function offer() {
    setOffering(true);
    setTimeout(() => setOffering(false), 400);
    ringBell();
    setCount((prev) => {
      const next = prev + 1;
      localStorage.setItem(storageKey, String(next));
      return next;
    });
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div
        className={`aarti-flame${offering ? " offering" : ""}`}
        onClick={offer}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); offer(); }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Offer Aarti to ${deity}`}
        title={`Click to offer Aarti to ${deity}`}
      >
        🪔
      </div>
      <p style={{ fontSize: "0.9rem", color: "var(--text-medium)", marginTop: "0.75rem" }}>
        Tap the flame to offer Aarti to {deity}
      </p>
      <p style={{ fontSize: "1.1rem", color: "var(--saffron)", fontWeight: 600, marginTop: "0.25rem" }}>
        {count} {count === 1 ? "offering" : "offerings"} made
      </p>
    </div>
  );
}
