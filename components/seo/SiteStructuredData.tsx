import { SITE_URL } from "@/lib/seo";

/**
 * Sitewide JSON-LD: Organization + WebSite. Rendered once in the root layout.
 * No SearchAction — Dockera has no site-search endpoint, so a sitelinks searchbox
 * would point nowhere.
 */
export function SiteStructuredData() {
  const base = SITE_URL.replace(/\/$/, "");

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: "Dockera",
        url: base,
        logo: `${base}/Logo-dark.png`,
        description:
          "Free online document and image tools for India—resize images for government forms, compress PDFs, create passport photos, extract signatures, and chat with your PDFs using AI.",
        email: "info@dockera.in",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "Dockera",
        publisher: { "@id": `${base}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
