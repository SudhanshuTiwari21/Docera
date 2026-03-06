"use client";

import { useCallback, useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { jsPDF } from "jspdf";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { PremiumFeatureModal } from "@/components/ui/PremiumFeatureModal";
import { Upload, Download, FileText } from "lucide-react";

const TOOL_ID = "pdf-compressor";
const DAILY_LIMIT = 5;
const PAGE_BATCH_SIZE = 5;

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const COMPRESSION_LEVELS = [
  { id: "low" as const, label: "Low (best quality)", quality: 0.95 },
  { id: "medium" as const, label: "Medium", quality: 0.7 },
  { id: "high" as const, label: "High (smaller file)", quality: 0.4 },
];

/** Compress a single PDF with given quality. Govt-form-safe enforces min quality 0.75. */
async function compressPdf(
  file: File,
  quality: number,
  govtFormSafe: boolean,
  onProgress?: (page: number, total: number) => void
): Promise<Blob> {
  const effectiveQuality = govtFormSafe ? Math.max(0.75, quality) : quality;
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

    const imgData = canvas.toDataURL("image/jpeg", effectiveQuality);
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const imgW = viewport.width;
    const imgH = viewport.height;
    const ratio = Math.min(pageW / imgW, pageH / imgH);
    const w = imgW * ratio;
    const h = imgH * ratio;

    if (i > 1) doc.addPage();
    doc.addImage(imgData, "JPEG", 0, 0, w, h);
    onProgress?.(i, numPages);
    if (i % PAGE_BATCH_SIZE === 0 && i < numPages) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  return doc.output("blob");
}

/** Render first and last page of a PDF blob to thumbnail URLs. */
async function getPdfPreviewUrls(blob: Blob): Promise<{ first: string; last: string } | null> {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
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

function PdfPreviewThumbnails({ url }: { url: string }) {
  const [preview, setPreview] = useState<{ first: string; last: string } | null>(null);
  useEffect(() => {
    let revoked = false;
    fetch(url)
      .then((r) => r.blob())
      .then((blob) => (revoked ? null : getPdfPreviewUrls(blob)))
      .then((p) => {
        if (!revoked && p) setPreview(p);
      })
      .catch(() => {});
    return () => {
      revoked = true;
    };
  }, [url]);

  if (!preview) return <p className="text-sm text-slate-500 dark:text-slate-400">Loading preview…</p>;
  return (
    <div className="flex gap-4">
      <div>
        <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">First page</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview.first} alt="First page" className="max-h-32 rounded border border-slate-200 object-contain dark:border-neutral-600" />
      </div>
      {preview.first !== preview.last && (
        <div>
          <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">Last page</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview.last} alt="Last page" className="max-h-32 rounded border border-slate-200 object-contain dark:border-neutral-600" />
        </div>
      )}
    </div>
  );
}

export function PdfCompressorTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<{ blob: Blob; url: string; file: File } | null>(null);
  const [batchResults, setBatchResults] = useState<Array<{ file: File; blob: Blob; url: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{ page: number; total: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<"low" | "medium" | "high">("medium");
  const [targetKb, setTargetKb] = useState<string>("");
  const [govtFormSafe, setGovtFormSafe] = useState(true);
  const [usage, setUsage] = useState({ allowed: true, count: 0, limit: DAILY_LIMIT });
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const file = files[0] ?? null;

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

  const resetResult = useCallback(() => {
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
    batchResults.forEach((r) => URL.revokeObjectURL(r.url));
    setBatchResults([]);
  }, [result, batchResults]);

  const handleFileSelect = useCallback(
    (f: File | File[] | null) => {
      setError(null);
      resetResult();
      if (!f) {
        setFiles([]);
        return;
      }
      const list = Array.isArray(f) ? f : [f];
      const valid = list.filter((x) => x.type === "application/pdf");
      if (valid.length === 0) {
        setError("Please select PDF files.");
        return;
      }
      if (valid.length > 1 && !isPremiumUser) {
        setShowPremiumModal(true);
        setFiles(valid.slice(0, 1));
      } else {
        setFiles(valid);
      }
    },
    [resetResult, isPremiumUser]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const items = e.dataTransfer.files;
      if (!items?.length) return;
      const list = Array.from(items).filter((f) => f.type === "application/pdf");
      if (list.length === 0) {
        setError("Please drop PDF files.");
        return;
      }
      handleFileSelect(list.length > 1 ? list : list[0]);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const quality = COMPRESSION_LEVELS.find((l) => l.id === compressionLevel)?.quality ?? 0.7;

  const runCompress = useCallback(async () => {
    if (!files.length) {
      setError("Please select a PDF file.");
      return;
    }
    if (files.length > 1 && !isPremiumUser) {
      setShowPremiumModal(true);
      return;
    }
    if (!isPremiumUser && !usage.allowed) {
      setShowLimitModal(true);
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgress(null);
    resetResult();

    const targetBytes = targetKb ? Math.max(1024, parseInt(targetKb, 10) * 1024) : null;
    const toProcess = files;
    const batch: Array<{ file: File; blob: Blob; url: string }> = [];
    let usageIncremented = false;

    try {
      for (const f of toProcess) {
        let q = quality;
        let blob: Blob = await compressPdf(f, q, govtFormSafe, (page, total) => setProgress({ page, total }));
        const maxAttempts = targetBytes ? 8 : 1;

        for (let attempt = 1; attempt < maxAttempts; attempt++) {
          if (!targetBytes || blob.size <= targetBytes) break;
          q = Math.max(0.3, q - 0.1);
          blob = await compressPdf(f, q, govtFormSafe, (page, total) => setProgress({ page, total }));
        }

        if (!usageIncremented && !isPremiumUser) {
          setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
          usageIncremented = true;
        }

        batch.push({ file: f, blob, url: URL.createObjectURL(blob) });
      }

      setBatchResults(batch);
      if (batch.length === 1) {
        setResult({ blob: batch[0].blob, url: batch[0].url, file: batch[0].file });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Compression failed.");
      batch.forEach((r) => URL.revokeObjectURL(r.url));
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  }, [
    files,
    quality,
    targetKb,
    govtFormSafe,
    isPremiumUser,
    usage.allowed,
    userId,
    resetResult,
  ]);

  const handleDownload = useCallback(
    (r?: { blob: Blob; url: string; file?: File }) => {
      const res = r ?? (batchResults.length === 1 && result ? { blob: result.blob, url: result.url, file: result.file } : null);
      if (!res) return;
      const a = document.createElement("a");
      a.href = res.url;
      a.download = (res.file?.name?.replace(/\.pdf$/i, "") ?? "document") + "_compressed.pdf";
      a.click();
    },
    [result, batchResults]
  );

  const handleDownloadAll = useCallback(() => {
    batchResults.forEach((r) => {
      const a = document.createElement("a");
      a.href = r.url;
      a.download = (r.file.name.replace(/\.pdf$/i, "") ?? "document") + "_compressed.pdf";
      a.click();
    });
  }, [batchResults]);

  return (
    <section className="space-y-6" aria-labelledby="pdf-compressor-heading">
      <h2 id="pdf-compressor-heading" className="sr-only">
        Compress PDF
      </h2>

      <div
        className={`rounded-xl border-2 border-dashed bg-slate-50 p-8 transition-colors dark:bg-neutral-900/50 ${
          isDragging ? "border-slate-400 bg-slate-100 dark:bg-slate-700" : "border-slate-200 dark:border-neutral-600"
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
            Drag & drop PDFs, or click to browse
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {isPremiumUser ? "Single or multiple PDFs" : "One PDF at a time (Pro: batch multiple)"}
          </span>
          <input
            type="file"
            accept="application/pdf"
            multiple={isPremiumUser}
            className="hidden"
            onChange={(e) => {
              const list = e.target.files ? Array.from(e.target.files) : [];
              handleFileSelect(list.length > 1 ? list : list[0] ?? null);
            }}
          />
        </label>
        {files.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-4 py-2 shadow-sm dark:bg-slate-700">
            {files.length === 1 && file ? (
              <>
                <span className="max-w-[200px] truncate text-sm text-slate-700 dark:text-slate-300">{file.name}</span>
                <span className="text-sm text-slate-500">{formatBytes(file.size)}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{files.length} PDFs selected</span>
            )}
            <button
              type="button"
              onClick={() => handleFileSelect(null)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              {files.length === 1 ? "Replace" : "Clear all"}
            </button>
          </div>
        )}
      </div>

      {file && (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 sm:p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
              Compression level
            </label>
            <div className="flex flex-wrap gap-2">
              {COMPRESSION_LEVELS.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setCompressionLevel(level.id)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    compressionLevel === level.id
                      ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-neutral-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="target-kb" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Target size (optional, KB)
            </label>
            <input
              id="target-kb"
              type="number"
              min={50}
              max={10000}
              placeholder="e.g. 200"
              value={targetKb}
              onChange={(e) => setTargetKb(e.target.value)}
              className="w-full max-w-[140px] rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-neutral-600 dark:bg-slate-700 dark:text-slate-100"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Govt forms often have limits (e.g. 200 KB, 500 KB). Leave empty to use compression level only.
            </p>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={govtFormSafe}
              onChange={(e) => setGovtFormSafe(e.target.checked)}
              className="rounded border-slate-300 dark:border-neutral-600"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Govt-form-safe (preserve readability — avoids over-compression)
            </span>
          </label>

          {progress && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Processing page {progress.page} of {progress.total}…
            </p>
          )}

          <button
            type="button"
            onClick={runCompress}
            disabled={isProcessing}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isProcessing ? "Compressing…" : files.length > 1 ? `Compress ${files.length} PDFs` : "Compress PDF"}
          </button>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300" role="alert">
          {error}
        </p>
      )}

      {batchResults.length === 1 && result && file && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-neutral-600 dark:bg-neutral-900">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Compressed — preview before download</h3>
          <div className="mb-4">
            <PdfPreviewThumbnails url={result.url} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {formatBytes(file.size)} → {formatBytes(result.blob.size)}
            </span>
            <button
              type="button"
              onClick={() => handleDownload()}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download
            </button>
          </div>
        </div>
      )}

      {batchResults.length > 1 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-neutral-600 dark:bg-neutral-900">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Compressed PDFs</h3>
          <ul className="space-y-3">
            {batchResults.map((r, i) => (
              <li
                key={i}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 dark:border-neutral-600 dark:bg-slate-700/50"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
                  <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{r.file.name}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{formatBytes(r.blob.size)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownload(r)}
                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Download
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={handleDownloadAll}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
              >
                Download all
              </button>
            </li>
          </ul>
        </div>
      )}

      <LimitReachedModal open={showLimitModal} onClose={() => setShowLimitModal(false)} toolName="PDF compressor" />
      <PremiumFeatureModal
        open={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        featureName="Batch processing (multiple PDFs)"
      />
    </section>
  );
}
