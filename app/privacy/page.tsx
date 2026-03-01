import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Privacy Policy",
    description: "Dockera privacy policy. How we handle your data when you use our document and image tools.",
    path: "/privacy",
  }),
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Privacy Policy
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        This is a placeholder. Add your privacy policy content here.
      </p>
      <p className="mt-4">
        <Link href="/" className="font-medium text-slate-900 underline dark:text-slate-100">
          ← Back to home
        </Link>
      </p>
    </article>
  );
}
