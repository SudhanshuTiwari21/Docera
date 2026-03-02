import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { buildOptimizedTitle } from "@/lib/titleOptimizer";
import { SmartImageOptimizer } from "@/components/tools/SmartImageOptimizer";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/resize-image-for-ssc-form";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: buildOptimizedTitle("Resize Image for SSC Form", { intent: "exam" }),
    description:
      "Resize image for SSC form online. Reduce photo to 20KB, 50KB or 100KB as required by SSC application. Free, private, works in your browser.",
    keywords: [
      "resize image for SSC form",
      "SSC form photo size",
      "SSC application photo 50kb",
      "compress photo for SSC",
      "SSC CGL photo size",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: buildOptimizedTitle("Resize Image for SSC Form", { intent: "exam" }),
    description:
      "Resize image for SSC form online. Reduce photo to 20KB, 50KB or 100KB as required by SSC application. Free, private, works in your browser.",
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
      name: "What is the photo size for SSC application form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SSC application forms typically require the candidate photograph to be within 20KB to 100KB, and often 50KB or 100KB. Use this tool to resize your image to the exact size specified in the SSC notification.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize my photo for SSC form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo on this page, select the target size (e.g. 50KB or 100KB as per SSC guidelines), and click Resize image. The tool compresses the image in your browser. Download and use it in your SSC application.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to use this tool for SSC form photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Processing happens entirely in your browser. Your photo is never uploaded to any server. You can safely resize your SSC application photo and other sensitive documents.",
      },
    },
    {
      "@type": "Question",
      name: "What if my SSC form upload still fails after resizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Try resizing to 95KB when the limit is 100KB to add margin. Ensure you're using JPEG format and that dimensions meet any stated requirements. For passport-style framing, use our passport photo tool first, then resize for file size.",
      },
    },
    {
      "@type": "Question",
      name: "Does SSC CGL, CHSL, and MTS have the same photo size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Photo size limits can vary by exam and notification. Always check the official SSC notification for your specific exam. Most specify 20KB to 100KB. This tool lets you choose 20KB, 50KB, or 100KB to match the requirement.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for UPSC or railway forms too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool works for any form with a KB limit. For UPSC-specific guidance, see our resize image for UPSC form page. For railway, see our railway photo size limit guide. The same resize logic applies across exams.",
      },
    },
  ],
};

export default function ResizeImageForSscFormPage() {
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
            <Link href="/tools/image-resizer" className="hover:text-slate-900 dark:hover:text-slate-100">Image tools</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">Resize image for SSC form</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Resize Image for SSC Form Online – Photo 20KB to 100KB
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Resize image for SSC form online. Reduce your photo to 20KB, 50KB or 100KB as required by SSC application. Free, private, and works in your browser.
        </p>
      </header>

      <div className="mb-14">
        <SmartImageOptimizer
          defaultMode="smart"
          defaultTargetKb={50}
          seoDescription="Resize image to 50KB or 100KB for SSC application."
          heading="Resize image for SSC form"
        />
      </div>

      <section className="mb-12" aria-labelledby="problem-context-heading">
        <h2 id="problem-context-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          The problem: SSC form rejects your photo
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          You&apos;re applying for SSC CGL, CHSL, MTS, or another Staff Selection Commission exam. You&apos;ve uploaded your details, filled the form, and now the portal asks for your photograph. You select the image—and it fails. &quot;File size exceeds limit.&quot; Your phone saved the photo at 2MB. SSC notifications typically allow 20KB to 100KB, often 50KB. Anything over that, and the form rejects it. Deadlines are tight; you need a fix that works.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          This page gives you the tool and the guidance. Resize your photo to the exact size the SSC notification specifies—20KB, 50KB, or 100KB—and submit with confidence. All processing happens in your browser. Your photo is never uploaded to our servers.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step-heading">
        <h2 id="step-by-step-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-step: resize photo for SSC form
        </h2>
        <ol className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">1</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Check the SSC notification.</strong> Open the official notification for your exam (CGL, CHSL, MTS, etc.) and note the maximum photo file size. It&apos;s usually 50KB or 100KB, sometimes 20KB.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">2</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Upload your photo.</strong> Use a recent, clear photograph. If the form requires passport-style dimensions, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> first, then come back here to resize for file size.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">3</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Set the target size.</strong> Choose 20KB, 50KB, or 100KB to match the notification. Smart Optimize will compress and resize as needed to hit that exact limit.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">4</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Download and upload to SSC.</strong> Save the resized image, then use it when uploading to the SSC application portal. Keep the file under the limit—aim for 95KB when the limit is 100KB if you want a safety margin.</span>
          </li>
        </ol>
      </section>

      <section className="mb-12" aria-labelledby="context-heading">
        <h2 id="context-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          SSC form photo size requirements
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Staff Selection Commission (SSC) applications—including SSC CGL, CHSL, MTS, and others—require a recent photograph of the candidate. The notification usually specifies a maximum file size, often between 20KB and 100KB, and sometimes 50KB. If your photo is larger, the portal may reject the upload. Resizing your image to the exact limit avoids last-minute errors and ensures your application is submitted successfully. This tool lets you choose 20KB, 50KB, or 100KB (or a custom size) so you can match the requirement for your exam. All processing is done in your browser; nothing is uploaded. For a correctly framed passport-style photo, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>. For document size limits, try the <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> or <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="common-errors-heading">
        <h2 id="common-errors-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common errors when uploading SSC photo
        </h2>
        <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;File size exceeds limit&quot;</strong> — Resize to slightly under the limit (e.g. 95KB when 100KB). Some portals measure size differently.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Invalid format&quot;</strong> — SSC typically accepts JPEG. Our tool outputs JPEG. Ensure you&apos;re uploading the downloaded file, not the original.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Dimensions not as per specification&quot;</strong> — Some forms require specific dimensions. Use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> for correct framing, then resize here for file size.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Quality looks poor</strong> — For strict limits like 20KB, quality may drop. Use a well-lit, sharp source photo. If the notification allows 50KB or 100KB, prefer that for better clarity.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="tips-heading">
        <h2 id="tips-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Tips for SSC form photo success
        </h2>
        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
          <li>Use a recent photograph with neutral expression and plain background, as per SSC guidelines.</li>
          <li>Check the notification for your specific exam—CGL, CHSL, MTS may have slightly different specs.</li>
          <li>Keep the original high-resolution photo. You may need it for admit card, document verification, or other exams.</li>
          <li>For <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">UPSC</Link> or <Link href="/railway-photo-size-limit" className="font-medium text-slate-900 underline dark:text-slate-100">railway</Link> forms, the same resize logic applies. See our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> page for a general-purpose tool.</li>
        </ul>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-ssc-form"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
