"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

function shouldHideFab(pathname: string | null): boolean {
  if (!pathname) return true;
  if (pathname.startsWith("/chat")) return true;
  if (pathname.startsWith("/login")) return true;
  if (pathname.startsWith("/signup")) return true;
  if (pathname.startsWith("/pricing")) return true;
  return false;
}

/**
 * Floating DocChat entry point — all pages except chat, auth, and pricing.
 */
export function DocChatFab() {
  const pathname = usePathname();

  if (shouldHideFab(pathname)) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-3 z-[100] flex w-[min(16rem,calc(100%-1.5rem))] flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:w-auto sm:max-w-[16rem]">
      {/* Speech bubble — rotates between two lines; full card is the link */}
      <Link
        href="/chat"
        className="pointer-events-auto flex max-w-full flex-col items-end gap-2 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
        aria-label="Open DocChat — ask questions about your PDF"
      >
        <div
          className="animate-docchat-bubble max-w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-left text-xs leading-snug text-slate-800 shadow-lg dark:border-neutral-600 dark:bg-neutral-900 dark:text-slate-100"
          role="status"
        >
          <p className="font-medium text-emerald-700 dark:text-emerald-400">DocChat</p>
          <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 sm:text-xs">
            Any question about your PDF?
          </p>
          <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 sm:text-xs">
            Prepare for your exam using DocChat.
          </p>
        </div>

        <div className="relative overflow-visible">
          <span
            className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-emerald-500/30 dark:bg-emerald-400/25"
            style={{ animationDuration: "2.2s" }}
            aria-hidden
          />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400/40 transition hover:bg-emerald-700 hover:ring-emerald-300/50 dark:bg-emerald-600 dark:ring-emerald-500/40 dark:hover:bg-emerald-500 sm:h-14 sm:w-14">
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden />
          </span>
        </div>
      </Link>
    </div>
  );
}
