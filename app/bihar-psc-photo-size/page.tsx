import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { SmartImageOptimizer } from "@/components/tools/SmartImageOptimizer";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/bihar-psc-photo-size";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Bihar PSC Photo Size – BPSC Application Photo 20KB to 100KB | Dockera",
    description:
      "Bihar PSC (BPSC) photo size requirements. Resize image for BPSC application to 20KB, 50KB or 100KB. Free tool for Bihar Public Service Commission form. Works in browser.",
    keywords: [
      "bihar psc photo size",
      "bpsc photo size",
      "bihar psc application photo",
      "bihar psc form photo 50kb",
      "bpsc form photo size",
      "bihar psc photo limit",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Bihar PSC Photo Size – BPSC Application Photo 20KB to 100KB | Dockera",
    description:
      "Bihar PSC (BPSC) photo size requirements. Resize image for BPSC application. Free tool, works in browser.",
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
      name: "What is Bihar PSC photo size for application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bihar PSC (BPSC) typically requires applicant photos within 20KB to 100KB, often 50KB or 100KB. Check the official BPSC notification for the exact limit. Use our tool to resize to 20KB, 50KB, or 100KB as required.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize my photo for BPSC form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo using the tool on this page. Select the target size (20KB, 50KB, or 100KB) as per the BPSC notification. Download the resized image and use it when uploading to the Bihar PSC application portal. All processing happens in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does BPSC accept JPEG for photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Bihar PSC forms accept JPEG for candidate photos. Our tool outputs JPEG optimized for the size limit. Ensure the photo meets dimension requirements (usually passport-style) and has a light background as per the notification.",
      },
    },
    {
      "@type": "Question",
      name: "What is BPSC signature size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BPSC often specifies signature file size—typically 20KB to 50KB. Use this tool to resize your signature image. Ensure white or light background and black ink. For extracting signature from a document, use our signature extractor tool first.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for UPPSC or other state PSC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The same resize logic applies to UPPSC, MP PSC, Rajasthan PSC, and other state recruitment. Check each board&apos;s notification for exact limits. Our tool works for any form with a KB limit.",
      },
    },
    {
      "@type": "Question",
      name: "Bihar PSC photo not uploading—how to fix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Resize to slightly under the limit (e.g. 95KB when 100KB), use JPEG format, ensure correct dimensions if specified. See our fix government form photo upload error guide for detailed troubleshooting.",
      },
    },
  ],
};

export default function BiharPscPhotoSizePage() {
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
            <Link href="/guides" className="hover:text-slate-900 dark:hover:text-slate-100">Guides</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">Bihar PSC photo size</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Bihar PSC Photo Size – BPSC Application Photo 20KB to 100KB
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Bihar Public Service Commission (BPSC) application forms require a recent photograph within a specified file size—usually 20KB to 100KB. Resize your photo to the exact limit for BPSC 69th, 70th, or other exams. Free tool, works in your browser.
        </p>
      </header>

      <div className="mb-14">
        <SmartImageOptimizer
          defaultMode="smart"
          defaultTargetKb={50}
          seoDescription="Resize image to 50KB or 100KB for Bihar PSC application."
          heading="Resize image for Bihar PSC form"
        />
      </div>

      <section className="mb-12" aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          The problem: BPSC form rejects your photo
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          You&apos;re applying for Bihar PSC (BPSC) 69th, 70th, or another examination. You&apos;ve filled the form and uploaded your details. When you add your photograph, the portal rejects it—&quot;File size exceeds limit&quot; or &quot;Invalid image size.&quot; Bihar PSC notifications typically allow 20KB to 100KB for the candidate photo. Your phone or camera saves images at 2MB or more. Without resizing, the upload fails. This page gives you the tool and the steps to fix it.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="requirements-heading">
        <h2 id="requirements-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Bihar PSC (BPSC) photo size requirements
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Bihar Public Service Commission (BPSC) applications—including Combined Competitive Examination (CCE) and other exams—require a recent photograph of the candidate. The notification specifies a maximum file size, often between 20KB and 100KB (50KB or 100KB are common). Photo dimensions are usually passport-style (e.g. 3.5 cm × 4.5 cm). Signature uploads may have a separate limit (often 20KB–50KB). Always check the official BPSC advertisement for the exact requirements. Use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> for correct framing, then resize here for file size. For general resize tools, see <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> and <Link href="/tools/resize-image-to-50kb" className="font-medium text-slate-900 underline dark:text-slate-100">50KB</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step-heading">
        <h2 id="step-by-step-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-step: resize photo for Bihar PSC form
        </h2>
        <ol className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">1</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Check the BPSC notification.</strong> Open the official Bihar PSC advertisement for your exam. Note the maximum photo file size (20KB, 50KB, or 100KB) and any dimension specs.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">2</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Use a recent, clear photo.</strong> Neutral expression, plain light background. If passport-style dimensions are required, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> first.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">3</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Resize using the tool above.</strong> Choose 20KB, 50KB, or 100KB to match the BPSC requirement. Smart Optimize compresses and resizes to hit that limit.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">4</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Download and upload to BPSC.</strong> Save the resized image. Use it when uploading to the Bihar PSC portal. Aim for 95KB when limit is 100KB for a safety margin.</span>
          </li>
        </ol>
      </section>

      <section className="mb-12" aria-labelledby="common-errors-heading">
        <h2 id="common-errors-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common Bihar PSC photo upload errors
        </h2>
        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;File size exceeds limit&quot;</strong> — Resize to slightly under the limit. Use 95KB when 100KB.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Invalid format&quot;</strong> — Use JPEG. Our tool outputs JPEG.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Dimensions not as per specification&quot;</strong> — Use passport photo tool for correct framing, then resize for file size.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Photo not uploading</strong> — See our <Link href="/fix-government-form-photo-upload-error" className="font-medium text-slate-900 underline dark:text-slate-100">fix government form photo upload error</Link> guide for full troubleshooting.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="related-heading">
        <h2 id="related-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Related exam photo guides
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Same resize logic applies to SSC, UPSC, railway, and other state PSC exams. See <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 underline dark:text-slate-100">SSC</Link>, <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">UPSC</Link>, and <Link href="/railway-photo-size-limit" className="font-medium text-slate-900 underline dark:text-slate-100">railway</Link> photo guides. For PDF document limits, use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-bihar-psc"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
