"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames } from "@/i18n/config";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, { locale: e.target.value });
  }

  return (
    <select
      value={locale}
      onChange={onChange}
      aria-label="Select language"
      style={{
        background: "rgba(230,168,23,0.1)",
        border: "1px solid rgba(230,168,23,0.4)",
        color: "#ffd699",
        borderRadius: "6px",
        padding: "0.35rem 0.6rem",
        fontSize: "0.8rem",
        cursor: "pointer",
        outline: "none",
        fontFamily: "inherit",
      }}
    >
      {locales.map((loc) => (
        <option key={loc} value={loc} style={{ background: "#1a0a2e", color: "#ffd699" }}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
}
