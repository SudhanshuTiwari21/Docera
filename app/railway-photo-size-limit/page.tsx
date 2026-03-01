import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";

const path = "/railway-photo-size-limit";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Railway Exam Photo Size Limit | Dockera",
    description:
      "Photo size and dimension requirements for railway recruitment forms. Resize your image to the required limit for railway applications.",
    path,
  }),
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

export default function RailwayPhotoSizeLimitPage() {
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
            Railway photo size limit
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Railway Exam Photo Size Limit
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Resize your photo to meet railway form requirements using our{" "}
        <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">
          resize image to 100KB
        </Link>{" "}
        or{" "}
        <Link href="/tools/resize-image-to-50kb" className="font-medium text-slate-900 underline dark:text-slate-100">
          50KB
        </Link>{" "}
        tools. Full guide coming soon.
      </p>
    </article>
  );
}
