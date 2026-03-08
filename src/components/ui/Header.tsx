"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Festivals", href: "/festivals" },
  { label: "Temples", href: "/temples" },
  { label: "Deities", href: "/deities" },
  { label: "Mantras", href: "/mantras" },
  { label: "Scriptures", href: "/scriptures" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        background: scrolled
          ? "rgba(26,10,46,0.97)"
          : "linear-gradient(180deg, rgba(26,10,46,0.85) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        padding: "1rem 2rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: "2rem" }}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            color: "#e6a817",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: 700,
            letterSpacing: "2px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          ॐ SanatanKosham
        </Link>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            gap: "0.25rem",
            flexWrap: "wrap",
            marginLeft: "auto",
          }}
          className="sk-desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "#ffd699",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "rgba(230,168,23,0.15)";
                (e.target as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = "#ffd699";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            marginLeft: "auto",
            background: "none",
            border: "1px solid rgba(230,168,23,0.4)",
            color: "#e6a817",
            borderRadius: "6px",
            padding: "0.4rem 0.7rem",
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
          className="sk-menu-btn"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          style={{
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            borderTop: "1px solid rgba(230,168,23,0.15)",
            marginTop: "0.5rem",
          }}
          className="sk-mobile-nav"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#ffd699",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "0.6rem 0",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .sk-desktop-nav { display: none !important; }
          .sk-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
