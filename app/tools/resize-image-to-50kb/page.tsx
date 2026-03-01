import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { buildOptimizedTitle } from "@/lib/titleOptimizer";
import { ResizeImageTool } from "@/components/tools/ResizeImageTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/resize-image-to-50kb";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: buildOptimizedTitle("Resize Image to 50KB Online", { intent: "govt" }),
    description:
      "Resize image to 50KB online for SSC, UPSC, railway and other government forms. Free image size reducer for Indian users—no sign-up, works in your browser.",
    keywords: [
      "resize image to 50kb",
      "image 50kb for govt forms",
      "compress photo for SSC 50kb",
      "UPSC form photo size",
      "railway application photo 50kb",
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
      name: "How do I resize an image to 50KB for government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your image on this page, select 50 KB as the target size, and click Resize image. The tool compresses your photo in the browser. Download the resized image. No data is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "What is the photo size for SSC and UPSC application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many SSC and UPSC application forms require a photograph under 50KB or 100KB. Use this tool to resize your image to 50KB so it meets the portal requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Can I resize image to 20KB or 100KB on the same tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool lets you choose 20KB, 50KB, or 100KB, or enter a custom size. Use the same page for any target size your form specifies.",
      },
    },
  ],
};

export default function ResizeImageTo50kbPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Resize to 50KB</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Resize Image to 50KB Online for Govt Forms
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Resize image to 50KB online for SSC, UPSC, railway and other government forms. Free image size reducer for Indian users—no sign-up, processing in your browser.
        </p>
      </header>

      <div className="mb-14">
        <ResizeImageTool
          defaultTargetSize={50}
          seoTitle="Resize Image to 50KB | Dockera"
          seoDescription=""
          heading="Resize image to 50KB"
        />
      </div>

      <section className="mb-12" aria-labelledby="context-heading">
        <h2 id="context-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Resize image for SSC, UPSC and railway forms
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Government job and exam portals in India often require a recent photograph within a specific file size. Many SSC, UPSC, and railway application forms specify 50KB or 100KB as the maximum. Resizing your photo to exactly 50KB ensures your application is accepted without last-minute errors. This tool works entirely in your browser—your image is never uploaded—and supports JPEG, PNG, and WebP. For other needs, use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> tool or the <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link> for document size limits, and the <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tool for correct dimensions and background.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-resize-50kb"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
