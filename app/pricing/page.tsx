import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";
import { Check } from "lucide-react";
import { PremiumPlanButton } from "@/components/PremiumPlanButton";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Pricing – Dockera",
    description:
      "Free and Pro plans for Dockera. DocChat is free to use with up to 3 indexed files; Pro adds unlimited uploads and full tools. Upgrade for ad-free experience and more.",
    path: "/pricing",
  }),
};

const basicFeatures = [
  "Access to essential Dockera tools",
  "Limited document processing",
  "DocChat: unlimited chat — up to 3 indexed PDF & Word files (10 MB each)",
];

const premiumFeatures = [
  "Full access to all Dockera tools",
  "Unlimited document processing",
  "DocChat: unlimited chat + unlimited file uploads (up to 50 MB each)",
  "Ideal for exam prep – UPSC, SSC, banking & more",
  "Access across Web, Mobile, and Desktop",
  "Ad-free experience",
  "Works on all devices",
];

export default async function PricingPage() {
  const session = await getSession();
  const tier = session?.tier ?? null;
  const isFree = tier === "free" || tier === null;
  const isPro = tier === "premium";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Simple, transparent pricing
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-400">
        Start for free. Upgrade when you need more.
      </p>

      <div className="mt-16 grid gap-8 lg:mx-auto lg:max-w-3xl lg:grid-cols-2">
        {/* Basic - Free */}
        <div className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Basic</h2>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">Free</span>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Start for free</p>
          <ul className="mt-6 flex-1 space-y-3">
            {basicFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Check className="h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {session && isFree ? (
              <span
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 dark:border-neutral-600 dark:bg-neutral-800 dark:text-slate-400"
                aria-label="Your current plan"
              >
                Current plan
              </span>
            ) : session && isPro ? (
              <span
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 dark:border-neutral-600 dark:bg-neutral-800 dark:text-slate-400"
                aria-label="Included in your plan"
              >
                Included in your plan
              </span>
            ) : (
              <Link
                href="/login?redirect=/pricing"
                className="btn btn-outline btn-block"
              >
                Get started free
              </Link>
            )}
          </div>
        </div>

        {/* Pro */}
        <div className="relative flex min-w-0 flex-col rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-lg dark:border-slate-100 dark:bg-neutral-900 sm:p-8">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3 py-0.5 text-xs font-medium text-white dark:bg-slate-100 dark:text-slate-900">
            Popular
          </span>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Pro</h2>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">₹99</span>
            <span className="text-slate-600 dark:text-slate-400">/ month</span>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            ₹990 billed annually (save 2 months)
          </p>
          <ul className="mt-6 flex-1 space-y-3">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Check className="h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {session && isPro ? (
              <span
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 dark:border-neutral-600 dark:bg-neutral-800 dark:text-slate-400"
                aria-label="Your current plan"
              >
                Current plan
              </span>
            ) : (
              <PremiumPlanButton
                href="/pricing/checkout?plan=monthly"
                className="btn btn-primary btn-block"
              >
                Go Pro
              </PremiumPlanButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
