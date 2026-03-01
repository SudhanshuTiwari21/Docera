import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";

const path = "/compress-pdf-for-govt-form";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "How to Compress PDF for Govt Form Upload | Dockera",
    description:
      "Steps to compress and reduce PDF file size for government form uploads in India. Free PDF compressor for SSC, UPSC, and other portals.",
    path,
  }),
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

export default function CompressPdfForGovtFormPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">
            Compress PDF for govt form
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        How to Compress PDF for Govt Form Upload
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">compress PDF online</Link> tool to reduce file size for government portal uploads. Full guide coming soon.
      </p>
    </article>
  );
}
