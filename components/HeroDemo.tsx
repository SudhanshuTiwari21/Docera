"use client";

import Image from "next/image";
import Link from "next/link";
import { FileUp, Loader2, Download, ImageIcon, FileText } from "lucide-react";
import { useState } from "react";

/** Add public/hero-demo.mp4, hero-demo.webm, or hero-demo.gif for custom demo. Defaults to fallback so the demo works without media. */
export function HeroDemo() {
  const [mediaState, setMediaState] = useState<"video" | "gif" | "fallback">("fallback");

  const toolbar = (
    <div className="flex w-full min-w-0 items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900/80">
      {/* Traffic lights — custom (avoid daisyUI mockup-browser fixed widths) */}
      <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-neutral-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-neutral-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-neutral-600" />
      </div>
      <div className="min-w-0 flex-1 truncate rounded-lg border border-slate-200 bg-white px-3 py-1 text-center text-xs text-slate-500 dark:border-neutral-600 dark:bg-slate-700 dark:text-slate-400 sm:text-sm">
        dockera.in/tools/resize-image
      </div>
    </div>
  );

  const fallbackContent = () => (
    <div className="flex min-h-[280px] flex-col bg-gradient-to-b from-white to-slate-50 p-4 dark:from-neutral-900 dark:to-black sm:p-6 lg:p-8">
      <div className="grid flex-1 grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Upload card */}
        <div className="flex min-h-[120px] animate-[float_2.5s_ease-in-out_infinite] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-white p-4 dark:border-neutral-600 dark:bg-neutral-900/50 sm:p-5">
          <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700">
            <FileUp className="h-8 w-8 text-slate-600 dark:text-slate-400 sm:h-10 sm:w-10" />
          </div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Upload image</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">JPEG, PNG, WebP</span>
        </div>

        {/* Process */}
        <div className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900/50 sm:p-5">
          <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700">
            <Loader2 className="h-8 w-8 animate-spin text-slate-600 dark:text-slate-400 sm:h-10 sm:w-10" />
          </div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Processing in browser</span>
          <div className="h-1.5 w-full max-w-[120px] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-slate-600 dark:bg-slate-400" />
          </div>
        </div>

        {/* Result */}
        <div className="flex min-h-[120px] animate-[float_2.5s_ease-in-out_infinite_0.5s] flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900/50 sm:p-5">
          <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700">
            <Download className="h-8 w-8 text-slate-600 dark:text-slate-400 sm:h-10 sm:w-10" />
          </div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Download result</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">Resized to 100KB</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <ImageIcon className="h-4 w-4" /> Resize Image
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FileText className="h-4 w-4" /> Compress PDF
        </span>
        <Link href="/" className="font-medium text-slate-700 hover:underline dark:text-slate-300">
          Try all tools →
        </Link>
      </div>
    </div>
  );

  const mediaContent = () => (
    <div className="relative h-full min-h-[280px] w-full bg-slate-900">
      {mediaState === "video" && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-contain"
          onError={() => setMediaState("gif")}
        >
          <source src="/hero-demo.webm" type="video/webm" />
          <source src="/hero-demo.mp4" type="video/mp4" />
        </video>
      )}
      {mediaState === "gif" && (
        <Image
          src="/hero-demo.gif"
          alt="Dockera in action"
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1024px"
          loading="lazy"
          decoding="async"
          unoptimized
          onError={() => setMediaState("fallback")}
        />
      )}
    </div>
  );

  return (
    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xl dark:border-neutral-700 dark:bg-black">
      {toolbar}
      <div className="overflow-hidden border-t border-slate-200 dark:border-neutral-700">
        {mediaState === "fallback" ? fallbackContent() : mediaContent()}
      </div>
    </div>
  );
}
