import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { SmartImageOptimizer } from "@/components/tools/SmartImageOptimizer";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/fix-government-form-photo-upload-error";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Fix Government Form Photo Upload Error | SSC, Railway, UPSC | Dockera",
    description:
      "Photo not uploading on SSC, railway, or UPSC form? Fix 'image must be less than 20kb', dimension mismatch, invalid format errors. Step-by-step guide and free resize tool.",
    keywords: [
      "government form photo upload error",
      "ssc form photo not uploading",
      "image must be less than 20kb ssc error",
      "railway form photo dimension mismatch",
      "invalid image size government form",
      "photo not uploading govt form",
      "upsc form image upload error",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Fix Government Form Photo Upload Error | SSC, Railway, UPSC | Dockera",
    description:
      "Photo not uploading on SSC, railway, or UPSC form? Fix size, format, and dimension errors with our free resize tool.",
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
      name: "Why is my government form photo not uploading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common causes: file size over limit (resize to slightly under the stated limit), wrong format (use JPEG), or wrong dimensions. Use our resize tool to reduce file size. For dimension issues, use our passport photo tool first.",
      },
    },
    {
      "@type": "Question",
      name: "How do I fix 'image must be less than 20kb' SSC error?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Resize your photo to 18–19KB using our resize to 20KB tool. Upload the processed file—not the original. Use JPEG format. If the limit is 50KB or 100KB, aim for 95% of that limit to avoid portal quirks.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'photo dimension mismatch' mean on railway form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The portal expects specific dimensions (e.g. passport-style 3.5cm x 4.5cm). Use our passport photo tool to frame correctly, then resize for file size. Ensure aspect ratio and pixel dimensions match the notification.",
      },
    },
    {
      "@type": "Question",
      name: "Invalid image size government form—what to do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Resize to under the limit (e.g. 95KB when limit is 100KB), use JPEG, and ensure dimensions if specified. Some portals measure size differently—a small buffer helps. Use our Smart Image Optimizer tool above.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to use this tool for government form photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All processing happens in your browser. Your photo is never uploaded to our servers. Safe for SSC, UPSC, railway, and state PSC application photos.",
      },
    },
    {
      "@type": "Question",
      name: "UPSC form image upload error—same fix as SSC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The same logic applies: resize to under the limit, use JPEG, correct dimensions if specified. For UPSC-specific guidance, see our resize image for UPSC form page. For SSC, see resize image for SSC form.",
      },
    },
  ],
};

export default function FixGovernmentFormPhotoUploadErrorPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Fix government form photo upload error</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Fix Government Form Photo Upload Error – SSC, Railway, UPSC
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Photo not uploading on SSC, railway, or UPSC form? Fix &quot;image must be less than 20kb&quot;, dimension mismatch, and invalid format errors. Step-by-step guide and free resize tool—works in your browser, no upload.
        </p>
      </header>

      <div className="mb-14">
        <SmartImageOptimizer
          defaultMode="smart"
          defaultTargetKb={50}
          seoDescription="Resize image to fix government form upload errors."
          heading="Resize image to fix upload error"
        />
      </div>

      <section className="mb-12" aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          The problem: government form photo not uploading
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          You&apos;re filling an SSC, UPSC, railway, or state PSC application. You upload your photograph—and the portal rejects it. &quot;File size exceeds limit.&quot; &quot;Image must be less than 20KB.&quot; &quot;Photo dimension mismatch.&quot; &quot;Invalid image size.&quot; These errors are common. Your phone or camera saves photos at 2–5MB. Government portals typically allow 20KB to 100KB. Without resizing, the upload fails. This guide shows you exactly how to fix these errors and which tools to use.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step-heading">
        <h2 id="step-by-step-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-step: fix photo upload error
        </h2>
        <ol className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">1</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Check the notification.</strong> Note the exact photo size limit (20KB, 50KB, 100KB) and any dimension requirements. SSC, railway, and UPSC notifications differ—always use the official advertisement.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">2</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Resize for file size.</strong> Use the tool above or our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link>, <Link href="/tools/resize-image-to-50kb" className="font-medium text-slate-900 underline dark:text-slate-100">50KB</Link>, or <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">20KB</Link> tools. Aim for 95% of the limit (e.g. 95KB when 100KB) to avoid portal quirks.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">3</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Fix dimensions if required.</strong> If the form specifies dimensions (e.g. passport 3.5×4.5 cm), use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> first. Then resize for file size.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">4</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Use JPEG.</strong> Most government forms accept JPEG. Our tools output JPEG. Ensure you upload the processed file—not the original.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">5</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Try again.</strong> Clear browser cache if needed. Use a stable connection. If it still fails, try a different browser or device.</span>
          </li>
        </ol>
      </section>

      <section className="mb-12" aria-labelledby="errors-heading">
        <h2 id="errors-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common errors and how to fix them
        </h2>
        <ul className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Image must be less than 20kb&quot; (SSC, railway)</strong> — Resize to 18–19KB. Use our <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 20KB</Link> tool. Upload the downloaded file.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;File size exceeds limit&quot;</strong> — Resize to slightly under the limit. Portal may measure size differently. Use Smart Optimize above with the target KB.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Photo dimension mismatch&quot; / &quot;Invalid dimensions&quot;</strong> — Use <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> for correct framing. Some railway and state forms require exact pixel dimensions.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Invalid image size&quot; / &quot;Invalid format&quot;</strong> — Use JPEG. Ensure you&apos;re under the size limit. Some portals reject PNG—convert to JPEG if needed.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Upload timeout or page freeze</strong> — Use a smaller file. Try Chrome or Firefox. Check internet. Disable extensions that might block uploads.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="exam-specific-heading">
        <h2 id="exam-specific-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Exam-specific guides
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          For detailed requirements and tool embeds, see our <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 underline dark:text-slate-100">resize image for SSC form</Link>, <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">resize image for UPSC form</Link>, and <Link href="/railway-photo-size-limit" className="font-medium text-slate-900 underline dark:text-slate-100">railway photo size limit</Link> pages. For state PSC exams like Bihar, see <Link href="/bihar-psc-photo-size" className="font-medium text-slate-900 underline dark:text-slate-100">Bihar PSC photo size</Link>. Same resize logic applies across exams—reduce file size, use correct format, meet dimensions.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="tips-heading">
        <h2 id="tips-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Tips to avoid upload errors
        </h2>
        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
          <li>Always resize to 95–98% of the stated limit. Some portals are strict.</li>
          <li>Use a recent, clear photo with neutral expression and plain background.</li>
          <li>Keep the original high-res photo for admit card and document verification.</li>
          <li>For signature uploads, use <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link> if needed, then resize.</li>
          <li>Processing happens in your browser—your photo is never sent to our servers.</li>
        </ul>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-fix-upload-error"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
