import type { Metadata, Viewport } from "next";
import { baseMetadata, SITE_URL } from "@/lib/seo";
import { websiteSchema } from "@/lib/jsonld";
import {
  Cinzel_Decorative,
  Poppins,
  Playfair_Display,
  Noto_Sans_Devanagari,
  Noto_Sans_Kannada,
  Noto_Sans_Telugu,
  Noto_Sans_Bengali,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { locales, type Locale } from "@/i18n/config";
import "../globals.css";

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
  preload: false,
});

const notoKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-kannada",
  display: "swap",
  preload: false,
});

const notoTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-telugu",
  display: "swap",
  preload: false,
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-bengali",
  display: "swap",
  preload: false,
});

function getScriptFontVariable(locale: string): string {
  switch (locale) {
    case "hi": return notoDevanagari.variable;
    case "kn": return notoKannada.variable;
    case "te": return notoTelugu.variable;
    case "bn": return notoBengali.variable;
    default: return "";
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    ...baseMetadata(locale, ""),
    title: {
      default: t("siteTitle"),
      template: `%s | SanatanKosham`,
    },
    description: t("siteDescription"),
    keywords: [
      "Hindu festivals", "Hindu temples", "Hindu deities",
      "Sanskrit mantras", "Hindu scriptures", "Sanatana Dharma",
      "Panchang", "Vikram Samvat", "Choghadiya",
    ],
    authors: [{ name: "SanatanKosham", url: SITE_URL }],
    creator: "SanatanKosham",
    publisher: "SanatanKosham",
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "SanatanKosham",
    },
    openGraph: {
      type: "website",
      siteName: "SanatanKosham",
      title: t("siteTitle"),
      description: t("siteDescription"),
      url: `${SITE_URL}/${locale}`,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      site: "@SanatanKosham",
      title: t("siteTitle"),
      description: t("siteDescription"),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#e65100",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const scriptFontVariable = getScriptFontVariable(locale);

  return (
    <html
      lang={locale}
      className={`${cinzelDecorative.variable} ${poppins.variable} ${playfairDisplay.variable} ${scriptFontVariable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
