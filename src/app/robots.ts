import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "FacebookExternalHit", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
    ],
    sitemap: "https://www.sanatankosham.com/sitemap.xml",
    host: "https://www.sanatankosham.com",
  };
}
