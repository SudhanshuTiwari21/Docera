import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { PenTool } from "lucide-react";
import { SignatureExtractorTool } from "@/components/tools/SignatureExtractorTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/signature-extractor";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Signature Extractor – Extract Signature from Image | Dockera",
    description:
      "Extract a clean signature from a photo or document. Use for digital forms and official documents. Free online tool.",
    keywords: [
      "signature extractor",
      "extract signature from image",
      "signature crop online",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Signature Extractor – Extract Signature from Image | Dockera",
    description:
      "Extract a clean signature from a photo or document. Use for digital forms and official documents. Free online tool.",
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
      name: "How do I extract a signature from an image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload an image containing your signature (e.g. photo of signed document). The tool helps you isolate the signature area and remove the background. You can then download the signature as a PNG with transparency for use in forms and documents.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the extracted signature in government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many government and job application portals allow uploading a signature image. After extracting, ensure the file meets size limits (e.g. 100KB). Use our resize to 100KB tool if needed. Check form guidelines for exact requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Is the signature extractor safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Processing happens in your browser. Your images are not uploaded to our servers, so your signature stays private. Safe for sensitive documents and official use.",
      },
    },
  ],
};

export default function SignatureExtractorPage() {
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
              Image tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">Signature Extractor</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <PenTool className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Signature Extractor
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Extract a clean signature from a photo or document. Use for digital forms and official documents.
        </p>
      </header>

      <div className="mb-14">
        <SignatureExtractorTool />
      </div>

      <section className="mb-12" aria-labelledby="use-cases-heading">
        <h2 id="use-cases-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Use cases
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Create a reusable signature image from a signed document or photo. Use it in job application forms, digital documents, and official submissions. For file size limits, combine with our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> tool. For passport or form photos, try our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> or <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link> tools.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-signature-extractor"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
