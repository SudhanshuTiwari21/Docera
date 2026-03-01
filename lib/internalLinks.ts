/**
 * Centralized internal link clusters for Dockera.
 * Use keyword-rich, natural anchor text. Avoid generic "Click here".
 */

export type InternalLink = { href: string; label: string };

/** Resize image tools – keyword-optimized labels */
export const resizeToolLinks: InternalLink[] = [
  { href: "/tools/resize-image-to-100kb", label: "Resize image to 100KB online" },
  { href: "/tools/resize-image-to-50kb", label: "Resize image to 50KB for govt forms" },
  { href: "/tools/resize-image-to-20kb", label: "Resize image to 20KB for SSC forms" },
];

/** PDF tools and guides */
export const pdfToolLinks: InternalLink[] = [
  { href: "/tools/pdf-compressor", label: "Compress PDF online for govt forms" },
  { href: "/compress-pdf-for-govt-form", label: "How to compress PDF for govt form upload" },
];

/** Exam and form photo guides – topical authority */
export const examPhotoGuidesLinks: InternalLink[] = [
  { href: "/resize-image-for-ssc-form", label: "SSC photo size requirements" },
  { href: "/resize-image-for-upsc-form", label: "UPSC photo size requirements" },
  { href: "/railway-photo-size-limit", label: "Railway exam photo size limit" },
];
