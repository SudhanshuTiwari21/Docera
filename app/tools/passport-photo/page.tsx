import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { Camera } from "lucide-react";
import { PassportPhotoTool } from "@/components/tools/PassportPhotoTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/passport-photo";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Passport Photo Size Tool – Indian Passport & Visa Photo | Dockera",
    description:
      "Create Indian passport and visa photo with correct size and background. Meets official requirements. Free, no sign-up.",
    keywords: [
      "passport photo size tool",
      "Indian passport photo",
      "visa photo India",
      "passport size photo online",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Passport Photo Size Tool – Indian Passport & Visa Photo | Dockera",
    description:
      "Create Indian passport and visa photo with correct size and background. Meets official requirements. Free, no sign-up.",
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
      name: "What is the size for Indian passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Indian passport photos are typically 35mm x 45mm with a specific head size and neutral background. The tool will guide you to the correct dimensions and crop. For file size limits (e.g. 100KB), use our resize to 100KB tool after creating the photo.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for visa photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many visas use the same or similar dimensions as passport photos. The tool supports common Indian passport and visa photo specifications. Check your specific visa requirements for exact dimensions and background colour.",
      },
    },
    {
      "@type": "Question",
      name: "Is the passport photo tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool is free to use. Processing happens in your browser—your photos are not uploaded to our servers. No sign-up required. For government form file size limits, combine with our resize to 100KB tool.",
      },
    },
  ],
};

export default function PassportPhotoPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Passport Photo</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <Camera className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Passport Photo Size Tool
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Create Indian passport and visa photo with correct size and background. Meets official requirements.
        </p>
      </header>

      <div className="mb-14">
        <PassportPhotoTool />
      </div>

      <section className="mb-12" aria-labelledby="requirements-heading">
        <h2 id="requirements-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Passport photo requirements
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Indian passport and many visa photos require 35mm x 45mm dimensions, neutral background, and specific head size. Government forms often add file size limits (e.g. 100KB, 50KB). Use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> tool after creating the photo. See <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 underline dark:text-slate-100">SSC</Link> and <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">UPSC</Link> guides for exam photo specs.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-passport-photo"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
