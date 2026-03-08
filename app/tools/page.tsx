import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { allTools, imageToolHrefs, pdfToolHrefs, getToolsByHrefs } from "@/lib/toolsData";
import { ArrowRight } from "lucide-react";

const path = "/tools";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Free Online PDF & Image Tools | Dockera",
    description:
      "Resize images, compress PDFs, merge files, create passport photos, and extract signatures online with Dockera. Free PDF and image tools for government forms and everyday use.",
    keywords: [
      "PDF tools online",
      "image tools online",
      "resize image",
      "compress PDF",
      "passport photo maker",
      "free document tools",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const imageTools = getToolsByHrefs(imageToolHrefs);
const pdfTools = getToolsByHrefs(pdfToolHrefs);

export default function ToolsHubPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Tools</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Free Online PDF & Image Tools
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Dockera gives you free PDF and image tools in one place. Resize images for government forms, compress and merge PDFs, create passport photos, and extract signatures—all in your browser. No sign-up required for most tools.
        </p>
      </header>

      <section className="mb-14" aria-labelledby="image-tools-heading">
        <h2 id="image-tools-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Image Tools
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Resize, compress, crop, convert, and optimize images. Perfect for government form photo size requirements and everyday use.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imageTools.map(({ href, title, description, icon: Icon }) => (
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
        <p className="mt-4">
          <Link
            href="/tools/image-tools"
            className="font-medium text-slate-900 underline underline-offset-2 hover:no-underline dark:text-slate-100"
          >
            View all image tools
          </Link>
        </p>
      </section>

      <section className="mb-14" aria-labelledby="pdf-tools-heading">
        <h2 id="pdf-tools-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          PDF Tools
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Compress, merge, split, and convert PDFs. Convert images to PDF or PDF pages to images.
        </p>
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
        <p className="mt-4">
          <Link
            href="/tools/pdf-tools"
            className="font-medium text-slate-900 underline underline-offset-2 hover:no-underline dark:text-slate-100"
          >
            View all PDF tools
          </Link>
        </p>
      </section>

      <section aria-labelledby="all-tools-heading">
        <h2 id="all-tools-heading" className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          All {allTools.length} tools
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          <Link href="/" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
            Back to homepage
          </Link>
          {" · "}
          <Link href="/guides" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
            Guides
          </Link>
        </p>
      </section>
    </article>
  );
}
