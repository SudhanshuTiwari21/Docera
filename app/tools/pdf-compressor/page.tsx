import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";

const PdfCompressorTool = dynamic(() => import("@/components/tools/PdfCompressorTool").then((m) => ({ default: m.PdfCompressorTool })), { ssr: false });
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/pdf-compressor";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Compress PDF Online India – Free PDF Compressor | Dockera",
    description:
      "Reduce PDF file size for job applications and government portals. Secure compression—process in browser. Free, no sign-up required.",
    keywords: [
      "compress PDF online India",
      "reduce PDF size",
      "PDF compressor India",
      "small PDF for upload",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Compress PDF Online India – Free PDF Compressor | Dockera",
    description:
      "Reduce PDF file size for job applications and government portals. Secure compression—process in browser. Free, no sign-up required.",
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
      name: "How do I compress a PDF for government form upload?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your PDF to this tool, choose the compression level, and download the reduced file. The tool works in your browser—your documents are not stored on our servers. Most government portals accept compressed PDFs as long as the content remains readable.",
      },
    },
    {
      "@type": "Question",
      name: "Does PDF compression reduce quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the compression level. Light compression keeps quality high with modest size reduction. Aggressive compression can reduce image quality inside the PDF. For text-heavy documents, the difference is usually negligible. For forms and certificates, use moderate compression to balance size and readability.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to compress PDFs online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our PDF compressor processes files in your browser whenever possible. Your documents are never uploaded to our servers for processing, so your data stays private. Use it for sensitive documents and job application files with confidence.",
      },
    },
  ],
};

export default function PdfCompressorPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Compress PDF</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Compress PDF Online India
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Reduce PDF file size for job applications and government portals. Secure, fast, and free.
        </p>
      </header>

      <div className="mb-14">
        <PdfCompressorTool />
      </div>

      <section className="mb-12" aria-labelledby="why-compress-pdf-heading">
        <h2 id="why-compress-pdf-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why compress PDFs?
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Government job portals, exam applications, and form uploads often impose strict PDF size limits. Compressing your PDF lets you stay within those limits without removing content. Smaller files also upload faster and are easier to email. For image-heavy documents like certificates or scanned forms, compression can significantly reduce file size while keeping text and images readable.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="use-cases-heading">
        <h2 id="use-cases-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Use cases
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Compress PDFs for SSC, UPSC, railway, and other recruitment forms. Reduce document size for email attachments, cloud storage, and web uploads. If you need to resize photos for forms, use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize image to 100KB</Link> tool. For passport photos with correct dimensions, try our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-pdf-compressor"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
