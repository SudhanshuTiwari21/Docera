import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Terms of Use",
    description: "Dockera terms of use. Rules and conditions for using our document and image tools.",
    path: "/terms",
  }),
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Terms of Use
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        This is a placeholder. Add your terms of use content here.
      </p>
      <p className="mt-4">
        <Link href="/" className="font-medium text-slate-900 underline dark:text-slate-100">
          ← Back to home
        </Link>
      </p>
    </article>
  );
}
