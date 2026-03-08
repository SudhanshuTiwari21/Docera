import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDefaultMetadata } from "@/lib/seo";
import { allTools } from "@/lib/toolsData";
import { HeroDemo } from "@/components/HeroDemo";
import { TrueFocusHeading } from "@/components/TrueFocusHeading";
import {
  Lock,
  User,
  Zap,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Dockera – Free Online PDF & Image Tools",
    description:
      "Free online PDF and image tools: resize image 100kb for govt forms, compress PDFs, passport photo maker, signature extractor. Resize images for government forms, compress PDFs, create passport photos and extract signatures instantly.",
    keywords: [
      "PDF tools",
      "image tools",
      "resize image 100kb",
      "passport photo maker",
      "compress PDF",
      "signature extractor",
      "document tools online",
      "government form photo",
    ],
    path: "/",
  }),
};

const faqs = [
  {
    q: "How to resize image to 100KB?",
    a: "Use our Resize Image tool: upload your photo, select 100KB as the target size, and click Resize. The tool runs in your browser and outputs a file under 100KB. You can also choose 20KB or 50KB for stricter form limits.",
  },
  {
    q: "Is Dockera safe?",
    a: "Yes. Dockera is designed for privacy. Processing runs in your browser where possible, and we don't store your files. No sign-up is required to use the tools.",
  },
  {
    q: "Do files get uploaded?",
    a: "For the resize, compress and signature tools, processing happens locally on your device. Your files never leave your device unless a specific tool clearly states otherwise.",
  },
  {
    q: "What formats are supported?",
    a: "We support common image formats (JPEG, PNG, WebP) for resizing and passport photos, and PDF for compression. Outputs are in standard formats accepted by most portals and forms.",
  },
] as const;

const trustItems = [
  { icon: Lock, label: "Private by design" },
  { icon: User, label: "No sign-up required" },
  { icon: Zap, label: "Instant processing" },
  { icon: Smartphone, label: "Works on all devices" },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero – heading and description closer to nav */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white dark:from-black dark:via-black dark:to-black"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-4 sm:px-6 sm:pt-8 sm:pb-6 lg:px-8 lg:pt-10 lg:pb-8">
          <div className="text-center">
           
            <h1
              id="hero-heading"
              className="animate-hero-headline text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl lg:text-4xl"
            >
              Free Online PDF & Image Tools
            </h1>
            <p className="animate-hero-subtitle mt-5 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 sm:text-l">
              Resize images for government forms, compress PDFs, create passport photos and extract signatures instantly.{" "}
              <strong className="animate-hero-highlight inline-block px-1 rounded">100% free</strong>
              {" "}and easy to use — no sign-up required.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tools"
                className="animate-hero-buttons animate-hero-btn-1 inline-flex items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100 px-5 py-3.5 text-base font-semibold text-white dark:text-slate-900 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-100 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                All tools
              </Link>
              <Link
                href="/tools/resize-image-to-100kb"
                className="animate-hero-buttons animate-hero-btn-1 inline-flex items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100 px-5 py-3.5 text-base font-semibold text-white dark:text-slate-900 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-100 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Resize Image
              </Link>
              <Link
                href="/tools/pdf-compressor"
                className="animate-hero-buttons animate-hero-btn-2 inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-5 py-3.5 text-base font-semibold text-slate-900 dark:text-slate-100 shadow-sm hover:bg-slate-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-100 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Compress PDF
              </Link>
              <Link
                href="/tools/passport-photo"
                className="animate-hero-buttons animate-hero-btn-3 inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-5 py-3.5 text-base font-semibold text-slate-900 dark:text-slate-100 shadow-sm hover:bg-slate-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-100 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Passport Photo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools grid – 4 cards per row, directly below hero */}
      <section
        className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 sm:pt-2 sm:pb-12 lg:px-8"
        aria-labelledby="tools-heading"
      >
        <div className="text-center">
          <TrueFocusHeading />
          <p className="mt-1.5 text-slate-600 dark:text-slate-400">
            All tools are free. Processing runs in your browser when possible. Browse by category:{" "}
            <Link href="/tools/image-tools" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">image tools</Link>
            {" · "}
            <Link href="/tools/pdf-tools" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">PDF tools</Link>
            {" · "}
            <Link href="/guides" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">guides</Link>
            .
          </p>
        </div>
        <ul className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {allTools.map(({ href, title, description, icon: Icon }) => (
            <li key={href} className="flex">
              <Link
                href={href}
                className="landing-tool-card group flex h-full flex-col rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                  {title}
                </h3>
                <p className="mt-1 flex-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-900 dark:text-slate-200">
                  Use tool
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Hero demo – browser mockup with tool preview or video/gif */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8" aria-label="Dockera in action">
        <div className="animate-fade-in-up w-full max-w-4xl mx-auto rounded-2xl overflow-hidden">
          <HeroDemo />
        </div>
      </section>

      {/* Trust strip */}
      <section
        className="border-y border-slate-200 dark:border-neutral-700 bg-slate-50/50 dark:bg-neutral-900/50"
        aria-label="Why trust Dockera"
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-neutral-900 shadow-sm ring-1 ring-slate-200/80 dark:ring-neutral-600/80 text-slate-600 dark:text-slate-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <FaqAccordion
          faqs={faqs}
          heading="Frequently asked questions"
          subheading="Quick answers about Dockera and our tools."
        >
          Explore our{" "}
          <Link href="/tools" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
            PDF and image tools
          </Link>
          ,{" "}
          <Link href="/tools/image-tools" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
            image tools
          </Link>
          , and{" "}
          <Link href="/guides" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
            guides
          </Link>
          . Need to resize for a specific form? See{" "}
          <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
            SSC photo size
          </Link>
          {" "}and{" "}
          <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
            UPSC photo size
          </Link>
          , or the{" "}
          <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
            resize image to 100KB
          </Link>{" "}
          tool.
        </FaqAccordion>
      </section>
    </div>
  );
}
