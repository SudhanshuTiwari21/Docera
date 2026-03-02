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
    {
      "@type": "Question",
      name: "When should I use compress vs resize to 100KB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use compress when you want smaller files without a strict KB limit—email attachments, websites, general storage. Use resize to 100KB when a form or portal specifies an exact limit (e.g. 100KB, 50KB). Resize guarantees the target size; compress only reduces quality to a level you choose.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my compressed image still look blurry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compressing too aggressively lowers quality. Try a higher quality setting (e.g. 85–90%). Also start with a clear, well-lit source image—compression can't fix an already blurry photo. For strict size limits, use our resize to 100KB tool instead; it balances quality and size automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Can I compress images for government form uploads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but if the form specifies an exact limit (e.g. 100KB), use our resize to 100KB tool—it hits the exact size. Compress is better when you need smaller files without a strict target. Both tools run in your browser and keep your images private.",
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
        aria-labelledby="problem-context-heading"
      >
        <h2 id="problem-context-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          The problem: large images slow everything down
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Your phone or camera saves photos at 3MB, 5MB, or more. Email servers reject attachments over 25MB. Website pages crawl when images are too big. Form uploads fail. Cloud storage fills up. The fix is simple: compress. Reduce the file size while keeping the image usable. Most of the time you don&apos;t need full resolution—a well-compressed JPEG at 80–90% quality looks nearly identical but takes a fraction of the space.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          This tool compresses your images in the browser. No upload to our servers, no sign-up, no limits on how many you process. Use it for email, websites, forms, and storage.
        </p>
      </section>

      <section
        className="mb-12"
        aria-labelledby="step-by-step-heading"
      >
        <h2 id="step-by-step-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-step: how to compress an image
        </h2>
        <ol className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">1</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Upload your image.</strong> Drag and drop or click to select. Supports JPEG, PNG, WebP, BMP. Single or multiple files depending on the interface.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">2</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Choose the Compress tab.</strong> This mode adjusts JPEG quality. Higher quality = larger file, lower quality = smaller file. Start at 80% and adjust based on the result.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">3</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Adjust quality if needed.</strong> For photos you&apos;ll share or print, 85–90% is usually enough. For thumbnails or previews, 70–80% works. Preview before downloading.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">4</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Download.</strong> Save the compressed image. If you need an exact file size (e.g. 100KB for a form), switch to the Smart Optimize tab or use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> tool.</span>
          </li>
        </ol>
      </section>

      <section
        className="mb-12"
        aria-labelledby="why-compress-heading"
      >
        <h2 id="why-compress-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why compress images?
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Compressed images load faster on websites, fit within email attachment limits, and take up less storage. Faster uploads mean quicker form submissions for job applications and exam registrations. Smaller file sizes also improve page speed, which can help with SEO and user experience. Whether you are sharing photos, uploading to a form, or optimizing a website, reducing image size makes everything smoother.
        </p>
      </section>

      <section
        className="mb-12"
        aria-labelledby="common-errors-heading"
      >
        <h2 id="common-errors-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common errors and how to fix them
        </h2>
        <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;File too large&quot; when emailing</strong> — Most email providers limit attachments to 25MB. Compress the image to under 1–2MB. If you need multiple photos, compress each or use a cloud link instead.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Image looks blurry or blocky</strong> — You compressed too much. Increase the quality slider. Start with 85% and go down only if you need a smaller file.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Form says &quot;maximum 100KB&quot;</strong> — Compress doesn&apos;t guarantee a target size. Use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> tool for exact limits.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Output file is bigger than input</strong> — Rare, but can happen if the input is already highly compressed or in a format like PNG. Try the Resize or Smart Optimize tab for more control.</li>
        </ul>
      </section>

      <section
        className="mb-12"
        aria-labelledby="tips-heading"
      >
        <h2 id="tips-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Tips for best results
        </h2>
        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
          <li>Use a clear, well-lit source image. Compression can&apos;t fix blur or noise—it can only reduce file size.</li>
          <li>For photos: 80–90% quality often yields 50–70% size reduction with minimal visible loss.</li>
          <li>For logos or graphics with sharp edges, consider PNG. Our tool outputs JPEG; for PNG optimization, you may need a different approach.</li>
          <li>Keep the original. Compress a copy so you can revert if needed. For <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 underline dark:text-slate-100">SSC</Link>, <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">UPSC</Link>, or other form uploads with strict KB limits, use <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> instead.</li>
        </ul>
      </section>

      <section
        className="mb-12"
        aria-labelledby="compress-vs-resize-heading"
      >
        <h2 id="compress-vs-resize-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Compress vs resize: which to use?
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Compress</strong> adjusts JPEG quality. You pick a quality level (e.g. 80%), and the tool reduces the file size accordingly. Good when you want smaller files without a specific target—email, web, storage.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Resize to 100KB (Smart Optimize)</strong> hits an exact file size. You set 100KB, 50KB, or 20KB, and the tool adjusts quality and dimensions until it reaches that target. Required when a form or portal specifies &quot;maximum 100KB&quot;.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use compress for flexibility; use resize to 100KB for strict form limits. Both run in your browser and keep your images private.
        </p>
      </section>

      <section
        className="mb-12"
        aria-labelledby="formats-heading"
      >
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Supported formats
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
          How image compression works
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
