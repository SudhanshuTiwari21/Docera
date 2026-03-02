import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { Layers } from "lucide-react";
import { MergePdfTool } from "@/components/tools/MergePdfTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/merge-pdf";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Merge PDF Online – Combine Multiple PDFs | Dockera",
    description:
      "Combine multiple PDFs into one file. Reorder pages and merge in seconds. Free, browser-based. No sign-up required.",
    keywords: ["merge PDF", "combine PDF", "join PDF", "merge PDF online"],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Merge PDF Online – Combine Multiple PDFs | Dockera",
    description:
      "Combine multiple PDFs into one file. Reorder pages and merge in seconds. Free, browser-based. No sign-up required.",
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
      name: "How do I merge PDF files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload the PDF files you want to combine. Drag to reorder them if needed. Click merge and the tool will create a single PDF. Processing happens in your browser—your files are not stored on our servers.",
      },
    },
    {
      "@type": "Question",
      name: "Can I reorder pages when merging PDFs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Before merging, you can drag and drop to change the order of files and pages. This lets you combine documents in the exact sequence you need for reports, portfolios, or applications.",
      },
    },
    {
      "@type": "Question",
      name: "Is merging PDFs safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool processes PDFs in your browser. Your documents are not uploaded to our servers for processing, so your data stays private. Safe for sensitive documents and official forms.",
      },
    },
  ],
};

export default function MergePdfPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Merge PDF</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <Layers className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Merge PDF Online
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Combine multiple PDFs into one file. Reorder pages and merge in seconds.
        </p>
      </header>

      <div className="mb-14">
        <MergePdfTool />
      </div>

      <section className="mb-12" aria-labelledby="why-merge-heading">
        <h2 id="why-merge-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why merge PDFs?
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Combine scanned documents, reports, certificates, or application attachments into a single PDF. Useful for job applications, college submissions, and form uploads with multiple required documents. After merging, use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link> if you need to reduce file size for upload limits.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-merge-pdf"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
