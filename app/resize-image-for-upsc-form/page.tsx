import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { ResizeImageTool } from "@/components/tools/ResizeImageTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/resize-image-for-upsc-form";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Resize Image for UPSC Form Online – Photo Size 20KB to 100KB | Dockera",
    description:
      "Resize image for UPSC form online. Reduce photo to 20KB, 50KB or 100KB as required by UPSC application. Free, private, works in your browser.",
    keywords: [
      "resize image for UPSC form",
      "UPSC form photo size",
      "UPSC application photo 50kb",
      "compress photo for UPSC",
      "UPSC CSE photo size",
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
      name: "What is the photo size for UPSC application form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UPSC application forms typically require the candidate photograph to be within a specified file size, often 20KB to 100KB (e.g. 50KB or 100KB). Check the UPSC notification and use this tool to resize to the exact requirement.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize my photo for UPSC form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo on this page, select the target size as per UPSC guidelines (e.g. 50KB or 100KB), and click Resize image. The tool compresses the image in your browser. Download and use it in your UPSC application.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to use this tool for UPSC form photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All processing happens in your browser. Your photo is never uploaded to any server. Safe for UPSC application photos and other official documents.",
      },
    },
  ],
};

export default function ResizeImageForUpscFormPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Resize image for UPSC form</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Resize Image for UPSC Form Online – Photo 20KB to 100KB
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Resize image for UPSC form online. Reduce your photo to 20KB, 50KB or 100KB as required by UPSC application. Free, private, and works in your browser.
        </p>
      </header>

      <div className="mb-14">
        <ResizeImageTool
          defaultTargetSize={50}
          seoTitle="Resize Image for UPSC Form | Dockera"
          seoDescription=""
          heading="Resize image for UPSC form"
        />
      </div>

      <section className="mb-12" aria-labelledby="context-heading">
        <h2 id="context-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          UPSC form photo size requirements
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Union Public Service Commission (UPSC) applications—including Civil Services (CSE), CAPF, and other exams—require a recent photograph of the candidate. The notification specifies a maximum file size for the photo, often between 20KB and 100KB. Uploading a larger file can lead to rejection or technical errors. Resizing your image to the exact limit ensures a smooth application process. This tool lets you choose 20KB, 50KB, or 100KB (or a custom size) to match the UPSC requirement. All processing is done in your browser; your photo is never uploaded to any server. For the correct passport-style dimensions and background, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>. For other sizes, use <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link>, and for document size limits the <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-upsc-form"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
