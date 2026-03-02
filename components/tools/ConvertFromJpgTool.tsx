"use client";

import { useCallback, useEffect, useState } from "react";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { Upload, Download } from "lucide-react";

const TOOL_ID = "convert-from-jpg";
const DAILY_LIMIT = 20;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

function imageToPng(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    loadImage(url)
      .then((img) => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not available"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to create PNG"));
          },
          "image/png",
          1
        );
      })
      .catch(reject);
  });
}

export type ConvertFromJpgOutputFormat = "png" | "jpeg";

export function ConvertFromJpgTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState<ConvertFromJpgOutputFormat>("png");
  const [results, setResults] = useState<{ blob: Blob; url: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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

  const convertOne = useCallback(
    async (file: File): Promise<Blob> => {
      const url = URL.createObjectURL(file);
      const img = await loadImage(url);
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not available");
      ctx.drawImage(img, 0, 0);
      return new Promise((resolve, reject) => {
        const mime = outputFormat === "png" ? "image/png" : "image/jpeg";
        const ext = outputFormat === "png" ? "png" : "jpg";
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to create " + ext.toUpperCase()));
          },
          mime,
          outputFormat === "jpeg" ? 0.92 : 1
        );
      });
    },
    [outputFormat]
  );

  const handleFileSelect = useCallback((fileList: File[] | null) => {
    setError(null);
    setResults((prev) => {
      prev.forEach((r) => URL.revokeObjectURL(r.url));
      return [];
    });
    if (!fileList?.length) {
      setFiles([]);
      return;
    }
    const valid = Array.from(fileList).filter(
      (f) => f.type === "image/jpeg" || f.type === "image/jpg"
    );
    if (valid.length !== fileList.length) {
      setError("Some files were skipped. Please use JPG images only.");
    }
    setFiles(valid);
  }, []);

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
      setError("Please select one or more JPG images.");
      return;
    }
    const needed = files.length;
    if (!isPremiumUser && usage.count + needed > usage.limit) {
      setShowLimitModal(true);
      return;
    }
    setIsProcessing(true);
    setError(null);
    setResults([]);

    try {
      const out: { blob: Blob; url: string; name: string }[] = [];
      const ext = outputFormat === "png" ? "png" : "jpg";
      for (let i = 0; i < files.length; i++) {
        const blob = await convertOne(files[i]!);
        const base = files[i]!.name.replace(/\.[^.]+$/, "");
        out.push({ blob, url: URL.createObjectURL(blob), name: `${base}.${ext}` });
        if (!isPremiumUser) {
          setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
        }
      }
      setResults(out);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, convertOne, outputFormat, isPremiumUser, usage, userId]);

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
    <section className="space-y-6" aria-labelledby="convert-from-jpg-heading">
      <h2 id="convert-from-jpg-heading" className="sr-only">
        Convert from JPG
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
            Drag & drop JPG images, or click to browse
          </span>
          <input
            type="file"
            accept="image/jpeg,image/jpg"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(Array.from(e.target.files ?? []))}
          />
        </label>
        {files.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-4 py-2 shadow-sm dark:bg-slate-700">
            <span className="text-sm text-slate-700 dark:text-slate-300">{files.length} JPG file(s) selected</span>
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
              Output format
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as ConvertFromJpgOutputFormat)}
              className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>
          <button
            type="button"
            onClick={runConvert}
            disabled={isProcessing}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isProcessing ? "Converting…" : `Convert to ${outputFormat.toUpperCase()}`}
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
            Converted ({results.length} file{results.length > 1 ? "s" : ""})
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

      <LimitReachedModal open={showLimitModal} onClose={() => setShowLimitModal(false)} toolName="convert from JPG" />
    </section>
  );
}
