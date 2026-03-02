"use client";

import { useCallback, useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { Upload, Download } from "lucide-react";

const TOOL_ID = "pdf-to-jpg";
const DAILY_LIMIT = 5;

// Use legacy build for browser - avoids worker complexity
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function PdfToJpgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<{ blob: Blob; url: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(2);
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

  const handleFileSelect = useCallback((f: File | null) => {
    setError(null);
    setResults((prev) => {
      prev.forEach((r) => URL.revokeObjectURL(r.url));
      return [];
    });
    setFile(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f?.type === "application/pdf") handleFileSelect(f);
      else setError("Please select a PDF file.");
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const runConvert = useCallback(async () => {
    if (!file) {
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
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const baseName = file.name.replace(/\.pdf$/i, "");
      const out: { blob: Blob; url: string; name: string }[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not available");
        await page.render({
          canvasContext: ctx,
          viewport,
          canvas,
        }).promise;

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, "image/jpeg", 0.92);
        });
        if (!blob) throw new Error("Failed to create JPG");
        const name = numPages > 1 ? `${baseName}_page${i}.jpg` : `${baseName}.jpg`;
        out.push({ blob, url: URL.createObjectURL(blob), name });
      }

      setResults(out);
      setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, scale, isPremiumUser, usage.allowed, userId]);

  const handleDownload = useCallback((r: { blob: Blob; url: string; name: string }) => {
    const a = document.createElement("a");
    a.href = r.url;
    a.download = r.name;
    a.click();
  }, []);

  const handleDownloadAll = useCallback(() => {
    results.forEach((r, i) => {
      setTimeout(() => handleDownload(r), i * 100);
    });
  }, [results, handleDownload]);

  return (
    <section className="space-y-6" aria-labelledby="pdf-to-jpg-heading">
      <h2 id="pdf-to-jpg-heading" className="sr-only">
        PDF to JPG
      </h2>

      <div
        className={`rounded-xl border-2 border-dashed bg-slate-50 p-8 transition-colors dark:bg-slate-800/50 ${
          isDragging ? "border-slate-400 bg-slate-100 dark:bg-slate-700" : "border-slate-200 dark:border-slate-600"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <label className="flex cursor-pointer flex-col items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-700">
            <Upload className="h-6 w-6 text-slate-500" aria-hidden />
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Drag & drop a PDF, or click to browse
          </span>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
          />
        </label>
        {file && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-4 py-2 shadow-sm dark:bg-slate-700">
            <span className="max-w-[200px] truncate text-sm text-slate-700 dark:text-slate-300">{file.name}</span>
            <button
              type="button"
              onClick={() => handleFileSelect(null)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Replace
            </button>
          </div>
        )}
      </div>

      {file && (
        <>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Resolution (scale): {scale}x
            </label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.5}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full max-w-xs"
            />
          </div>
          <button
            type="button"
            onClick={runConvert}
            disabled={isProcessing}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isProcessing ? "Converting…" : "Convert to JPG"}
          </button>
        </>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300" role="alert">
          {error}
        </p>
      )}

      {results.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-600 dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
            Converted ({results.length} page{results.length > 1 ? "s" : ""})
          </h3>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-600 dark:bg-slate-700/50"
              >
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {r.name} · {formatBytes(r.blob.size)}
                </span>
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
            {results.length > 1 && (
              <button
                type="button"
                onClick={handleDownloadAll}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download all
              </button>
            )}
          </div>
        </div>
      )}

      <LimitReachedModal open={showLimitModal} onClose={() => setShowLimitModal(false)} toolName="PDF to JPG" />
    </section>
  );
}
