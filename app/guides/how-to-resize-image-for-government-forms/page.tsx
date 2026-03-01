import {
  SeoArticleLayout,
  getSeoArticleMetadata,
} from "@/components/blog/SeoArticleLayout";
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
      dateModified="2025-01-15"
    >
      <h2>Why photo size matters for government forms</h2>
      <p>
        Indian government and recruitment portals—SSC, UPSC, railway, and state
        exams—often require a recent photograph with a strict file size limit.
        If your image is too large, the upload may fail. Resizing your photo to
        the exact requirement (e.g. 100KB or 50KB) avoids last-minute errors and
        ensures your application is submitted successfully.
      </p>

      <h2>Steps to resize your image</h2>
      <p>
        First, check the official notification for the maximum file size (often
        20KB, 50KB, or 100KB). Then use a free online resizer that runs in your
        browser so your photo is never uploaded. Choose the target size, run the
        compression, and download the result. Use the resized image when filling
        the form.
      </p>

      <h3>Choose the right dimensions and format</h3>
      <p>
        Most portals accept JPEG. Keep the aspect ratio of a standard passport-style
        photo if the form asks for one. The resize tool will compress the file
        to meet the size limit while keeping the image suitable for official use.
      </p>

      <h3>Keep a backup</h3>
      <p>
        Save the resized file with a clear name (e.g. ssc_photo_50kb.jpg) so you
        can reuse it if needed. Keep the original high-resolution photo for other
        purposes.
      </p>

      <h2>Tips for a smooth upload</h2>
      <p>
        Use a stable internet connection when submitting the form. If the portal
        rejects the file, try a slightly smaller size (e.g. 45KB instead of 50KB).
        For passport-style dimensions and background, use a dedicated passport
        photo tool in addition to the resizer.
      </p>
    </SeoArticleLayout>
  );
}
