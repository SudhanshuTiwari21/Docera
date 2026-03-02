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
  { href: "/fix-government-form-photo-upload-error", label: "Fix government form photo upload error" },
  { href: "/bihar-psc-photo-size", label: "Bihar PSC photo size" },
];

/** Image tools – for image-related tool pages */
export const imageToolsLinks: InternalLink[] = [
  { href: "/tools/resize-image-to-100kb", label: "Resize image to 100KB" },
  { href: "/tools/compress-image", label: "Compress image online" },
  { href: "/tools/crop-image", label: "Crop image online" },
  { href: "/tools/passport-photo", label: "Passport photo maker" },
  { href: "/tools/convert-to-png", label: "Convert to PNG" },
];

/** PDF tools – for PDF-related tool pages */
export const pdfToolsLinks: InternalLink[] = [
  { href: "/tools/pdf-compressor", label: "Compress PDF online" },
  { href: "/tools/merge-pdf", label: "Merge PDF files" },
  { href: "/tools/split-pdf", label: "Split PDF" },
  { href: "/tools/pdf-to-jpg", label: "PDF to JPG converter" },
];
