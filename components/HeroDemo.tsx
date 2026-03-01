"use client";

import Image from "next/image";
import Link from "next/link";
import { FileUp, Loader2, Download, ImageIcon, FileText } from "lucide-react";
import { useState } from "react";

/** Add public/hero-demo.mp4, hero-demo.webm, or hero-demo.gif for custom demo. */
export function HeroDemo() {
  const [mediaState, setMediaState] = useState<"video" | "gif" | "fallback">("video");

  const toolbar = (
    <div className="mockup-browser-toolbar flex items-center justify-center px-3 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
      <div className="input input-sm w-full max-w-md rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-center text-xs sm:text-sm">
        docera.com/tools/resize-image
      </div>
    </div>
  );

  const fallbackContent = () => (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 min-h-[280px] flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Upload card */}
        <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800/50 p-4 sm:p-5 flex flex-col items-center justify-center gap-3 min-h-[120px] animate-[float_2.5s_ease-in-out_infinite]">
          <div className="rounded-lg bg-slate-100 dark:bg-slate-700 p-3">
            <FileUp className="h-8 w-8 sm:h-10 sm:w-10 text-slate-600 dark:text-slate-400" />
          </div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Upload image</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">JPEG, PNG, WebP</span>
        </div>

        {/* Process */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 sm:p-5 flex flex-col items-center justify-center gap-3 min-h-[120px]">
          <div className="rounded-lg bg-slate-100 dark:bg-slate-700 p-3">
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-slate-600 dark:text-slate-400 animate-spin" />
          </div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Processing in browser</span>
          <div className="w-full max-w-[120px] h-1.5 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-slate-600 dark:bg-slate-400 animate-pulse" />
          </div>
        </div>

        {/* Result */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 sm:p-5 flex flex-col items-center justify-center gap-3 min-h-[120px] animate-[float_2.5s_ease-in-out_infinite_0.5s]">
          <div className="rounded-lg bg-slate-100 dark:bg-slate-700 p-3">
            <Download className="h-8 w-8 sm:h-10 sm:w-10 text-slate-600 dark:text-slate-400" />
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
        <Link href="/" className="font-medium text-slate-700 dark:text-slate-300 hover:underline">
          Try all tools →
        </Link>
      </div>
    </div>
  );

  const mediaContent = () => (
    <div className="relative w-full h-full min-h-[280px] bg-slate-900">
      {mediaState === "video" && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-contain"
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
    <div className="mockup-browser border border-slate-200 dark:border-slate-700 w-full bg-slate-50 dark:bg-slate-900 shadow-xl">
      {toolbar}
      <div className="border-t border-slate-200 dark:border-slate-700 overflow-hidden">
        {mediaState === "fallback" ? fallbackContent() : mediaContent()}
      </div>
    </div>
  );
}
