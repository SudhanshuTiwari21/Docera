import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { ImageIcon } from "lucide-react";
import { ImageToPdfTool } from "@/components/tools/ImageToPdfTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/image-to-pdf";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Image to PDF Online – JPG, PNG, WebP, GIF to PDF | Dockera",
    description:
      "Convert any image type — JPG, PNG, WebP, GIF, BMP, TIF — to PDF in seconds. Free, browser-based. No sign-up required.",
    keywords: ["image to PDF", "PNG to PDF", "WebP to PDF", "convert image to PDF"],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Image to PDF Online – JPG, PNG, WebP, GIF to PDF | Dockera",
    description:
      "Convert any image type — JPG, PNG, WebP, GIF, BMP, TIF — to PDF in seconds. Free, browser-based. No sign-up required.",
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
      name: "How do I convert images to PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload one or more images (JPG, PNG, WebP, GIF, BMP, TIF). Arrange the order, adjust layout if needed, and click convert. The tool creates a PDF. Processing happens in your browser—no server upload.",
      },
    },
    {
      "@type": "Question",
      name: "Which image formats can I convert to PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports JPG, PNG, WebP, GIF, BMP, and TIF. You can mix formats in one conversion. For JPG-only workflows, our JPG to PDF tool is also available. For PDF size limits, use our PDF compressor after conversion.",
      },
    },
    {
      "@type": "Question",
      name: "Is image to PDF conversion safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Conversion happens in your browser. Your images are not uploaded to our servers for processing, so your files stay private. Safe for personal and sensitive documents.",
      },
    },
  ],
};

export default function ImageToPdfPage() {
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
              Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">Image to PDF</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <ImageIcon className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Image to PDF Online
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Convert any image type — JPG, PNG, WebP, GIF, BMP, TIF — to PDF in seconds.
        </p>
      </header>

      <div className="mb-14">
        <ImageToPdfTool />
      </div>

      <section className="mb-12" aria-labelledby="formats-heading">
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Supported formats
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Input: JPG, PNG, WebP, GIF, BMP, TIF. Output: PDF. Combine multiple images into one PDF. For JPG-only conversion, use <Link href="/tools/jpg-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">JPG to PDF</Link>. To resize photos for forms, use <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link>.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-image-to-pdf"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
