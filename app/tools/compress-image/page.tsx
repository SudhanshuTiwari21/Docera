import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { SmartImageOptimizer } from "@/components/tools/SmartImageOptimizer";
import { InternalLinksSection } from "@/components/common/InternalLinksSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/compress-image";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Compress Image Online – Reduce JPG & PNG File Size | Dockera",
    description:
      "Compress images online without noticeable quality loss. Reduce JPG, PNG and WebP file size for faster uploads and sharing. Free image compressor – no sign-up required.",
    keywords: [
      "compress image online",
      "image compressor free",
      "reduce image size",
      "compress jpg online",
      "compress png online",
      "optimize image size",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Compress Image Online – Reduce JPG & PNG File Size | Dockera",
    description:
      "Compress images online without noticeable quality loss. Reduce JPG, PNG and WebP file size for faster uploads and sharing. Free image compressor – no sign-up required.",
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
      name: "Does compressing an image reduce quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the compression level. At moderate settings, you can reduce file size significantly with little or no noticeable quality loss. Our tool lets you adjust quality so you can balance size and clarity. For photos and general use, 80–90% quality often achieves a good balance.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best format for smaller file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPEG is usually the best format for photos and complex images when you need smaller file sizes. WebP can be even smaller while keeping similar quality. PNG is best for graphics with transparency but tends to produce larger files. Our tool outputs JPEG, which is widely supported and keeps file sizes small.",
      },
    },
    {
      "@type": "Question",
      name: "Is image compression safe on Dockera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All compression happens in your browser. Your images are never uploaded to our servers, so your files stay private. You can compress sensitive photos and documents with confidence.",
      },
    },
  ],
};

const compressPageLinks = [
  { href: "/tools/resize-image-to-100kb", label: "Resize image to 100KB" },
  { href: "/resize-image-for-ssc-form", label: "Resize image for SSC form" },
  { href: "/tools/passport-photo", label: "Passport photo size tool" },
];

export default function CompressImagePage() {
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
          <li className="text-slate-900 dark:text-slate-100">Compress Image</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Compress Image Online
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Reduce image file size while maintaining clarity. Perfect for email, websites and uploads.
        </p>
      </header>

      <div className="mb-14">
        <SmartImageOptimizer
          defaultMode="compress"
          seoDescription="Compress images online without noticeable quality loss. Reduce JPG, PNG and WebP file size for faster uploads and sharing."
          heading="Compress image"
        />
      </div>

      <section
        className="mb-12"
        aria-labelledby="why-compress-heading"
      >
        <h2 id="why-compress-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why Compress Images?
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Compressed images load faster on websites, fit within email attachment limits, and take up less storage. Faster uploads mean quicker form submissions for job applications and exam registrations. Smaller file sizes also improve page speed, which can help with SEO and user experience. Whether you are sharing photos, uploading to a form, or optimizing a website, reducing image size makes everything smoother.
        </p>
      </section>

      <section
        className="mb-12"
        aria-labelledby="formats-heading"
      >
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Supported Formats
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          You can upload JPEG, PNG, WebP, and BMP. The compressed output is a JPEG file, which keeps file sizes small and is widely accepted by websites, email clients, and application portals. If you need a specific file size (e.g. 100KB for government forms), use the Smart Optimize tab or our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> tool. For passport-style photos with correct dimensions, try our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>.
        </p>
      </section>

      <section
        className="mb-12"
        aria-labelledby="how-compression-works-heading"
      >
        <h2 id="how-compression-works-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          How Image Compression Works
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Image compression reduces file size by lowering quality (lossy) or using more efficient encoding (near-lossless). At moderate settings, the change is usually hard to notice. Our tool lets you adjust quality so you can choose the right balance. All processing happens in your browser—your images are never uploaded to any server, so you keep full privacy.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-compress-image"
        className="mb-12"
      />

      <InternalLinksSection
        title="Related tools"
        links={compressPageLinks}
      />
    </article>
  );
}
