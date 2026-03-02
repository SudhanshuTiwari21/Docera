import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { SmartImageOptimizer } from "@/components/tools/SmartImageOptimizer";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/railway-photo-size-limit";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Railway Exam Photo Size Limit | Dockera",
    description:
      "Photo size and dimension requirements for railway recruitment forms. Resize your image to the required limit for railway applications. SSC, RRB, RRC.",
    keywords: [
      "railway photo size",
      "railway exam photo limit",
      "RRB photo size",
      "RRC application photo",
      "railway alp photo size 2026",
      "rrb ntpc signature size",
      "railway form 30kb photo",
      "railway photo not accepted",
      "rrb photo size in kb",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Railway Exam Photo Size Limit | Dockera",
    description:
      "Photo size and dimension requirements for railway recruitment forms. Resize your image to the required limit for railway applications.",
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
      name: "What is the photo size limit for railway recruitment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Railway recruitment boards (RRB, RRC) typically specify 20KB to 100KB for applicant photos. Exact limits vary by notification—check the official advertisement. Use our resize to 100KB, 50KB, or 20KB tools to meet the requirement.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize my photo for railway form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo to our resize image tool. Choose the target size (100KB, 50KB, or 20KB) based on the form guidelines. The tool compresses and resizes in your browser. Download the result and use it in your application. No data is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Which image format does railway recruitment accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most railway forms accept JPEG. Our resize tools output JPEG optimized for the size limit. Ensure your photo meets dimension requirements (usually passport-style) and has a light/neutral background as specified in the notification.",
      },
    },
    {
      "@type": "Question",
      name: "What is railway ALP photo size for 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Railway ALP (Assistant Loco Pilot) notification typically specifies 20KB to 100KB for the candidate photo. Check the RRB notification for the exact limit. Use this tool to resize to 20KB, 50KB, or 100KB as required.",
      },
    },
    {
      "@type": "Question",
      name: "What is RRB NTPC signature size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RRB NTPC and other railway forms often require signature images within 20KB to 50KB. Resize your signature image to the specified limit. Use JPEG format and ensure a white or light background for best results.",
      },
    },
    {
      "@type": "Question",
      name: "Railway photo not accepted—what to do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the form rejects your photo: resize to slightly under the limit (e.g. 28KB when 30KB), use JPEG format, ensure correct dimensions if specified, and check for a light/neutral background. Use our resize tool and passport photo tool for correct formatting.",
      },
    },
  ],
};

export default function RailwayPhotoSizeLimitPage() {
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
            <Link href="/guides" className="hover:text-slate-900 dark:hover:text-slate-100">
              Guides
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">
            Railway photo size limit
          </li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Railway Exam Photo Size Limit – RRB, ALP, NTPC
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Railway recruitment forms (RRB, RRC) often require a recent photograph within a specific file size—usually 20KB to 100KB, sometimes 30KB. Resize your photo to the exact limit for ALP, NTPC, Group D, and other railway exams to avoid upload errors.
        </p>
      </header>

      <div className="mb-14">
        <SmartImageOptimizer
          defaultMode="smart"
          defaultTargetKb={50}
          seoDescription="Resize image to 20KB, 50KB or 100KB for railway application."
          heading="Resize image for railway form"
        />
      </div>

      <section className="mb-12" aria-labelledby="requirements-heading">
        <h2 id="requirements-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo requirements
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Check the official notification for the exact limit. Many forms specify 50KB or 100KB. Use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize image to 100KB</Link>, <Link href="/tools/resize-image-to-50kb" className="font-medium text-slate-900 underline dark:text-slate-100">50KB</Link>, or <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">20KB</Link> tools to meet the requirement. For passport-style dimensions and background, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="how-to-heading">
        <h2 id="how-to-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          How to resize
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Upload your photo, select the target size (20KB, 30KB, 50KB, or 100KB), and download. Processing happens in your browser—your photo is never uploaded to our servers. For related exam photo guides, see <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 underline dark:text-slate-100">SSC</Link> and <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">UPSC</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="railway-exams-heading">
        <h2 id="railway-exams-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Railway ALP, RRB NTPC, Group D photo size in KB
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Railway recruitment boards (RRB) specify photo size in KB—often 20KB to 100KB. Railway ALP 2026, RRB NTPC, Group D, and RRC notifications may differ slightly; always check the official advertisement. Some forms require 30KB for photo or signature. Use the tool above to resize to the exact limit. If your railway photo is not accepted, ensure you&apos;re within the size limit, using JPEG, and meeting dimension requirements. For passport-style framing, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>. For document size limits, see <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="railway-errors-heading">
        <h2 id="railway-errors-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Railway form photo not accepted—common fixes
        </h2>
        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
          <li><strong className="text-slate-800 dark:text-slate-200">Size over limit:</strong> Resize to 95% of the limit (e.g. 28KB when 30KB).</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Wrong format:</strong> Use JPEG. Our tool outputs JPEG.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Dimensions:</strong> Some forms require specific pixel dimensions. Use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> first.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Background:</strong> Use a light or white background as per notification.</li>
        </ul>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-railway-photo"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
