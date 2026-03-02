"use client";

import { useCallback, useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { jsPDF } from "jspdf";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { Upload, Download } from "lucide-react";

const TOOL_ID = "pdf-compressor";
const DAILY_LIMIT = 5;

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PdfCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState(0.7);
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
    if (result) {
      URL.revokeObjectURL(result.url);
      setResult(null);
    }
    setFile(f);
  }, [result]);

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

  const runCompress = useCallback(async () => {
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
    if (result) {
      URL.revokeObjectURL(result.url);
      setResult(null);
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const doc = new jsPDF({ unit: "pt", format: "a4" });

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
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

        const imgData = canvas.toDataURL("image/jpeg", quality);
        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const imgW = viewport.width;
        const imgH = viewport.height;
        const ratio = Math.min(pageW / imgW, pageH / imgH);
        const w = imgW * ratio;
        const h = imgH * ratio;

        if (i > 1) doc.addPage();
        doc.addImage(imgData, "JPEG", 0, 0, w, h);
      }

      const blob = doc.output("blob");
      setResult({ blob, url: URL.createObjectURL(blob) });
      setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Compression failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, quality, result, isPremiumUser, usage.allowed, userId]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = (file?.name?.replace(/\.pdf$/i, "") ?? "document") + "_compressed.pdf";
    a.click();
  }, [result, file?.name]);

  return (
    <section className="space-y-6" aria-labelledby="pdf-compressor-heading">
      <h2 id="pdf-compressor-heading" className="sr-only">
        Compress PDF
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
            <span className="text-sm text-slate-500">{formatBytes(file.size)}</span>
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
              Compression: {quality < 0.5 ? "High (smaller)" : quality < 0.8 ? "Medium" : "Light (better quality)"}
            </label>
            <input
              type="range"
              min={0.3}
              max={0.95}
              step={0.05}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full max-w-xs"
            />
          </div>
          <button
            type="button"
            onClick={runCompress}
            disabled={isProcessing}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isProcessing ? "Compressing…" : "Compress PDF"}
          </button>
        </>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300" role="alert">
          {error}
        </p>
      )}

      {result && file && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-600 dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Compressed</h3>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {formatBytes(file.size)} → {formatBytes(result.blob.size)}
            </span>
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

      <LimitReachedModal open={showLimitModal} onClose={() => setShowLimitModal(false)} toolName="PDF compressor" />
    </section>
  );
}
