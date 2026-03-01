import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dockera.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools/image-resizer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/resize-image-to-100kb`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/resize-image-to-50kb`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/resize-image-to-20kb`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/resize-image-for-ssc-form`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/resize-image-for-upsc-form`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/pdf-compressor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/compress-pdf-for-govt-form`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/railway-photo-size-limit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/passport-photo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/signature-extractor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/compress-image`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/crop-image`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/convert-to-png`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/convert-from-jpg`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/merge-pdf`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/split-pdf`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/pdf-to-word`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/word-to-pdf`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/pdf-to-jpg`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/jpg-to-pdf`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/image-to-pdf`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/guides/how-to-resize-image-for-government-forms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
