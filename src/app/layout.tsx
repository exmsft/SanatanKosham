import type { Metadata, Viewport } from "next";
import { Cinzel_Decorative, Poppins, Playfair_Display } from "next/font/google";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "SanatanKosham — Hindu Knowledge Hub",
    template: "%s | SanatanKosham",
  },
  description:
    "A comprehensive digital knowledge hub for Hindu festivals, temples, deities, scriptures, and mantras. Explore the timeless wisdom of Sanatana Dharma.",
  keywords: [
    "Hindu festivals",
    "Hindu temples",
    "Hindu deities",
    "Sanskrit mantras",
    "Hindu scriptures",
    "Sanatana Dharma",
  ],
  authors: [{ name: "SanatanKosham" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SanatanKosham",
  },
  openGraph: {
    type: "website",
    siteName: "SanatanKosham",
    title: "SanatanKosham — Hindu Knowledge Hub",
    description:
      "Explore Hindu festivals, temples, deities, scriptures, and mantras.",
  },
};

export const viewport: Viewport = {
  themeColor: "#e65100",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzelDecorative.variable} ${poppins.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
