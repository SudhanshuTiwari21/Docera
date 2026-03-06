"use client";

import { useCallback, useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { Upload, Download } from "lucide-react";

const TOOL_ID = "split-pdf";
const DAILY_LIMIT = 5;

async function getSplitPreviewUrls(file: File): Promise<{ first: string; last: string } | null> {
  try {
    const pdfjs = await import("pdfjs-dist");
    const anyPdf = pdfjs as any;
    if (typeof window !== "undefined") {
      anyPdf.GlobalWorkerOptions.workerSrc =
        `https://cdn.jsdelivr.net/npm/pdfjs-dist@${anyPdf.version}/build/pdf.worker.min.mjs`;
    }
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await anyPdf.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    if (numPages < 1) return null;
    const scale = 0.5;
    const renderPage = async (pageNum: number): Promise<string> => {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "";
      await page.render({ canvasContext: ctx, viewport, canvas }).promise;
      return canvas.toDataURL("image/jpeg", 0.8);
    };
    const [first, last] = await Promise.all([
      renderPage(1),
      numPages > 1 ? renderPage(numPages) : renderPage(1),
    ]);
    return { first, last };
  } catch {
    return null;
  }
}

function SplitPdfPreview({ file }: { file: File }) {
  const [preview, setPreview] = useState<{ first: string; last: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    getSplitPreviewUrls(file)
      .then((p) => {
        if (!cancelled && p) setPreview(p);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [file]);

  if (!preview) {
    return <p className="text-xs text-slate-500 dark:text-slate-400">Loading preview…</p>;
  }

  return (
    <div className="flex gap-4">
      <div>
        <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">First page</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview.first}
          alt="First page"
          className="max-h-32 rounded border border-slate-200 object-contain dark:border-neutral-600"
        />
      </div>
      {preview.first !== preview.last && (
        <div>
          <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">Last page</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview.last}
            alt="Last page"
            className="max-h-32 rounded border border-slate-200 object-contain dark:border-neutral-600"
          />
        </div>
      )}
    </div>
  );
}

export type SplitMode = "all" | "range" | "single";

export function SplitPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<{ blob: Blob; url: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitMode, setSplitMode] = useState<SplitMode>("all");
  const [pageRange, setPageRange] = useState("1");
  const [numPages, setNumPages] = useState<number | null>(null);
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

  const handleFileSelect = useCallback(async (f: File | null) => {
    setError(null);
    setResults((prev) => {
      prev.forEach((r) => URL.revokeObjectURL(r.url));
      return [];
    });
    setFile(f);
    setNumPages(null);
    if (!f) return;
    try {
      const bytes = await f.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      setNumPages(pdf.getPageCount());
    } catch {
      setNumPages(null);
    }
  }, []);

  const parseRange = (s: string, max: number): number[] => {
    const out: number[] = [];
    const parts = s.split(/[,\s]+/);
    for (const p of parts) {
      if (p.includes("-")) {
        const [a, b] = p.split("-").map((n) => parseInt(n.trim(), 10));
        if (!isNaN(a!) && !isNaN(b!)) {
          for (let i = Math.max(1, a!); i <= Math.min(max, b!); i++) out.push(i);
        }
      } else {
        const n = parseInt(p, 10);
        if (!isNaN(n) && n >= 1 && n <= max) out.push(n);
      }
    }
    return Array.from(new Set(out)).sort((a, b) => a - b);
  };

  const runSplit = useCallback(async () => {
    if (!file || !numPages) {
      setError("Please select a PDF file.");
      return;
    }
    if (!isPremiumUser && !usage.allowed) {
      setShowLimitModal(true);
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResults((prev) => {
      prev.forEach((r) => URL.revokeObjectURL(r.url));
      return [];
    });

    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const baseName = file.name.replace(/\.pdf$/i, "");
      const out: { blob: Blob; url: string; name: string }[] = [];

      let indices: number[];
      if (splitMode === "all") {
        indices = Array.from({ length: numPages }, (_, i) => i);
      } else {
        indices = parseRange(pageRange, numPages).map((p) => p - 1);
      }

      const onePerPage = splitMode === "all" || indices.length <= 1;
      if (onePerPage) {
        for (const i of indices) {
          const doc = await PDFDocument.create();
          const [page] = await doc.copyPages(src, [i]);
          doc.addPage(page);
          const pdfBytes = await doc.save();
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
          out.push({
            blob,
            url: URL.createObjectURL(blob),
            name: `${baseName}_page${i + 1}.pdf`,
          });
        }
      } else {
        const doc = await PDFDocument.create();
        const pages = await doc.copyPages(src, indices);
        pages.forEach((p) => doc.addPage(p));
        const pdfBytes = await doc.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
        out.push({ blob, url: URL.createObjectURL(blob), name: `${baseName}_split.pdf` });
      }

      setResults(out);
      setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Split failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, numPages, splitMode, pageRange, isPremiumUser, usage.allowed, userId]);

  const handleDownload = useCallback((r: { blob: Blob; url: string; name: string }) => {
    const a = document.createElement("a");
    a.href = r.url;
    a.download = r.name;
    a.click();
  }, []);

  return (
    <section className="space-y-6" aria-labelledby="split-pdf-heading">
      <h2 id="split-pdf-heading" className="sr-only">
        Split PDF
      </h2>

      <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 dark:border-neutral-600 dark:bg-neutral-900/50">
        <label className="flex cursor-pointer flex-col items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-700">
            <Upload className="h-6 w-6 text-slate-500" aria-hidden />
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Select a PDF to split
          </span>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
          />
        </label>
        {file && numPages !== null && (
          <div className="mt-4 space-y-3 rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-slate-700">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm text-slate-700 dark:text-slate-300">{file.name}</span>
              <span className="text-sm text-slate-500">{numPages} page(s)</span>
              <button
                type="button"
                onClick={() => handleFileSelect(null)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                Replace
              </button>
            </div>
            <div className="border-t border-slate-200 pt-3 text-xs text-slate-600 dark:border-neutral-600 dark:text-slate-300">
              <p className="mb-2 font-medium">Preview before split</p>
              <SplitPdfPreview file={file} />
            </div>
          </div>
        )}
      </div>

      {file && numPages !== null && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Split mode</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all" as SplitMode, label: "Each page as separate PDF" },
                { id: "range" as SplitMode, label: "Extract page range" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSplitMode(m.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                    splitMode === m.id
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          {splitMode === "range" && (
            <div>
              <label htmlFor="page-range" className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
                Page(s), e.g. 1, 3-5, 7
              </label>
              <input
                id="page-range"
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="1, 3-5, 7"
                className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-slate-100"
              />
            </div>
          )}
          <button
            type="button"
            onClick={runSplit}
            disabled={isProcessing}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isProcessing ? "Splitting…" : "Split PDF"}
          </button>
        </>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300" role="alert">
          {error}
        </p>
      )}

      {results.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-neutral-600 dark:bg-neutral-900">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
            Split ({results.length} file{results.length > 1 ? "s" : ""})
          </h3>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-neutral-600 dark:bg-slate-700/50"
              >
                <span className="text-sm text-slate-700 dark:text-slate-300">{r.name}</span>
                <button
                  type="button"
                  onClick={() => handleDownload(r)}
                  className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <LimitReachedModal open={showLimitModal} onClose={() => setShowLimitModal(false)} toolName="split PDF" />
    </section>
  );
}
