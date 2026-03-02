"use client";

import { useCallback, useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { Upload, Download, GripVertical } from "lucide-react";

const TOOL_ID = "merge-pdf";
const DAILY_LIMIT = 5;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MergePdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [usage, setUsage] = useState({ allowed: true, count: 0, limit: DAILY_LIMIT });
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/premium-status", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setIsPremiumUser(Boolean(data.premium));
        setUserId(data.userId ?? null);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, false, userId));
  }, [userId]);

  const handleFileSelect = useCallback((fileList: File[]) => {
    setError(null);
    if (result) {
      URL.revokeObjectURL(result.url);
      setResult(null);
    }
    const valid = Array.from(fileList).filter((f) => f.type === "application/pdf");
    setFiles(valid);
  }, [result]);

  const moveFile = useCallback((from: number, to: number) => {
    if (to < 0 || to >= files.length) return;
    setFiles((prev) => {
      const next = [...prev];
      const [removed] = next.splice(from, 1);
      next.splice(to, 0, removed!);
      return next;
    });
  }, [files.length]);

  const removeFile = useCallback((i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }, []);

  const runMerge = useCallback(async () => {
    if (files.length < 2) {
      setError("Please add at least 2 PDF files.");
      return;
    }
    if (!isPremiumUser && !usage.allowed) {
      setShowLimitModal(true);
      return;
    }

    setIsProcessing(true);
    setError(null);
    if (result) {
      URL.revokeObjectURL(result.url);
      setResult(null);
    }

    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const pdfBytes = await merged.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      setResult({ blob, url: URL.createObjectURL(blob) });
      setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Merge failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, result, isPremiumUser, usage.allowed, userId]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = "merged.pdf";
    a.click();
  }, [result]);

  return (
    <section className="space-y-6" aria-labelledby="merge-pdf-heading">
      <h2 id="merge-pdf-heading" className="sr-only">
        Merge PDF
      </h2>

      <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 dark:border-slate-600 dark:bg-slate-800/50">
        <label className="flex cursor-pointer flex-col items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-700">
            <Upload className="h-6 w-6 text-slate-500" aria-hidden />
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Add PDF files (drag to reorder)
          </span>
          <input
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect([...files, ...Array.from(e.target.files ?? [])])}
          />
        </label>
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm dark:bg-slate-700"
              >
                <span className="text-slate-400" aria-hidden>
                  <GripVertical className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-slate-700 dark:text-slate-300">{f.name}</span>
                <span className="text-xs text-slate-500">{formatBytes(f.size)}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-sm font-medium text-slate-600 hover:text-red-600 dark:text-slate-400"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <label className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                Add more
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileSelect([...files, ...Array.from(e.target.files ?? [])])}
                />
              </label>
              {files.length >= 2 && (
                <button
                  type="button"
                  onClick={runMerge}
                  disabled={isProcessing}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  {isProcessing ? "Merging…" : "Merge PDFs"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-600 dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Merged PDF</h3>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-300">{formatBytes(result.blob.size)}</span>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download
            </button>
          </div>
        </div>
      )}

      <LimitReachedModal open={showLimitModal} onClose={() => setShowLimitModal(false)} toolName="merge PDF" />
    </section>
  );
}
