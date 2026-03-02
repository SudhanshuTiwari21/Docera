"use client";

import { useCallback, useEffect, useState } from "react";
import {
  resizeImage,
  compressImage,
  smartOptimizeImage,
  type SmartOptimizeResult,
} from "@/lib/imageOptimizer";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { Upload, Maximize2, Zap, Sparkles } from "lucide-react";

const TOOL_ID = "smart-image-optimizer";
const DAILY_LIMIT = 5;

export type SmartImageOptimizerMode = "resize" | "compress" | "smart";

export type SmartImageOptimizerProps = {
  defaultMode?: SmartImageOptimizerMode;
  defaultTargetKb?: number;
  seoDescription?: string;
  heading?: string;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function SmartImageOptimizer({
  defaultMode = "smart",
  defaultTargetKb = 100,
  seoDescription,
  heading = "Smart Image Optimizer",
}: SmartImageOptimizerProps) {
  const [mode, setMode] = useState<SmartImageOptimizerMode>(defaultMode);
  const [file, setFile] = useState<File | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number } | null>(null);
  const [result, setResult] = useState<{
    blob: Blob;
    url: string;
    smartMeta?: SmartOptimizeResult;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Resize mode
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);

  // Compress mode
  const [quality, setQuality] = useState(0.8);

  // Smart mode
  const [targetKb, setTargetKb] = useState(defaultTargetKb);

  // Usage limits
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

  const resetResult = useCallback(() => {
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
    setError(null);
  }, [result]);

  const handleFileSelect = useCallback((f: File | null) => {
    resetResult();
    if (!f) {
      setFile(null);
      setOriginalDimensions(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      setError("Please select an image (JPEG, PNG, WebP, etc.).");
      setFile(null);
      return;
    }
    setFile(f);
    setError(null);
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ w: img.naturalWidth, h: img.naturalHeight });
      setResizeWidth(img.naturalWidth);
      setResizeHeight(img.naturalHeight);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  }, [resetResult]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFileSelect(f);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const runOptimization = useCallback(async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    if (!isPremiumUser && !usage.allowed) {
      setShowLimitModal(true);
      return;
    }

    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      let blob: Blob;
      let smartMeta: SmartOptimizeResult | undefined;

      if (mode === "resize") {
        blob = await resizeImage(file, {
          width: resizeWidth,
          height: resizeHeight,
          maintainAspectRatio: maintainAspect,
        });
      } else if (mode === "compress") {
        blob = await compressImage(file, { quality });
      } else {
        const res = await smartOptimizeImage(file, targetKb);
        blob = res.blob;
        smartMeta = res;
      }

      if (!isPremiumUser) {
        setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
      }

      setResult({
        blob,
        url: URL.createObjectURL(blob),
        smartMeta,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  }, [
    file,
    mode,
    resizeWidth,
    resizeHeight,
    maintainAspect,
    quality,
    targetKb,
    isPremiumUser,
    usage.allowed,
    userId,
    resetResult,
  ]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}-optimized.jpg`;
    a.click();
  }, [result, file]);

  const modes: { id: SmartImageOptimizerMode; label: string; icon: React.ReactNode; recommended?: boolean }[] = [
    { id: "resize", label: "Resize (Dimensions)", icon: <Maximize2 className="h-4 w-4" aria-hidden /> },
    { id: "compress", label: "Compress (Quality)", icon: <Zap className="h-4 w-4" aria-hidden /> },
    { id: "smart", label: "Smart Optimize (Exact KB)", icon: <Sparkles className="h-4 w-4" aria-hidden />, recommended: true },
  ];

  return (
    <section
      className="space-y-6"
      aria-labelledby="smart-optimizer-heading"
    >
      <h2 id="smart-optimizer-heading" className="sr-only">
        {heading}
      </h2>

      {seoDescription && (
        <p className="text-sm text-slate-600">{seoDescription}</p>
      )}

      {/* Upload Area */}
      <div
        className={`rounded-xl border-2 border-dashed bg-slate-50 p-8 transition-colors ${
          isDragging ? "border-slate-400 bg-slate-100" : "border-slate-200"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <label className="flex cursor-pointer flex-col items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <Upload className="h-6 w-6 text-slate-500" aria-hidden />
          </span>
          <span className="text-sm font-medium text-slate-700">
            Drag & drop an image, or click to browse
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
          />
        </label>
        {file && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
            <span className="text-sm text-slate-700 truncate max-w-[200px]">{file.name}</span>
            <span className="text-sm text-slate-500">
              {formatBytes(file.size)}
              {originalDimensions && ` · ${originalDimensions.w}×${originalDimensions.h}`}
            </span>
            <button
              type="button"
              onClick={() => handleFileSelect(null)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Replace
            </button>
          </div>
        )}
      </div>

      {/* Mode Tabs */}
      <div role="tablist" aria-label="Optimization mode" className="flex gap-1 rounded-lg bg-slate-100 p-1">
        {modes.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            aria-controls={`panel-${m.id}`}
            id={`tab-${m.id}`}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              mode === m.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {m.icon}
            {m.label}
            {m.recommended && (
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-700">
                Recommended
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Controls Panel */}
      <div
        id={`panel-${mode}`}
        role="tabpanel"
        aria-labelledby={`tab-${mode}`}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {mode === "resize" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Dimensions</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="resize-width" className="mb-1 block text-sm text-slate-600">
                  Width (px)
                </label>
                <input
                  id="resize-width"
                  type="number"
                  min={1}
                  max={8000}
                  value={resizeWidth}
                  onChange={(e) => setResizeWidth(Number(e.target.value) || 1)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="resize-height" className="mb-1 block text-sm text-slate-600">
                  Height (px)
                </label>
                <input
                  id="resize-height"
                  type="number"
                  min={1}
                  max={8000}
                  value={resizeHeight}
                  onChange={(e) => setResizeHeight(Number(e.target.value) || 1)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={maintainAspect}
                onChange={(e) => setMaintainAspect(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-600">Maintain aspect ratio</span>
            </label>
          </div>
        )}

        {mode === "compress" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Quality</h3>
            <div>
              <label htmlFor="quality-slider" className="mb-2 block text-sm text-slate-600">
                JPEG quality: {(quality * 100).toFixed(0)}%
              </label>
              <input
                id="quality-slider"
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}

        {mode === "smart" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Target file size</h3>
            <div>
              <label htmlFor="target-kb" className="mb-1 block text-sm text-slate-600">
                Target (KB)
              </label>
              <input
                id="target-kb"
                type="number"
                min={10}
                max={5000}
                value={targetKb}
                onChange={(e) => setTargetKb(Number(e.target.value) || 100)}
                className="w-full max-w-[180px] rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={runOptimization}
          disabled={!file || isProcessing}
          className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {isProcessing
            ? "Optimizing…"
            : mode === "smart"
              ? `Optimize to ${targetKb}KB`
              : "Optimize Image"}
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {/* Results Panel */}
      {result && file && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Results</h3>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Original</span>
                <span>{formatBytes(file.size)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Optimized</span>
                <span>{formatBytes(result.blob.size)}</span>
              </div>
              {result.smartMeta && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Dimensions</span>
                    <span>{result.smartMeta.finalWidth}×{result.smartMeta.finalHeight}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Quality used</span>
                    <span>{(result.smartMeta.qualityUsed * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-emerald-600">
                    <span>Reduction</span>
                    <span>{result.smartMeta.reductionPercent}%</span>
                  </div>
                </>
              )}
              {!result.smartMeta && file.size > 0 && (
                <div className="flex justify-between text-sm font-medium text-emerald-600">
                  <span>Reduction</span>
                  <span>
                    {Math.round(((file.size - result.blob.size) / file.size) * 100)}%
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.url}
                alt="Optimized preview"
                className="max-h-48 rounded-lg border border-slate-200 object-contain"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Download
                </button>
                <button
                  type="button"
                  onClick={() => { resetResult(); handleFileSelect(null); }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust Section */}
      <p className="flex items-center gap-2 text-sm text-slate-500">
        <span aria-hidden>🔒</span>
        Processed entirely in your browser. No uploads.
      </p>

      <LimitReachedModal
        open={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        toolName="image optimization"
      />
    </section>
  );
}
