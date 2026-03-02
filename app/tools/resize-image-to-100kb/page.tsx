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
    {
      "@type": "Question",
      name: "Why did my form upload fail even after resizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Portals can reject files for wrong format (use JPEG), wrong dimensions, or if the file is still slightly over the limit. Try resizing to 95KB when the limit is 100KB to add margin. Ensure you're using the correct dimensions for passport-style photos if required—use our passport photo tool for that.",
      },
    },
    {
      "@type": "Question",
      name: "Resize vs compress—which should I use for government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For government forms with a specific KB limit (e.g. 100KB), use resize to 100KB or Smart Optimize—they hit the exact file size. Compress adjusts quality only and doesn't guarantee a target size. Our resize tool combines both: it reduces quality and resizes dimensions only if needed to reach your target.",
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
        className="mb-12"
        aria-labelledby="problem-context-heading"
      >
        <h2 id="problem-context-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          The problem: upload failed due to file size
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          You&apos;ve filled out the SSC, UPSC, or railway form. You&apos;ve got your photo ready. You click upload—and the portal says &quot;File size exceeds limit&quot; or &quot;Maximum 100KB allowed.&quot; Your phone or camera saved the image at 2MB or more. Most government portals in India enforce strict limits: 100KB, 50KB, or sometimes 20KB. If your image is even slightly over, the form rejects it. That&apos;s frustrating, especially when deadlines are tight.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          This tool fixes that. It resizes your image to the exact file size required—100KB, 50KB, or 20KB—so your upload succeeds on the first try. No software to install, no sign-up, and your photo is never sent to our servers. Everything runs in your browser.
        </p>
      </section>

      <section
        className="mb-12"
        aria-labelledby="step-by-step-heading"
      >
        <h2 id="step-by-step-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-step: how to resize your image to 100KB
        </h2>
        <ol className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">1</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Check the form requirement.</strong> Look at the official notification or form instructions. Most specify 20KB, 50KB, or 100KB. Note the exact limit.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">2</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Upload your image.</strong> Click the upload area and select your photo. Supported formats: JPEG, PNG, WebP, BMP. The tool works with any of these.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">3</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Select target size.</strong> Use Smart Optimize and set the target to 100KB, 50KB, or 20KB—or enter a custom value. Match the form&apos;s requirement exactly.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200">4</span>
            <span><strong className="text-slate-800 dark:text-slate-200">Optimize and download.</strong> Click &quot;Optimize to 100KB&quot; (or your target). Preview the result, then download. Use this file when uploading to the form.</span>
          </li>
        </ol>
      </section>

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
        aria-labelledby="common-errors-heading"
      >
        <h2 id="common-errors-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common errors and how to fix them
        </h2>
        <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Upload failed&quot; or &quot;File size exceeds limit&quot;</strong> — Your image is still too large. Resize to a size slightly under the limit (e.g. 95KB when the limit is 100KB) to add margin. Some portals measure differently.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Invalid format&quot;</strong> — Most portals accept JPEG only. Our tool outputs JPEG by default. If you used another tool, ensure the file is .jpg or .jpeg.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">&quot;Dimensions not acceptable&quot;</strong> — Some forms require specific dimensions (e.g. passport-style). Use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> for correct framing, then resize for file size here.</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Quality looks too low</strong> — For strict limits like 20KB, the tool may reduce quality noticeably. Try a slightly higher target if the form allows, or use a well-lit, properly cropped photo to start with.</li>
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
          <li>Use a recent, clear photo with good lighting. Compressing a blurry or dark image won&apos;t improve it.</li>
          <li>If the form allows 100KB, aim for 95–98KB when resizing. Portals sometimes calculate size differently.</li>
          <li>Keep the original high-resolution file. You may need it for other applications or documents.</li>
          <li>For <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 underline dark:text-slate-100">SSC</Link> or <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">UPSC</Link>, check the official notification for exact specs. Our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">Smart Image Optimizer</Link> offers Resize, Compress, and Smart Optimize modes—use Smart Optimize when you need an exact KB target.</li>
        </ul>
      </section>

      <section
        className="mb-12"
        aria-labelledby="resize-vs-compress-heading"
      >
        <h2 id="resize-vs-compress-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Resize vs compress: which one for government forms?
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Compress</strong> adjusts image quality only. It reduces file size by lowering JPEG quality, but doesn&apos;t guarantee a specific KB target. Good for general use when you want smaller files without strict limits.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Resize to 100KB (Smart Optimize)</strong> hits an exact file size. It combines quality reduction and dimension resizing as needed, and stops at your chosen KB. That&apos;s what government forms need—a guarantee that your file is under the limit.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use this page when the form says &quot;maximum 100KB&quot; or &quot;50KB&quot;. Use our <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link> tool when you just want smaller files for email or the web.
        </p>
      </section>

      <section
        className="mb-12"
        aria-labelledby="govt-forms-heading"
      >
        <h2 id="govt-forms-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Resize image for SSC, UPSC and Railway forms
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Many Indian government and recruitment forms (SSC, UPSC, railway, state exams, and job portals) require a photo under a specific file size—often 100KB, 50KB, or 20KB. This tool lets you resize your image to the exact limit so your form upload succeeds. No software to install; it works on any device with a modern browser.
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
          You can upload JPEG, PNG, WebP, or BMP. The resized output is always a JPEG file, which is accepted by most government portals and keeps the file size small. If you need a specific <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo size</Link>, use our passport photo tool for dimensions and background.
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
