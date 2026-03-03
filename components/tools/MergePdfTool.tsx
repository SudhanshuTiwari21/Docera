"use client";

import { useCallback, useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { Upload, Download, GripVertical, FileText } from "lucide-react";

const TOOL_ID = "merge-pdf";
const DAILY_LIMIT = 5;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function getFirstPagePreview(file: File): Promise<string | null> {
  try {
    const pdfjs = await import("pdfjs-dist");
    const anyPdf = pdfjs as any;
    if (typeof window !== "undefined") {
      anyPdf.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${anyPdf.version}/pdf.worker.min.js`;
    }
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await anyPdf.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 0.4 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    return canvas.toDataURL("image/jpeg", 0.9);
  } catch {
    return null;
  }
}

function MergePdfPreview({ file }: { file: File }) {
  const [thumb, setThumb] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getFirstPagePreview(file)
      .then((url) => {
        if (!cancelled && url) setThumb(url);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [file]);

  if (!thumb) {
    return <p className="text-xs text-slate-500 dark:text-slate-400">Loading preview…</p>;
  }

  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt={`Preview of ${file.name}`}
        className="h-20 w-auto rounded border border-slate-200 object-contain dark:border-slate-600"
      />
      <span className="text-xs text-slate-500 dark:text-slate-400">First page preview</span>
    </div>
  );
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
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [openPreviewIndex, setOpenPreviewIndex] = useState<number | null>(null);

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

  const handleFileSelect = useCallback(
    (fileList: File[]) => {
      setError(null);
      if (result) {
        URL.revokeObjectURL(result.url);
        setResult(null);
      }
      const valid = Array.from(fileList).filter((f) => f.type === "application/pdf");
      setFiles(valid);
      setOpenPreviewIndex(null);
    },
    [result]
  );

  const moveFile = useCallback((from: number, to: number) => {
    if (to < 0 || to >= files.length || from === to) return;
    setFiles((prev) => {
      const next = [...prev];
      const [removed] = next.splice(from, 1);
      next.splice(to, 0, removed!);
      return next;
    });
  }, [files.length]);

  const removeFile = useCallback((i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setOpenPreviewIndex((prev) => (prev === i ? null : prev));
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
            Add PDF files (drag cards to reorder)
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Order matters — first file appears first in the merged PDF.
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
                draggable
                onDragStart={() => setDragIndex(i)}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dragIndex !== null && dragIndex !== i) moveFile(dragIndex, i);
                }}
                onDragEnd={() => setDragIndex(null)}
                className="space-y-2 rounded-lg bg-white p-3 shadow-sm dark:bg-slate-700"
              >
                <div className="flex items-center gap-2">
                  <span className="cursor-grab text-slate-400" aria-hidden>
                    <GripVertical className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-slate-700 dark:text-slate-300">{f.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{formatBytes(f.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenPreviewIndex((prev) => (prev === i ? null : i))}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-xs font-medium text-slate-600 hover:text-red-600 dark:text-slate-400"
                  >
                    Remove
                  </button>
                </div>
                {openPreviewIndex === i && (
                  <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-2 dark:border-slate-600 dark:bg-slate-800/60">
                    <div className="mb-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <FileText className="h-3 w-3" aria-hidden />
                      <span>First page preview</span>
                    </div>
                    <MergePdfPreview file={f} />
                  </div>
                )}
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
