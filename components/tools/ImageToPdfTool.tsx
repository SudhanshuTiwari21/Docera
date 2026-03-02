"use client";

import { useCallback, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { Upload, Download } from "lucide-react";

const TOOL_ID = "image-to-pdf";
const DAILY_LIMIT = 10;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImageToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
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

  const handleFileSelect = useCallback((fileList: File[] | null) => {
    setError(null);
    if (result) {
      URL.revokeObjectURL(result.url);
      setResult(null);
    }
    if (!fileList?.length) {
      setFiles([]);
      return;
    }
    const valid = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    setFiles(valid);
    if (valid.length !== fileList.length) {
      setError("Some files were skipped. Please use image files (JPG, PNG, WebP, GIF, BMP, TIF).");
    }
  }, [result]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileSelect(Array.from(e.dataTransfer.files ?? []));
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const runConvert = useCallback(async () => {
    if (!files.length) {
      setError("Please select one or more images.");
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
      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: "a4",
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const maxW = pageW - margin * 2;
      const maxH = pageH - margin * 2;

      for (let i = 0; i < files.length; i++) {
        const file = files[i]!;
        const url = URL.createObjectURL(file);
        const img = await loadImage(url);
        URL.revokeObjectURL(url);

        let imgW = img.naturalWidth;
        let imgH = img.naturalHeight;
        if (imgW > maxW || imgH > maxH) {
          const r = Math.min(maxW / imgW, maxH / imgH);
          imgW *= r;
          imgH *= r;
        }
        const x = margin + (maxW - imgW) / 2;
        const y = margin + (maxH - imgH) / 2;

        let fmt: "JPEG" | "PNG" | "WEBP" = "JPEG";
        if (file.type === "image/png") fmt = "PNG";
        else if (file.type === "image/webp") fmt = "WEBP";
        if (i > 0) pdf.addPage();
        pdf.addImage(img, fmt, x, y, imgW, imgH);
      }

      const blob = pdf.output("blob");
      setResult({ blob, url: URL.createObjectURL(blob) });
      setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, orientation, result, isPremiumUser, usage.allowed, userId]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = "images.pdf";
    a.click();
  }, [result]);

  return (
    <section className="space-y-6" aria-labelledby="image-to-pdf-heading">
      <h2 id="image-to-pdf-heading" className="sr-only">
        Image to PDF
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
            Drag & drop images, or click to browse
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">JPG, PNG, WebP, GIF, BMP, TIF</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(Array.from(e.target.files ?? []))}
          />
        </label>
        {files.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-4 py-2 shadow-sm dark:bg-slate-700">
            <span className="text-sm text-slate-700 dark:text-slate-300">{files.length} image(s) selected</span>
            <button
              type="button"
              onClick={() => handleFileSelect(null)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Page orientation
            </label>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as "portrait" | "landscape")}
              className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
          <button
            type="button"
            onClick={runConvert}
            disabled={isProcessing}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isProcessing ? "Creating PDF…" : "Convert to PDF"}
          </button>
        </>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-600 dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">PDF created</h3>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-300">{formatBytes(result.blob.size)}</span>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download PDF
            </button>
          </div>
        </div>
      )}

      <LimitReachedModal open={showLimitModal} onClose={() => setShowLimitModal(false)} toolName="image to PDF" />
    </section>
  );
}
