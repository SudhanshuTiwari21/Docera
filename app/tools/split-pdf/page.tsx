import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { Scissors } from "lucide-react";
import { SplitPdfTool } from "@/components/tools/SplitPdfTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/split-pdf";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Split PDF Online – Extract Pages or Split by Range | Dockera",
    description:
      "Split one PDF into multiple files. Extract pages or split by range. Free, browser-based. No sign-up required.",
    keywords: ["split PDF", "extract PDF pages", "PDF splitter", "split PDF online"],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Split PDF Online – Extract Pages or Split by Range | Dockera",
    description:
      "Split one PDF into multiple files. Extract pages or split by range. Free, browser-based. No sign-up required.",
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
      name: "How do I split a PDF into multiple files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your PDF, then choose how to split: extract specific pages, split every N pages, or split by page ranges. The tool creates separate PDF files for each part. Processing happens in your browser—your documents stay private.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract a single page from a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Select the page (or pages) you want to extract and the tool will create a new PDF with just those pages. Useful for pulling one document from a combined file or isolating a specific form or certificate.",
      },
    },
    {
      "@type": "Question",
      name: "Is splitting PDFs safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Processing happens in your browser. Your PDFs are not uploaded to our servers for processing, so your documents stay private. Safe for sensitive and official documents.",
      },
    },
  ],
};

export default function SplitPdfPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Split PDF</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <Scissors className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Split PDF Online
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Split one PDF into multiple files. Extract pages or split by range.
        </p>
      </header>

      <div className="mb-14">
        <SplitPdfTool />
      </div>

      <section className="mb-12" aria-labelledby="why-split-heading">
        <h2 id="why-split-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why split PDFs?
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Extract specific pages, separate a multi-document PDF into individual files, or split large files for easier sharing. Useful when you need to submit one form from a combined document or reduce individual file sizes. Use our <Link href="/tools/merge-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">merge PDF</Link> to combine files, or <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">compress PDF</Link> to reduce size.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-split-pdf"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
