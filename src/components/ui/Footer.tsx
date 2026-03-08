import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--deep-blue)",
        color: "rgba(255,255,255,0.7)",
        padding: "3rem 2rem 2rem",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            color: "var(--bright-gold)",
            fontSize: "1.4rem",
            marginBottom: "0.5rem",
          }}
        >
          ॐ SanatanKosham
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: "rgba(255,215,100,0.7)",
            fontSize: "0.9rem",
            marginBottom: "2rem",
          }}
        >
          सर्वे भवन्तु सुखिनः — May all beings be happy
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Festivals", href: "/festivals" },
            { label: "Temples", href: "/temples" },
            { label: "Deities", href: "/deities" },
            { label: "Mantras", href: "/mantras" },
            { label: "Scriptures", href: "/scriptures" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "rgba(255,215,100,0.7)",
                textDecoration: "none",
                fontSize: "0.85rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(230,168,23,0.15)",
            paddingTop: "1.5rem",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <p>
            © {new Date().getFullYear()} SanatanKosham.com — A digital preservation of Sanatana Dharma knowledge.
          </p>
          <p style={{ marginTop: "0.3rem" }}>
            Built with devotion. Content is for educational and spiritual purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
