import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { ImageIcon } from "lucide-react";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";

const PdfToJpgTool = dynamic(() => import("@/components/tools/PdfToJpgTool").then((m) => ({ default: m.PdfToJpgTool })), { ssr: false });
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/pdf-to-jpg";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "PDF to JPG Online – Convert PDF Pages to Images | Dockera",
    description:
      "Convert each PDF page to JPG or extract all images from a PDF. Free, browser-based. No sign-up required.",
    keywords: ["PDF to JPG", "PDF to image", "convert PDF to JPG", "PDF page to image"],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "PDF to JPG Online – Convert PDF Pages to Images | Dockera",
    description:
      "Convert each PDF page to JPG or extract all images from a PDF. Free, browser-based. No sign-up required.",
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
      name: "How do I convert PDF to JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your PDF. Choose to convert each page to a JPG image or extract all embedded images. The tool processes in your browser and lets you download the resulting JPG files. No server upload required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract images from a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool can extract all images embedded in a PDF as separate JPG files. Useful for recovering photos or graphics from documents. For converting full pages to images, use the page-to-JPG option.",
      },
    },
    {
      "@type": "Question",
      name: "Is PDF to JPG conversion safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Conversion happens in your browser. Your PDFs are not uploaded to our servers for processing, so your documents stay private. Safe for sensitive and official files.",
      },
    },
  ],
};

export default function PdfToJpgPage() {
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
          <li className="text-slate-900 dark:text-slate-100">PDF to JPG</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <ImageIcon className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          PDF to JPG Online
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Convert each PDF page to JPG or extract all images from a PDF.
        </p>
      </header>

      <div className="mb-14">
        <PdfToJpgTool />
      </div>

      <section className="mb-12" aria-labelledby="use-cases-heading">
        <h2 id="use-cases-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Use cases
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Turn PDF pages into images for presentations, thumbnails, or web use. Extract embedded images from documents. For the reverse—images to PDF—use our <Link href="/tools/jpg-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">JPG to PDF</Link> or <Link href="/tools/image-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">image to PDF</Link> tools. To resize photos for forms, use <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link>.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-pdf-to-jpg"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
