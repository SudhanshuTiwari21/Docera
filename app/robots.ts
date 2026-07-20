import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dockera.in";

/** Declares crawl rules and sitemap URL for Google Search Console. */
export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
