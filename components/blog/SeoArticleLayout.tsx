import type { Metadata } from "next";
import Link from "next/link";
import { buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://docera.com";

export type SeoArticleLayoutProps = {
  title: string;
  description: string;
  canonicalPath: string;
  faqSchema?: Record<string, unknown>;
  datePublished?: string;
  dateModified?: string;
  children: React.ReactNode;
};

export type SeoArticleMetadataParams = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
};

/**
 * Call this in your page to export metadata. Example:
 * export const metadata = getSeoArticleMetadata({ title, description, keywords, canonicalPath });
 */
export function getSeoArticleMetadata(params: SeoArticleMetadataParams): Metadata {
  const { title, description, keywords = [], canonicalPath } = params;
  const canonical = buildCanonicalUrl(canonicalPath);
  const fullTitle = title.includes("Dockera") ? title : `${title} | Dockera`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: [{ name: "Dockera", url: SITE_URL }],
    creator: "Dockera",
    metadataBase: new URL(SITE_URL),
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "article",
      url: canonical,
      title: fullTitle,
      description,
      siteName: "Dockera",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

function buildArticleSchema(
  title: string,
  description: string,
  canonicalPath: string,
  datePublished?: string,
  dateModified?: string
): Record<string, unknown> {
  const canonical = buildCanonicalUrl(canonicalPath);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "Dockera",
      url: SITE_URL,
    },
  };
  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;
  return schema;
}

export function SeoArticleLayout({
  title,
  description,
  canonicalPath,
  faqSchema,
  datePublished,
  dateModified,
  children,
}: SeoArticleLayoutProps): React.ReactElement {
  const articleSchema = buildArticleSchema(
    title,
    description,
    canonicalPath,
    datePublished,
    dateModified
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/guides" className="hover:text-slate-900 dark:hover:text-slate-100">
              Guides
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </header>

      <div className="space-y-6 text-slate-600 dark:text-slate-400 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-slate-100 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-900 dark:[&_h3]:text-slate-100 [&_p]:leading-relaxed">
        {children}
      </div>

      <div className="mt-14">
        <RelatedToolsLinks headingLevel={3} />
      </div>
    </article>
  );
}
