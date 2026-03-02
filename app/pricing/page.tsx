import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Pricing – Dockera",
    description:
      "Free and premium plans for Dockera. Start for free with essential document tools. Upgrade to Premium for unlimited processing, ad-free experience and more.",
    path: "/pricing",
  }),
};

const basicFeatures = [
  "Access to essential Dockera tools",
  "Limited document processing",
];

const premiumFeatures = [
  "Full access to all Dockera tools",
  "Unlimited document processing",
  "Access across Web, Mobile, and Desktop",
  "Ad-free experience",
  "Works on all devices",
];

const businessFeatures = [
  "All Premium features",
  "Custom contracts designed for scalability",
  "Dedicated Account Manager",
  "Single Sign On (SSO)",
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Simple, transparent pricing
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-400">
        Start for free. Upgrade when you need more.
      </p>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {/* Basic - Free */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
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
          <Link
            href="/tools/resize-image-to-100kb"
            className="btn btn-outline btn-block mt-8"
          >
            Get started free
          </Link>
        </div>

        {/* Premium */}
        <div className="relative flex flex-col rounded-2xl border-2 border-slate-900 bg-white p-8 shadow-lg dark:border-slate-100 dark:bg-slate-800">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3 py-0.5 text-xs font-medium text-white dark:bg-slate-100 dark:text-slate-900">
            Popular
          </span>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Premium</h2>
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
          <Link
            href="/pricing/checkout?plan=monthly"
            className="btn btn-primary btn-block mt-8"
          >
            Go Premium
          </Link>
        </div>

        {/* Business */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Business</h2>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">25+</span>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Let's talk</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Scalable solutions for your business with customized pricing.
          </p>
          <ul className="mt-6 flex-1 space-y-3">
            {businessFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Check className="h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:info@dockera.in?subject=Business plan inquiry`}
            className="btn btn-outline btn-block mt-8"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
