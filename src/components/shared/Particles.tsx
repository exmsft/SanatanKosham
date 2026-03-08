"use client";

import { useEffect } from "react";

export default function Particles() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const count = window.innerWidth < 768 ? 15 : 40;
    const container = document.getElementById("particles-container");
    if (!container) return;

    const particles: HTMLElement[] = [];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = Math.random() * 8 + 6 + "s";
      p.style.animationDelay = Math.random() * 10 + "s";
      const size = Math.random() * 4 + 2 + "px";
      p.style.width = size;
      p.style.height = size;
      container.appendChild(p);
      particles.push(p);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return <div id="particles-container" className="particles" aria-hidden="true" />;
}
