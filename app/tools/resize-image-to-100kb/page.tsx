import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { buildOptimizedTitle } from "@/lib/titleOptimizer";
import { SmartImageOptimizer } from "@/components/tools/SmartImageOptimizer";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/resize-image-to-100kb";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: buildOptimizedTitle("Resize Image to 100KB Online", { intent: "govt" }),
    description:
      "Resize and compress images to 100KB, 50KB or 20KB online for forms and applications. Smart optimization keeps quality high while reducing file size. Works for SSC, UPSC, railway and job uploads — no sign-up required.",
    keywords: [
      "resize image to 100kb",
      "image resize for govt forms",
      "compress photo for SSC",
      "passport photo size India",
      "resize image 50kb",
      "resize image 20kb",
      "govt form photo size",
      "UPSC photo size",
      "railway form photo",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: buildOptimizedTitle("Resize Image to 100KB Online", { intent: "govt" }),
    description:
      "Resize and compress images to 100KB, 50KB or 20KB online for forms and applications. Smart optimization keeps quality high while reducing file size. Works for SSC, UPSC, railway and job uploads — no sign-up required.",
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
      name: "How do I resize an image to 100KB for government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your image on this page, select the target size (20KB, 50KB, or 100KB), and click 'Resize image'. The tool compresses your photo in the browser. Then download the resized image. No data is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "What image size is required for SSC and UPSC application forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many government forms in India (SSC, UPSC, railway, etc.) require photos under 100KB or 50KB. Use this tool to resize your image to the exact size required—choose 100KB, 50KB, or 20KB as needed.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to use this image resizer? Are my photos uploaded?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All processing happens in your browser. Your images are never uploaded to our servers. You can use the tool for sensitive documents and passport-size photos with confidence.",
      },
    },
    {
      "@type": "Question",
      name: "Which image formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports common image formats: JPEG, PNG, WebP, and BMP. The output is always a JPEG file optimized for small file size, which is what most government portals accept.",
      },
    },
    {
      "@type": "Question",
      name: "Can I resize image to 20KB or 50KB for strict form limits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can select 20KB, 50KB, or 100KB as the target size. For very strict limits (e.g. 20KB), the tool will compress and scale the image as needed to meet the size requirement.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to resize image to 100KB for government forms",
  description: "Steps to resize your photo to 100KB or less for SSC, UPSC, railway and other Indian government forms using Dockera.",
  step: [
    {
      "@type": "HowToStep",
      name: "Upload your image",
      text: "Click 'Upload image' and select the photo you want to resize (e.g. passport photo or document scan).",
    },
    {
      "@type": "HowToStep",
      name: "Choose target size",
      text: "Select the required size: 20KB, 50KB, or 100KB depending on the form guidelines. You can also enter a custom size in KB.",
    },
    {
      "@type": "HowToStep",
      name: "Resize and download",
      text: "Click 'Resize image'. The tool compresses the image in your browser. Preview the result and click 'Download resized image' to save the file.",
    },
  ],
};

export default function ResizeImageTo100kbPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
          <li className="text-slate-900 dark:text-slate-100">
            Resize to 100KB
          </li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Resize Image to 100KB Online for Govt Forms
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Automatically adjusts image quality and dimensions to reach the exact file size limit.
        </p>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Resize and compress images to exact file size limits (100KB, 50KB or 20KB) required by government and exam forms.
        </p>
      </header>

      <div className="mb-14">
        <SmartImageOptimizer
          defaultMode="smart"
          defaultTargetKb={100}
          seoDescription="Resize and compress images to exact file size limits (100KB, 50KB or 20KB) required by government and exam forms."
          heading="Resize image to 100KB"
        />
      </div>

      <section
        className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/50"
        aria-labelledby="how-it-works-heading"
      >
        <h3 id="how-it-works-heading" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          How Dockera optimizes your image
        </h3>
        <ol className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex gap-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">1.</span>
            Adjusts image quality intelligently
          </li>
          <li className="flex gap-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">2.</span>
            Resizes dimensions only if needed
          </li>
          <li className="flex gap-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">3.</span>
            Stops exactly at your selected file size
          </li>
        </ol>
      </section>

      <section
        className="mb-12"
        aria-labelledby="govt-forms-heading"
      >
        <h2 id="govt-forms-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Resize image for SSC, UPSC and Railway forms
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Many Indian government and recruitment forms (SSC, UPSC, railway, state
          exams, and job portals) require a photo under a specific file size—often
          100KB, 50KB, or 20KB. This tool lets you resize your image to the exact
          limit so your form upload succeeds. No software to install; it works on
          any device with a modern browser.
        </p>
      </section>

      <section
        className="mb-12"
        aria-labelledby="formats-heading"
      >
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Supported image formats
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          You can upload JPEG, PNG, WebP, or BMP. The resized output is always
          a JPEG file, which is accepted by most government portals and keeps the
          file size small. If you need a specific <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo size</Link>,
          use our passport photo tool for dimensions and background.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-resize-100kb"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
