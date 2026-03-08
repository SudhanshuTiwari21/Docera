import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { InternalLinksSection } from "@/components/common/InternalLinksSection";
import {
  resizeToolLinks,
  pdfToolLinks,
} from "@/lib/internalLinks";

const path = "/guides/exam-photo-requirements";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Government Exam Photo & Signature Requirements | Dockera",
    description:
      "Photo and signature size requirements for SSC, RRB, banking, and state exams. Resize images for CGL, CHSL, UPSC, IBPS, SBI, and more. Free tools and guides.",
    keywords: [
      "exam photo size",
      "government form photo requirements",
      "SSC photo size",
      "UPSC photo signature",
      "RRB photo size KB",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const sscExams = [
  { href: "/ssc-cgl-photo-signature-size", label: "SSC CGL" },
  { href: "/ssc-chsl-image-requirements", label: "SSC CHSL" },
  { href: "/ssc-mts-photo-signature-requirements", label: "SSC MTS" },
];

const rrbExams = [
  { href: "/rrb-group-d-photo-size", label: "RRB Group D" },
  { href: "/rrb-alp-photo-signature-size", label: "RRB ALP" },
  { href: "/rrb-je-photo-signature-requirements", label: "RRB JE" },
];

const bankingExams = [
  { href: "/ibps-po-photo-signature-size", label: "IBPS PO" },
  { href: "/sbi-clerk-photo-signature-requirements", label: "SBI Clerk" },
];

const stateExams = [
  { href: "/mppsc-photo-signature-size", label: "MPPSC" },
  { href: "/uppsc-photo-signature-requirements", label: "UPPSC" },
  { href: "/bihar-police-photo-signature-size", label: "Bihar Police" },
  { href: "/bihar-psc-photo-size", label: "Bihar PSC" },
  { href: "/rajasthan-police-photo-signature-requirements", label: "Rajasthan Police" },
];

const generalGuides = [
  { href: "/resize-image-for-ssc-form", label: "Resize image for SSC form" },
  { href: "/resize-image-for-upsc-form", label: "Resize image for UPSC form" },
  { href: "/railway-photo-size-limit", label: "Railway photo size limit" },
  { href: "/upsc-cse-photo-signature-guidelines", label: "UPSC CSE photo & signature guidelines" },
  { href: "/fix-government-form-photo-upload-error", label: "Fix government form photo upload error" },
];

export default function ExamPhotoRequirementsPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/guides" className="hover:text-slate-900 dark:hover:text-slate-100">
              Guides
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">Exam photo requirements</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Government Exam Photo & Signature Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Most government job applications in India require a specific photo size (often 20KB–50KB or 20KB–100KB) and signature size (e.g. 10KB–20KB). Wrong dimensions or file size lead to upload errors and rejection. This page links to requirement guides for SSC, RRB, banking, and state exams, plus free tools to resize images and create compliant photos.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="why-size-matters">
        <h2 id="why-size-matters" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Why image size matters for government forms
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Portals validate file size and sometimes dimensions. If your photo or signature exceeds the limit (e.g. 50KB) or is in the wrong format, the form will not accept the file. Using our free <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">resize image to 100KB</Link> or <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">exam smart resizer</Link> ensures your image meets the limit. For correct framing and background, use the <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">passport photo tool</Link>; for signatures use the <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">signature extractor</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="ssc-exams">
        <h2 id="ssc-exams" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          SSC Exams
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {sscExams.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="rrb-exams">
        <h2 id="rrb-exams" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          RRB Exams
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {rrbExams.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="banking-exams">
        <h2 id="banking-exams" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Banking Exams
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {bankingExams.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="state-exams">
        <h2 id="state-exams" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          State Exams
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {stateExams.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="general-guides">
        <h2 id="general-guides" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          General form & photo guides
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {generalGuides.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Free tools to meet requirements
        </h2>
        <InternalLinksSection title="Resize image tools" links={resizeToolLinks} headingLevel={3} />
        <div className="mt-6">
          <InternalLinksSection title="PDF tools" links={pdfToolLinks} headingLevel={3} />
        </div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          <Link href="/tools/image-tools" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">All image tools</Link>
          {" · "}
          <Link href="/tools/pdf-tools" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">All PDF tools</Link>
        </p>
      </section>

      <p className="text-slate-600 dark:text-slate-400">
        <Link href="/guides" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
          All guides
        </Link>
        {" · "}
        <Link href="/tools" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
          All tools
        </Link>
      </p>
    </article>
  );
}
