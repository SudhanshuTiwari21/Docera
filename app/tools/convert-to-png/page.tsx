import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { ArrowRightToLine } from "lucide-react";
import { ConvertToPngTool } from "@/components/tools/ConvertToPngTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/convert-to-png";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Convert to PNG Online – JPG, GIF, WebP to PNG | Dockera",
    description:
      "Turn JPG, GIF, WebP, BMP, or TIF format images to PNG in bulk. Free, browser-based. No sign-up required.",
    keywords: ["convert to PNG", "JPG to PNG", "WebP to PNG", "GIF to PNG", "image converter"],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Convert to PNG Online – JPG, GIF, WebP to PNG | Dockera",
    description:
      "Turn JPG, GIF, WebP, BMP, or TIF format images to PNG in bulk. Free, browser-based. No sign-up required.",
    siteName: "Dockera",
    locale: "en_IN",
    type: "website",
  },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert JPG to PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your JPG (or GIF, WebP, BMP, TIF) image to this tool. Select PNG as the output format and click convert. The tool processes the image in your browser—no upload to servers. Download the PNG file when done.",
      },
    },
    {
      "@type": "Question",
      name: "When should I use PNG instead of JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG supports transparency and is lossless, so it's better for logos, graphics, screenshots, and images where sharp edges matter. JPG is better for photos and when you need smaller file sizes. Many government forms require JPEG—use our resize to 100KB tool for that.",
      },
    },
    {
      "@type": "Question",
      name: "Is converting images to PNG safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Conversion happens in your browser. Your images are not uploaded to our servers, so your files stay private. Safe for sensitive documents and personal photos.",
      },
    },
  ],
};

export default function ConvertToPngPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools/image-resizer" className="hover:text-slate-900 dark:hover:text-slate-100">
              Image tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">Convert to PNG</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <ArrowRightToLine className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Convert to PNG
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Turn JPG, GIF, WebP, BMP, or TIF images to PNG in bulk.
        </p>
      </header>

      <div className="mb-14">
        <ConvertToPngTool />
      </div>

      <section className="mb-12" aria-labelledby="formats-heading">
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Supported formats
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Input: JPG, GIF, WebP, BMP, TIF. Output: PNG. PNG supports transparency and is lossless—ideal for logos, graphics, and screenshots. For government forms that require JPEG and a specific file size, use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> tool.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-convert-to-png"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
