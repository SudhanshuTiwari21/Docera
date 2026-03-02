import Link from "next/link";
import {
  SeoArticleLayout,
  getSeoArticleMetadata,
} from "@/components/blog/SeoArticleLayout";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { buildOptimizedTitle } from "@/lib/titleOptimizer";

const title = "How to Resize Image for Government Forms in India";
const description =
  "Step-by-step guide to resizing your photo to 20KB, 50KB or 100KB for SSC, UPSC, railway and other government application forms. Free tools and tips.";
const canonicalPath = "/guides/how-to-resize-image-for-government-forms";
const keywords = [
  "resize image for govt forms",
  "government form photo size",
  "SSC form photo",
  "UPSC application photo",
  "resize image 100kb",
];

export const metadata = getSeoArticleMetadata({
  title: buildOptimizedTitle("How to Resize Image for Govt Forms", {
    intent: "general",
  }),
  description,
  keywords,
  canonicalPath,
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What image size is required for government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most government forms in India (SSC, UPSC, railway, etc.) require a photograph between 20KB and 100KB. Check the specific notification for the exact limit—often 50KB or 100KB.",
      },
    },
    {
      "@type": "Question",
      name: "How can I resize my image for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use an online tool that runs in your browser, such as Dockera's resize image tool. Upload your photo, select the target size (20KB, 50KB, or 100KB), and download the resized image. No sign-up required.",
      },
    },
    {
      "@type": "Question",
      name: "Why did my form upload fail even after resizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Portals can reject files for wrong format (use JPEG), wrong dimensions, or if the file is still slightly over the limit. Try resizing to 95KB when the limit is 100KB. Ensure you're using the correct dimensions for passport-style photos if required.",
      },
    },
    {
      "@type": "Question",
      name: "Resize vs compress—which tool for government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For forms with a specific KB limit (e.g. 100KB), use a resize-to-target tool that hits the exact size. Compress tools adjust quality only and don't guarantee a target. Dockera's resize to 100KB tool combines both and stops at your chosen size.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to resize my photo online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if the tool runs in your browser and doesn't upload your image. Dockera's tools process images locally—nothing is sent to our servers. Safe for sensitive documents and application photos.",
      },
    },
  ],
};

export default function HowToResizeImageGuide() {
  return (
    <SeoArticleLayout
      title={title}
      description={description}
      canonicalPath={canonicalPath}
      faqSchema={faqSchema}
      datePublished="2025-01-15"
      dateModified="2025-02-17"
    >
      <h2>Why photo size matters for government forms</h2>
      <p>
        Indian government and recruitment portals—SSC, UPSC, railway, and state
        exams—often require a recent photograph with a strict file size limit.
        If your image is too large, the upload may fail. Resizing your photo to
        the exact requirement (e.g. 100KB or 50KB) avoids last-minute errors and
        ensures your application is submitted successfully.
      </p>

      <h2>The problem: upload failed due to file size</h2>
      <p>
        You&apos;ve filled the form. You&apos;ve got your photo ready. You click upload—and the portal says &quot;File size exceeds limit&quot; or &quot;Maximum 100KB allowed.&quot; Your phone or camera saved the image at 2MB or more. Most government portals in India enforce strict limits: 100KB, 50KB, or sometimes 20KB. If your image is even slightly over, the form rejects it. That&apos;s frustrating, especially when deadlines are tight.
      </p>
      <p>
        The fix is to resize your image to the exact limit before uploading. Use a free online tool that runs in your browser so your photo is never sent to any server. Our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> tool does exactly that.
      </p>

      <h2>Steps to resize your image</h2>
      <p>
        First, check the official notification for the maximum file size. SSC, UPSC, railway, and state exam notifications typically specify 20KB, 50KB, or 100KB. Note the exact limit.
      </p>
      <p>
        Next, use a free online resizer. Upload your photo, select the target size (20KB, 50KB, or 100KB to match the form), and run the optimization. The tool compresses and optionally resizes the image to hit that exact file size. Download the result and use it when uploading to the form.
      </p>
      <p>
        For SSC-specific guidance, see our <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 underline dark:text-slate-100">resize image for SSC form</Link> page. For UPSC, see <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">resize image for UPSC form</Link>. For railway, see our <Link href="/railway-photo-size-limit" className="font-medium text-slate-900 underline dark:text-slate-100">railway photo size limit</Link> guide.
      </p>

      <h3>Choose the right dimensions and format</h3>
      <p>
        Most portals accept JPEG. Keep the aspect ratio of a standard passport-style photo if the form asks for one. If you need correct framing and background, use a <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> first, then resize for file size.
      </p>

      <h3>Keep a backup</h3>
      <p>
        Save the resized file with a clear name (e.g. ssc_photo_50kb.jpg) so you can reuse it if needed. Keep the original high-resolution photo for other purposes like document verification or admit cards.
      </p>

      <h2>Common errors and how to fix them</h2>
      <p>
        <strong>Upload failed / file size exceeds limit</strong> — Resize to slightly under the limit (e.g. 95KB when the limit is 100KB). Some portals measure file size differently. Aim for a 2–5KB buffer.
      </p>
      <p>
        <strong>Invalid format</strong> — Most forms accept JPEG only. Ensure the tool outputs JPEG and that you&apos;re uploading the downloaded file, not the original.
      </p>
      <p>
        <strong>Dimensions not acceptable</strong> — Some forms require specific dimensions (e.g. passport-style). Use a passport photo tool for correct framing, then resize for file size.
      </p>
      <p>
        <strong>Quality looks too low</strong> — For strict limits like 20KB, quality may drop. Use a well-lit, sharp source photo. If the form allows 50KB or 100KB, prefer that for better clarity.
      </p>

      <h2>Tips for a smooth upload</h2>
      <p>
        Use a stable internet connection when submitting the form. If the portal rejects the file, try a slightly smaller size (e.g. 45KB instead of 50KB). For passport-style dimensions and background, use a dedicated <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> in addition to the resizer. Keep the original high-resolution file—you may need it for verification or other exams.
      </p>

      <h2>Resize vs compress: which tool to use?</h2>
      <p>
        <strong>Compress</strong> adjusts image quality only. It reduces file size but doesn&apos;t guarantee a specific KB target. Good for general use when you want smaller files.
      </p>
      <p>
        <strong>Resize to 100KB (or Smart Optimize)</strong> hits an exact file size. It combines quality reduction and dimension resizing as needed, and stops at your chosen KB. That&apos;s what government forms need—a guarantee your file is under the limit.
      </p>
      <p>
        Use <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> when the form says &quot;maximum 100KB&quot; or &quot;50KB&quot;. Use <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link> when you just want smaller files for email or the web.
      </p>

      <div className="mt-10">
        <FaqAccordion
          faqs={faqSchema.mainEntity.map((m: { name: string; acceptedAnswer: { text: string } }) => ({
            q: m.name,
            a: m.acceptedAnswer.text,
          }))}
          heading="FAQs"
          accordionName="faq-how-to-resize-govt"
        />
      </div>
    </SeoArticleLayout>
  );
}
