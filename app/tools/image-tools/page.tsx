import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { imageToolHrefs, getToolsByHrefs } from "@/lib/toolsData";
import { InternalLinksSection } from "@/components/common/InternalLinksSection";
import { examPhotoGuidesLinks } from "@/lib/internalLinks";
import { ArrowRight } from "lucide-react";

const path = "/tools/image-tools";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Image Tools Online – Resize, Compress, Convert | Dockera",
    description:
      "Free image tools: resize image to 100KB for govt forms, compress and crop images, convert to PNG, create passport photos, extract signatures. All tools run in your browser.",
    keywords: [
      "image tools online",
      "resize image 100kb",
      "compress image",
      "passport photo maker",
      "image to PDF",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const imageTools = getToolsByHrefs(imageToolHrefs);

export default function ImageToolsHubPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Image Tools</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Image Tools Online
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Resize, compress, crop, and convert images for government forms and everyday use. Resize image to 20KB, 50KB, or 100KB for SSC, UPSC, railway, and other exams. Create passport photos and extract signatures—all free and private in your browser.
        </p>
      </header>

      <section className="mb-14" aria-labelledby="tools-grid-heading">
        <h2 id="tools-grid-heading" className="sr-only">
          Image tools
        </h2>
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
      </section>

      <section className="mb-12" aria-labelledby="related-guides-heading">
        <h2 id="related-guides-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Related guides
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Need the right photo size for a specific exam? See our guides on government exam photo and signature requirements.
        </p>
        <InternalLinksSection
          title="Exam photo requirements"
          links={[
            { href: "/guides/exam-photo-requirements", label: "Government exam photo & signature requirements" },
            { href: "/resize-image-for-ssc-form", label: "SSC photo size" },
            { href: "/resize-image-for-upsc-form", label: "UPSC photo size" },
          ]}
          headingLevel={3}
        />
      </section>

      <p className="text-slate-600 dark:text-slate-400">
        <Link href="/tools" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
          All tools
        </Link>
        {" · "}
        <Link href="/tools/pdf-tools" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
          PDF tools
        </Link>
        {" · "}
        <Link href="/guides" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
          Guides
        </Link>
      </p>
    </article>
  );
}
