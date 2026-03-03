"use client";

import Link from "next/link";
import { useCallback } from "react";

type PremiumFeatureModalProps = {
  open: boolean;
  onClose: () => void;
  featureName?: string;
};

export function PremiumFeatureModal({
  open,
  onClose,
  featureName = "This feature",
}: PremiumFeatureModalProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-modal-title"
      aria-describedby="premium-modal-desc"
      onKeyDown={handleKeyDown}
    >
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        <h2 id="premium-modal-title" className="text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
          Pro feature
        </h2>
        <p id="premium-modal-desc" className="mt-2 text-slate-600 dark:text-slate-400">
          {featureName} is available for Pro users. Upgrade to process multiple files and get unlimited access.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/pricing"
            className="order-1 rounded-md bg-slate-900 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 sm:order-2"
          >
            View plans
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="order-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 sm:order-1"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
