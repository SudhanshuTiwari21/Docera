import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dockera.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const routes: { path: string; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"; priority: number }[] = [
    // Home
    { path: "", changeFrequency: "weekly", priority: 1 },
    // Tool hubs
    { path: "/tools", changeFrequency: "weekly", priority: 0.9 },
    { path: "/tools/image-tools", changeFrequency: "weekly", priority: 0.9 },
    { path: "/tools/pdf-tools", changeFrequency: "weekly", priority: 0.9 },
    // Tools
    { path: "/tools/image-resizer", changeFrequency: "monthly", priority: 0.9 },
    { path: "/tools/resize-image-to-100kb", changeFrequency: "monthly", priority: 0.9 },
    { path: "/tools/resize-image-to-50kb", changeFrequency: "monthly", priority: 0.9 },
    { path: "/tools/resize-image-to-20kb", changeFrequency: "monthly", priority: 0.9 },
    { path: "/tools/pdf-compressor", changeFrequency: "monthly", priority: 0.9 },
    { path: "/tools/passport-photo", changeFrequency: "monthly", priority: 0.9 },
    { path: "/tools/signature-extractor", changeFrequency: "monthly", priority: 0.9 },
    { path: "/tools/compress-image", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/crop-image", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/convert-to-png", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/convert-from-jpg", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/merge-pdf", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/split-pdf", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/pdf-to-jpg", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/jpg-to-pdf", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/image-to-pdf", changeFrequency: "monthly", priority: 0.8 },
    // Form-specific landing pages
    { path: "/resize-image-for-ssc-form", changeFrequency: "monthly", priority: 0.9 },
    { path: "/resize-image-for-upsc-form", changeFrequency: "monthly", priority: 0.9 },
    { path: "/compress-pdf-for-govt-form", changeFrequency: "monthly", priority: 0.8 },
    { path: "/railway-photo-size-limit", changeFrequency: "monthly", priority: 0.8 },
    { path: "/fix-government-form-photo-upload-error", changeFrequency: "monthly", priority: 0.8 },
    // Exam-specific guides
    { path: "/upsc-cse-photo-signature-guidelines", changeFrequency: "monthly", priority: 0.8 },
    { path: "/ssc-cgl-photo-signature-size", changeFrequency: "monthly", priority: 0.8 },
    { path: "/ssc-chsl-image-requirements", changeFrequency: "monthly", priority: 0.8 },
    { path: "/ssc-mts-photo-signature-requirements", changeFrequency: "monthly", priority: 0.8 },
    { path: "/rrb-group-d-photo-size", changeFrequency: "monthly", priority: 0.8 },
    { path: "/rrb-alp-photo-signature-size", changeFrequency: "monthly", priority: 0.8 },
    { path: "/rrb-je-photo-signature-requirements", changeFrequency: "monthly", priority: 0.8 },
    { path: "/ibps-po-photo-signature-size", changeFrequency: "monthly", priority: 0.8 },
    { path: "/sbi-clerk-photo-signature-requirements", changeFrequency: "monthly", priority: 0.8 },
    { path: "/mppsc-photo-signature-size", changeFrequency: "monthly", priority: 0.8 },
    { path: "/uppsc-photo-signature-requirements", changeFrequency: "monthly", priority: 0.8 },
    { path: "/bihar-police-photo-signature-size", changeFrequency: "monthly", priority: 0.8 },
    { path: "/bihar-psc-photo-size", changeFrequency: "monthly", priority: 0.8 },
    { path: "/rajasthan-police-photo-signature-requirements", changeFrequency: "monthly", priority: 0.8 },
    // Guides
    { path: "/guides", changeFrequency: "weekly", priority: 0.7 },
    { path: "/guides/exam-photo-requirements", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides/how-to-resize-image-for-government-forms", changeFrequency: "monthly", priority: 0.8 },
    // Static pages
    { path: "/pricing", changeFrequency: "weekly", priority: 0.8 },
    { path: "/login", changeFrequency: "monthly", priority: 0.5 },
    { path: "/signup", changeFrequency: "monthly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${base}${path}` : base,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
