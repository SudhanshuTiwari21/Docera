import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { ArrowLeftFromLine } from "lucide-react";
import { ConvertFromJpgTool } from "@/components/tools/ConvertFromJpgTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/convert-from-jpg";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Convert from JPG Online – JPG to PNG, GIF | Dockera",
    description:
      "Turn JPG images to PNG and GIF. Create animated GIFs from multiple JPGs. Free, browser-based. No sign-up required.",
    keywords: ["convert from JPG", "JPG to PNG", "JPG to GIF", "animated GIF", "image converter"],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Convert from JPG Online – JPG to PNG, GIF | Dockera",
    description:
      "Turn JPG images to PNG and GIF. Create animated GIFs from multiple JPGs. Free, browser-based. No sign-up required.",
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
      name: "How do I convert JPG to PNG or GIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload one or more JPG images. Choose PNG for a single image or GIF for multiple images (including animated GIF). The tool converts in your browser—no server upload. Download the output when done.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create an animated GIF from JPGs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Select multiple JPG images and choose GIF as the output format. The tool combines them into an animated GIF. Adjust frame delay if needed. Useful for simple animations, slideshows, and memes.",
      },
    },
    {
      "@type": "Question",
      name: "When should I convert JPG to PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use PNG when you need transparency or lossless quality (e.g. logos, graphics, screenshots). JPG is better for photos and smaller file sizes. For government forms requiring JPEG and a specific size, use our resize to 100KB tool instead.",
      },
    },
  ],
};

export default function ConvertFromJpgPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Convert from JPG</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <ArrowLeftFromLine className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Convert from JPG
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Turn JPG images to PNG and GIF. Create animated GIFs from multiple JPGs.
        </p>
      </header>

      <div className="mb-14">
        <ConvertFromJpgTool />
      </div>

      <section className="mb-12" aria-labelledby="formats-heading">
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Output formats
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          PNG: lossless, supports transparency. GIF: supports animation when using multiple JPGs. For government form photos (JPEG, 100KB, 50KB), use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> tool.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-convert-from-jpg"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
