import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const NAV_KEYS = ["festivals", "temples", "deities", "mantras", "scriptures"] as const;

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

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
          {t("tagline")}
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
          {NAV_KEYS.map((key) => (
            <Link
              key={key}
              href={`/${key}`}
              style={{
                color: "rgba(255,215,100,0.7)",
                textDecoration: "none",
                fontSize: "0.85rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
              }}
            >
              {tNav(key)}
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
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p style={{ marginTop: "0.3rem" }}>
            {t("builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
