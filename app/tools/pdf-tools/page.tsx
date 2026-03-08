import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { pdfToolHrefs, getToolsByHrefs } from "@/lib/toolsData";
import { ArrowRight } from "lucide-react";

const path = "/tools/pdf-tools";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Free PDF Tools Online – Compress, Merge, Split, Convert | Dockera",
    description:
      "Compress PDF, merge and split PDFs, convert PDF to JPG or images to PDF. Free PDF tools for government forms and everyday use. Secure and browser-based.",
    keywords: [
      "PDF tools online",
      "compress PDF",
      "merge PDF",
      "split PDF",
      "PDF to JPG",
      "image to PDF",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const pdfTools = getToolsByHrefs(pdfToolHrefs);

export default function PdfToolsHubPage() {
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
            <Link href="/tools" className="hover:text-slate-900 dark:hover:text-slate-100">
              Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">PDF Tools</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Free PDF Tools Online
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Compress PDFs to reduce file size, merge multiple PDFs into one, split PDFs by page, and convert between PDF and images. All tools run in your browser—no uploads required for most operations. Ideal for government form size limits and document prep.
        </p>
      </header>

      <section className="mb-14" aria-labelledby="tools-grid-heading">
        <h2 id="tools-grid-heading" className="sr-only">
          PDF tools
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pdfTools.map(({ href, title, description, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 hover:shadow dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="mt-3 font-semibold text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                  {title}
                </span>
                <span className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</span>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-slate-700 dark:text-slate-200">
                  Use tool
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="related-guides-heading">
        <h2 id="related-guides-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Related guides
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Need to compress a PDF for a government form or learn how to prepare documents for upload?
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          <li>
            <Link href="/guides/exam-photo-requirements" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
              Exam photo & signature requirements
            </Link>
          </li>
          <li>
            <Link href="/compress-pdf-for-govt-form" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
              Compress PDF for govt form
            </Link>
          </li>
          <li>
            <Link href="/guides/how-to-resize-image-for-government-forms" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
              Resize image for government forms
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-slate-600 dark:text-slate-400">
        <Link href="/tools" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
          All tools
        </Link>
        {" · "}
        <Link href="/tools/image-tools" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
          Image tools
        </Link>
        {" · "}
        <Link href="/guides" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
          Guides
        </Link>
      </p>
    </article>
  );
}
