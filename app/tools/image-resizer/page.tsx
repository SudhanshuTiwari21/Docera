import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { SmartImageOptimizer } from "@/components/tools/SmartImageOptimizer";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/image-resizer";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Exam Smart Resizer – SSC, UPSC, Railway, IBPS Photo Size | Dockera",
    description:
      "Resize photos for Indian exams in one click. SSC CGL, UPSC CSE, Railway RRB, IBPS—select your exam, auto-set dimensions and KB. Free, private, works in your browser.",
    keywords: [
      "image optimizer",
      "resize image online",
      "compress image",
      "reduce image size",
      "smart image optimization",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Smart Image Optimizer – Resize, Compress, Auto-Size | Dockera",
    description:
      "Resize by dimensions, compress by quality, or auto-optimize to target file size. Free, private, no sign-up. Works entirely in your browser.",
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
      name: "What is the Smart Image Optimizer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Smart Image Optimizer offers three modes: Resize (adjust dimensions), Compress (adjust quality), and Smart Optimize (automatically hit a target file size in KB). All processing happens in your browser—your images are never uploaded.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize an image to 100KB for government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select Smart Optimize, set the target to 100KB (or 50KB, 20KB), upload your image, and click Optimize. The tool compresses and optionally resizes to reach the exact file size. Our dedicated resize to 100KB page also offers this for government form uploads.",
      },
    },
    {
      "@type": "Question",
      name: "Is the image optimizer safe and private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All processing happens locally in your browser. Your images are never sent to our servers, so you can use it for sensitive photos and documents with confidence.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Resize, Compress, and Smart Optimize?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Resize changes image dimensions (width and height). Compress changes JPEG quality. Smart Optimize hits an exact file size in KB by adjusting both quality and dimensions as needed. Use Resize for dimension requirements, Compress for smaller files without a target, Smart Optimize for form limits like 100KB.",
      },
    },
    {
      "@type": "Question",
      name: "Which mode should I use for SSC or UPSC form photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Indian Exams tab. Select your exam (SSC CGL, UPSC CSE, Railway ALP, IBPS PO, etc.) and the tool auto-sets dimensions and file size. One click optimizes your photo for the exact requirements. Also supports Smart Optimize for custom KB targets.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my optimized image blurry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aggressive compression or heavy resizing can reduce clarity. For Smart Optimize, try a slightly higher target (e.g. 100KB instead of 20KB) if the form allows. For Compress, increase the quality slider. Start with a clear, well-lit source photo for best results.",
      },
    },
  ],
};

export default function ImageResizerPage() {
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
          <li className="text-slate-900 dark:text-slate-100">
            Exam Smart Resizer
          </li>
        </ol>
      </nav>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Exam Smart Resizer
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          One-click resize for Indian exams. Select SSC CGL, UPSC CSE, Railway, IBPS—auto-set dimensions and KB. Or use Smart Optimize, Resize, or Compress for custom needs. Free, private, works in your browser.
        </p>
      </header>
      <div className="mb-14">
        <SmartImageOptimizer
          defaultMode="exam"
          defaultTargetKb={100}
          seoDescription="Select your exam preset for auto dimensions and KB, or use Smart Optimize for custom targets."
          heading="Exam Smart Resizer"
        />
      </div>

      <section className="mb-12" aria-labelledby="exam-smart-heading">
        <h2 id="exam-smart-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Indian Exams: one click, done
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Select your exam from the dropdown—SSC CGL, SSC CHSL, RRB ALP, UPSC CSE, IBPS PO, SBI PO, and more. The tool auto-sets pixel dimensions (275×354 passport style), target KB (50KB for photo, 20KB for signature), and JPEG format. Upload, optimize, download. No manual settings needed. Always verify against the official notification—requirements can change by year.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="problem-context-heading">
        <h2 id="problem-context-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          All modes in one tool
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Indian Exams for presets. Smart Optimize for exact KB. Resize for custom dimensions. Compress for quality control. All processing runs in your browser—no uploads, no sign-up, no limits.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step-heading">
        <h2 id="step-by-step-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-step: how to use each mode
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Indian Exams:</strong> Select your exam (SSC CGL, UPSC CSE, Railway, IBPS, etc.), upload, and optimize. Dimensions and KB are set automatically. Use for photo or signature uploads.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Resize:</strong> Enter target width and height (or use aspect ratio lock). Use when you need specific dimensions—profile pictures, thumbnails.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Compress:</strong> Upload, adjust the quality slider (higher = better quality, larger file), and optimize. Use when you want smaller files without a strict KB target—email, web, storage.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Smart Optimize:</strong> Upload, set target size (100KB, 50KB, 20KB, or custom), and optimize. The tool adjusts quality and dimensions to hit that exact size. Use for government forms—SSC, UPSC, railway—that specify &quot;maximum 100KB&quot; or similar. See our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> page for a dedicated flow.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="common-errors-heading">
        <h2 id="common-errors-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common errors and how to fix them
        </h2>
        <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
          <li><strong className="text-slate-800 dark:text-slate-200">Form upload fails with &quot;file too large&quot;</strong> — Use Smart Optimize and set the target to the form&apos;s limit (e.g. 100KB). Resize and Compress don&apos;t guarantee a target size.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Image looks too blurry</strong> — For Compress, increase quality. For Smart Optimize with strict limits (e.g. 20KB), the tool may reduce quality significantly; try a higher target if the form allows.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Wrong dimensions for passport photo</strong> — Resize changes dimensions, but for correct framing and background use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>. Then resize for file size if needed.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Invalid format&quot; on form</strong> — The tool outputs JPEG. Ensure you&apos;re uploading the downloaded file, not the original, and that the file extension is .jpg or .jpeg.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="tips-heading">
        <h2 id="tips-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Tips for best results
        </h2>
        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
          <li>Start with a clear, well-lit photo. Optimization can&apos;t fix a blurry or dark source image.</li>
          <li>For form limits, aim 2–5KB under the max (e.g. 95KB when limit is 100KB) to avoid portal measurement differences.</li>
          <li>Keep the original. Optimize a copy so you can reuse the full-quality version elsewhere.</li>
          <li>For <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 underline dark:text-slate-100">SSC</Link>, <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">UPSC</Link>, or <Link href="/railway-photo-size-limit" className="font-medium text-slate-900 underline dark:text-slate-100">railway</Link> forms, check the official notification for exact specs. For PDF size limits, use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="modes-comparison-heading">
        <h2 id="modes-comparison-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Resize vs Compress vs Smart Optimize
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Resize</strong> — Changes width and height. File size may go up or down. Use when dimensions matter (e.g. 800×600 for a thumbnail).
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Compress</strong> — Changes quality. File size goes down. No dimension change. Use when you want smaller files without a strict KB target.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Smart Optimize</strong> — Hits an exact file size. Adjusts quality and dimensions as needed. Use when a form says &quot;maximum 100KB&quot; or &quot;50KB&quot;. Our <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link> page focuses on quality-only; <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> focuses on form limits.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="use-cases-heading">
        <h2 id="use-cases-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Use cases
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Resize images for government forms (SSC, UPSC, railway), compress photos for faster uploads, or hit exact file size limits. For passport-style photos with correct dimensions, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>. For PDF size limits, try our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-image-resizer"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
