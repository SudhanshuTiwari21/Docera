import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { FileText } from "lucide-react";
import { JpgToPdfTool } from "@/components/tools/JpgToPdfTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/jpg-to-pdf";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "JPG to PDF Online – Convert Images to PDF | Dockera",
    description:
      "Convert JPG images to PDF in seconds. Adjust orientation and margins. Free, browser-based. No sign-up required.",
    keywords: ["JPG to PDF", "image to PDF", "convert JPG to PDF", "photo to PDF"],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "JPG to PDF Online – Convert Images to PDF | Dockera",
    description:
      "Convert JPG images to PDF in seconds. Adjust orientation and margins. Free, browser-based. No sign-up required.",
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
      name: "How do I convert JPG to PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload one or more JPG images. Arrange the order if needed, adjust orientation and margins, then click convert. The tool creates a PDF with your images. Processing happens in your browser—no server upload.",
      },
    },
    {
      "@type": "Question",
      name: "Can I combine multiple JPGs into one PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upload multiple JPG files and they will be combined into a single PDF in the order you specify. Useful for creating document portfolios, scanned document bundles, or multi-page submissions.",
      },
    },
    {
      "@type": "Question",
      name: "Is JPG to PDF conversion safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Conversion happens in your browser. Your images are not uploaded to our servers for processing, so your files stay private. Safe for personal photos and sensitive documents.",
      },
    },
  ],
};

export default function JpgToPdfPage() {
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
          <li className="text-slate-900 dark:text-slate-100">JPG to PDF</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <FileText className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          JPG to PDF Online
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Convert JPG images to PDF in seconds. Adjust orientation and margins.
        </p>
      </header>

      <div className="mb-14">
        <JpgToPdfTool />
      </div>

      <section className="mb-12" aria-labelledby="use-cases-heading">
        <h2 id="use-cases-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Use cases
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Create PDFs from photos for submissions, portfolios, or document scans. Combine multiple JPGs into one PDF. For other image formats (PNG, WebP, GIF), use our <Link href="/tools/image-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">image to PDF</Link> tool. To reduce photo file size for forms, use <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link>.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-jpg-to-pdf"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
