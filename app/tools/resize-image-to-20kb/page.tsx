import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { ResizeImageTool } from "@/components/tools/ResizeImageTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/resize-image-to-20kb";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Resize Image to 20KB Online for Govt Forms | Dockera India",
    description:
      "Resize image to 20KB online for SSC, UPSC, railway and other government forms with strict size limits. Free image size reducer for Indian users.",
    keywords: [
      "resize image to 20kb",
      "image 20kb for govt forms",
      "compress photo 20kb",
      "SSC form photo size",
      "UPSC photo 20kb",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I resize an image to 20KB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your image on this page, select 20 KB as the target size (or choose from 20KB, 50KB, 100KB), and click Resize image. The tool compresses your photo in the browser. Download the resized image—no data is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Which government forms require 20KB photo size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some SSC, UPSC, and state recruitment forms specify a 20KB or 30KB limit for the applicant photo. Use this tool to resize your image to exactly 20KB so your form upload is accepted.",
      },
    },
    {
      "@type": "Question",
      name: "Is the 20KB image resizer free and safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool is free and runs entirely in your browser. Your images are never uploaded. You can use it for sensitive documents and government form photos with confidence.",
      },
    },
  ],
};

export default function ResizeImageTo20kbPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools/image-resizer" className="hover:text-slate-900 dark:hover:text-slate-100">Image tools</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">Resize to 20KB</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Resize Image to 20KB Online for Govt Forms
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Resize image to 20KB online for SSC, UPSC, railway and other government forms with strict file size limits. Free, private, and works in your browser.
        </p>
      </header>

      <div className="mb-14">
        <ResizeImageTool
          defaultTargetSize={20}
          seoTitle="Resize Image to 20KB | Dockera"
          seoDescription=""
          heading="Resize image to 20KB"
        />
      </div>

      <section className="mb-12" aria-labelledby="context-heading">
        <h2 id="context-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why resize to 20KB for government forms?
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Many Indian government and recruitment portals—including SSC, UPSC, railway, and state-level exams—impose strict limits on photograph file size. A common requirement is 20KB to 100KB. When the limit is 20KB or 30KB, applicants often struggle to reduce their photo without losing too much quality. This tool compresses your image to the exact size required while keeping it suitable for official use. Processing happens entirely in your browser, so your photo is never uploaded to any server. You can also use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize image to 100KB</Link> or <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tools if your form needs a different size or a specific passport-style layout.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-resize-20kb"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
