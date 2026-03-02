import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { Crop } from "lucide-react";
import { CropImageTool } from "@/components/tools/CropImageTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/crop-image";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Crop Image Online – Free Image Cropper | Dockera",
    description:
      "Crop images to the exact size or area you need. Free and browser-based. No sign-up required.",
    keywords: ["crop image", "image cropper", "crop photo online", "free crop tool"],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Crop Image Online – Free Image Cropper | Dockera",
    description:
      "Crop images to the exact size or area you need. Free and browser-based. No sign-up required.",
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
      name: "How do I crop an image to a specific size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your image, select the crop area, and enter the desired width and height. The tool lets you choose aspect ratio, free crop, or fixed dimensions. You can crop to passport photo size, profile picture dimensions, or any custom size. All processing happens in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Can I crop images for government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After cropping, you may need to resize the image to meet file size limits (e.g. 100KB, 50KB). Use our resize to 100KB or compress image tools. For passport-style photos with correct dimensions and background, use our passport photo tool.",
      },
    },
    {
      "@type": "Question",
      name: "Which image formats can I crop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports JPEG, PNG, WebP, and other common formats. Output format depends on the source—you can typically save as JPEG or PNG. For best compatibility with government forms, JPEG is usually preferred.",
      },
    },
  ],
};

export default function CropImagePage() {
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
          <li className="text-slate-900 dark:text-slate-100">Crop Image</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <Crop className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Crop Image Online
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          Crop images to the exact size or area you need. Free and browser-based.
        </p>
      </header>

      <div className="mb-14">
        <CropImageTool />
      </div>

      <section className="mb-12" aria-labelledby="why-crop-heading">
        <h2 id="why-crop-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why crop images?
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Cropping removes unwanted edges, focuses on a subject, and can help meet size requirements for profile pictures, documents, and forms. Combined with resizing or compression, cropping ensures your image fits both dimension and file size limits for government applications and job portals.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-crop-image"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
