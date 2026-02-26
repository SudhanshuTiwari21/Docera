import type { LucideIcon } from "lucide-react";
import {
  ImageIcon,
  Shrink,
  Crop,
  ArrowRightToLine,
  ArrowLeftFromLine,
  FileText,
  Layers,
  Scissors,
  FileType,
  Camera,
  PenTool,
} from "lucide-react";

export type ToolEntry = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** All tools for the landing grid and dropdowns. Single source of truth for SEO and nav. */
export const allTools: ToolEntry[] = [
  {
    href: "/tools/resize-image-to-100kb",
    title: "Resize Image",
    description: "Resize images to 20KB, 50KB or 100KB for government forms and uploads.",
    icon: ImageIcon,
  },
  {
    href: "/tools/compress-image",
    title: "Compress Image",
    description: "Reduce image file size without losing quality. Compress JPG, PNG, and WebP in bulk with ease.",
    icon: Shrink,
  },
  {
    href: "/tools/crop-image",
    title: "Crop Image",
    description: "Crop images to the exact size or area you need. Free and browser-based.",
    icon: Crop,
  },
  {
    href: "/tools/convert-to-png",
    title: "Convert to PNG",
    description: "Turn JPG, GIF, WebP, BMP, or TIF format images to PNG in bulk with ease.",
    icon: ArrowRightToLine,
  },
  {
    href: "/tools/convert-from-jpg",
    title: "Convert from JPG",
    description: "Turn JPG images to PNG and GIF. Choose several JPGs to create an animated GIF in seconds!",
    icon: ArrowLeftFromLine,
  },
  {
    href: "/tools/pdf-compressor",
    title: "Compress PDF",
    description: "Reduce PDF file size without losing quality. Secure and fast.",
    icon: FileText,
  },
  {
    href: "/tools/merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one file. Reorder pages and merge in seconds.",
    icon: Layers,
  },
  {
    href: "/tools/split-pdf",
    title: "Split PDF",
    description: "Split one PDF into multiple files. Extract pages or split by range.",
    icon: Scissors,
  },
  {
    href: "/tools/pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to editable DOC or DOCX. Preserve layout and formatting.",
    icon: FileType,
  },
  {
    href: "/tools/word-to-pdf",
    title: "Word to PDF",
    description: "Convert DOC or DOCX documents to PDF. Preserve layout and formatting.",
    icon: FileType,
  },
  {
    href: "/tools/pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert each PDF page to JPG or extract all images from a PDF.",
    icon: ImageIcon,
  },
  {
    href: "/tools/jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG images to PDF in seconds. Adjust orientation and margins.",
    icon: FileText,
  },
  {
    href: "/tools/image-to-pdf",
    title: "Image to PDF",
    description: "Convert any image type — JPG, PNG, WebP, GIF, BMP, TIF — to PDF in seconds.",
    icon: ImageIcon,
  },
  {
    href: "/tools/passport-photo",
    title: "Passport Photo",
    description: "Create passport and visa photos with correct size and background.",
    icon: Camera,
  },
  {
    href: "/tools/signature-extractor",
    title: "Signature Extractor",
    description: "Extract a clean signature from a photo or document.",
    icon: PenTool,
  },
];

export type DropdownColumn = {
  heading: string;
  tools: { href: string; title: string; icon: LucideIcon }[];
};

const byHref = new Map(allTools.map((t) => [t.href, t]));

function column(
  heading: string,
  hrefs: string[]
): DropdownColumn {
  return {
    heading,
    tools: hrefs.map((href) => {
      const t = byHref.get(href);
      if (!t) throw new Error(`Unknown tool href: ${href}`);
      return { href: t.href, title: t.title, icon: t.icon };
    }),
  };
}

/** Columns for "All Image Tools" mega menu. */
export const allImageToolsColumns: DropdownColumn[] = [
  column("ORGANIZE & RESIZE", [
    "/tools/resize-image-to-100kb",
    "/tools/compress-image",
    "/tools/crop-image",
  ]),
  column("CONVERT IMAGE", [
    "/tools/convert-to-png",
    "/tools/convert-from-jpg",
  ]),
  column("PHOTOS & SIGNATURES", [
    "/tools/passport-photo",
    "/tools/signature-extractor",
  ]),
  column("IMAGE TO PDF", [
    "/tools/jpg-to-pdf",
    "/tools/image-to-pdf",
  ]),
];

/** Columns for "All PDF Tools" mega menu. */
export const allPdfToolsColumns: DropdownColumn[] = [
  column("ORGANIZE PDF", [
    "/tools/merge-pdf",
    "/tools/split-pdf",
  ]),
  column("OPTIMIZE PDF", [
    "/tools/pdf-compressor",
  ]),
  column("CONVERT TO PDF", [
    "/tools/jpg-to-pdf",
    "/tools/image-to-pdf",
    "/tools/word-to-pdf",
  ]),
  column("CONVERT FROM PDF", [
    "/tools/pdf-to-jpg",
    "/tools/pdf-to-word",
  ]),
];

/** Links for "Convert PDF" dropdown. */
export const convertPdfDropdownTools = [
  "/tools/pdf-to-word",
  "/tools/word-to-pdf",
  "/tools/pdf-to-jpg",
  "/tools/jpg-to-pdf",
  "/tools/image-to-pdf",
].map((href) => {
  const t = byHref.get(href);
  if (!t) throw new Error(`Unknown tool href: ${href}`);
  return { href: t.href, title: t.title, icon: t.icon };
});
