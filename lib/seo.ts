const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://docera.com";

export type MetadataParams = {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildCanonicalUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export function getDefaultMetadata(params: MetadataParams = {}) {
  const {
    title = "Dockera – Free Online Document & Image Tools for India",
    description = "Resize images for government forms, compress PDFs online, create passport photos, and extract signatures. Free tools for Indian government forms and documents.",
    keywords = [
      "resize image for govt forms",
      "compress PDF online India",
      "passport photo size tool",
      "signature extractor",
      "government form photo size",
      "Indian passport photo",
      "Aadhaar photo size",
      "online document tools India",
    ],
    path = "",
    image = `${SITE_URL}/og-default.png`,
    noIndex = false,
  } = params;

  const canonical = buildCanonicalUrl(path || "/");
  const fullTitle =
    title.includes("Dockera") ? title : (path ? `${title} | Dockera` : title);

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Dockera", url: SITE_URL }],
    creator: "Dockera",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "website",
      url: canonical,
      title: fullTitle,
      description,
      siteName: "Dockera",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
