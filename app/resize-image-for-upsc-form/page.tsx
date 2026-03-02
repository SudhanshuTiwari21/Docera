import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { SmartImageOptimizer } from "@/components/tools/SmartImageOptimizer";
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
      "upsc photo size in pixels",
      "upsc signature size in kb",
      "upsc form image upload error",
      "upsc application photo not uploading",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Resize Image for UPSC Form Online – Photo Size 20KB to 100KB | Dockera",
    description:
      "Resize image for UPSC form online. Reduce photo to 20KB, 50KB or 100KB as required by UPSC application. Free, private, works in your browser.",
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
    {
      "@type": "Question",
      name: "What is UPSC photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UPSC usually specifies file size (KB), not pixels. What matters for upload is the KB limit. If dimensions are specified, use our passport photo tool for correct framing, then resize here for file size. Most forms accept standard passport-style dimensions.",
      },
    },
    {
      "@type": "Question",
      name: "What is UPSC signature size in KB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UPSC notifications often require signature images within 20KB to 50KB. Use this tool to resize your signature to the specified limit. Ensure white or light background and black ink for best results.",
      },
    },
    {
      "@type": "Question",
      name: "UPSC form image upload error—how to fix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If upload fails: resize to slightly under the limit (e.g. 95KB when 100KB), use JPEG format, ensure correct dimensions if specified, and upload the processed file—not the original. Try a different browser if the portal is slow.",
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
        <SmartImageOptimizer
          defaultMode="smart"
          defaultTargetKb={50}
          seoDescription="Resize image to 50KB or 100KB for UPSC application."
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

      <section className="mb-12" aria-labelledby="upsc-pixels-signature-heading">
        <h2 id="upsc-pixels-signature-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          UPSC photo size in pixels and signature in KB
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          UPSC typically specifies file size (KB) rather than exact pixels. What matters for upload is staying under the KB limit. If the notification mentions dimensions (e.g. 3.5 cm × 4.5 cm), use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> first, then resize here for file size. For signature uploads, UPSC usually allows 20KB to 50KB—resize your signature image accordingly. If you see an UPSC form image upload error or photo not uploading, resize to slightly under the limit and ensure JPEG format. See our <Link href="/fix-government-form-photo-upload-error" className="font-medium text-slate-900 underline dark:text-slate-100">fix government form photo upload error</Link> guide for more troubleshooting.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="upsc-errors-heading">
        <h2 id="upsc-errors-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common UPSC form upload errors and fixes
        </h2>
        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;File size exceeds limit&quot;</strong> — Resize to 95KB when limit is 100KB.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Invalid format&quot;</strong> — Use JPEG. Our tool outputs JPEG.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Photo dimension mismatch&quot;</strong> — Use passport photo tool for correct framing.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Upload timeout or fails</strong> — Use a smaller file (e.g. 50KB), try a different browser, check internet connection.</li>
        </ul>
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
