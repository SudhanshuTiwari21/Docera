"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  resizeImage,
  compressImage,
  smartOptimizeImage,
  examOptimizeImage,
  type SmartOptimizeResult,
} from "@/lib/imageOptimizer";
import { EXAM_PRESETS, CUSTOM_PRESET } from "@/lib/examPresets";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { PremiumFeatureModal } from "@/components/ui/PremiumFeatureModal";
import { Upload, Maximize2, Zap, Sparkles, GraduationCap, Lock, LockOpen, ImageIcon } from "lucide-react";

const TOOL_ID = "smart-image-optimizer";
const DAILY_LIMIT = 5;

export type SmartImageOptimizerMode = "resize" | "compress" | "smart" | "exam";

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
  const [files, setFiles] = useState<File[]>([]);
  const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number } | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{
    blob: Blob;
    url: string;
    smartMeta?: SmartOptimizeResult;
    file: File;
  } | null>(null);
  const [batchResults, setBatchResults] = useState<Array<{ file: File; blob: Blob; url: string; smartMeta?: SmartOptimizeResult }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [estimatedSizeKb, setEstimatedSizeKb] = useState<number | null>(null);
  const estimateAbortRef = useRef(false);

  // Resize mode
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const aspectRatioRef = useRef<number | null>(null);

  // Compress mode
  const [quality, setQuality] = useState(0.8);

  // Smart mode
  const [targetKb, setTargetKb] = useState(defaultTargetKb);
  const [smartStrategy, setSmartStrategy] = useState<"smart" | "aggressive">("smart");

  // Exam mode
  const [examPresetId, setExamPresetId] = useState<string>("");
  const [examIsSignature, setExamIsSignature] = useState(false);

  // Options
  const [stripMetadata, setStripMetadata] = useState(true);
  const [outputDpi, setOutputDpi] = useState<72 | 150 | 300>(72);

  const file = files[0] ?? null;

  // Usage limits
  const [usage, setUsage] = useState({ allowed: true, count: 0, limit: DAILY_LIMIT });
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
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

  // Real-time size estimator (debounced)
  useEffect(() => {
    if (!file || files.length > 1 || isProcessing) {
      setEstimatedSizeKb(null);
      return;
    }
    estimateAbortRef.current = false;
    const t = setTimeout(async () => {
      try {
        if (mode === "compress") {
          const blob = await compressImage(file, { quality });
          if (!estimateAbortRef.current) setEstimatedSizeKb(Math.round(blob.size / 1024));
        } else if (mode === "smart") {
          const res = await smartOptimizeImage(file, { targetKb, strategy: smartStrategy });
          if (!estimateAbortRef.current) setEstimatedSizeKb(Math.round(res.blob.size / 1024));
        } else if (mode === "exam" && examPresetId) {
          const preset = EXAM_PRESETS.find((p) => p.id === examPresetId) ?? CUSTOM_PRESET;
          const kb = examIsSignature && preset.signatureKb ? preset.signatureKb : preset.targetKb;
          const res = await examOptimizeImage(file, { width: preset.width, height: preset.height, targetKb: kb });
          if (!estimateAbortRef.current) setEstimatedSizeKb(Math.round(res.blob.size / 1024));
        } else {
          setEstimatedSizeKb(null);
        }
      } catch {
        if (!estimateAbortRef.current) setEstimatedSizeKb(null);
      }
    }, 400);
    return () => {
      estimateAbortRef.current = true;
      clearTimeout(t);
    };
  }, [file, files.length, isProcessing, mode, quality, targetKb, smartStrategy, examPresetId, examIsSignature]);

  const resetResult = useCallback(() => {
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
    batchResults.forEach((r) => URL.revokeObjectURL(r.url));
    setBatchResults([]);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(null);
    setError(null);
    setEstimatedSizeKb(null);
  }, [result, batchResults, originalUrl]);

  const handleFileSelect = useCallback(
    (f: File | File[] | null) => {
      resetResult();
      if (!f) {
        setFiles([]);
        setOriginalDimensions(null);
        return;
      }
      const fileList = Array.isArray(f) ? f : [f];
      const valid = fileList.filter((x) => x.type.startsWith("image/"));
      if (valid.length === 0) {
        setError("Please select image files (JPEG, PNG, WebP, etc.).");
        setFiles([]);
        return;
      }
      if (valid.length < fileList.length) setError("Some files were not images and were skipped.");
      else setError(null);
      // Batch processing is premium only: if multiple files and not premium, show pricing modal and keep only first
      let filesToSet: File[] = valid;
      if (valid.length > 1 && !isPremiumUser) {
        setShowPremiumModal(true);
        filesToSet = valid.slice(0, 1);
      }
      setFiles(filesToSet);
      const first = filesToSet[0];
      if (first) {
        const url = URL.createObjectURL(first);
        setOriginalUrl(url);
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ w: img.naturalWidth, h: img.naturalHeight });
          setResizeWidth(img.naturalWidth);
          setResizeHeight(img.naturalHeight);
          aspectRatioRef.current = img.naturalWidth / img.naturalHeight;
        };
        img.onerror = () => URL.revokeObjectURL(url);
        img.src = url;
      }
    },
    [resetResult, isPremiumUser]
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const items = e.dataTransfer.files;
    if (items?.length) {
      const list = Array.from(items);
      handleFileSelect(list.length > 1 ? list : list[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  // Dimension lock: when aspect ratio is locked, changing one dimension updates the other
  const updateResizeWidth = useCallback((w: number) => {
    setResizeWidth(w);
    if (maintainAspect && aspectRatioRef.current != null) {
      setResizeHeight(Math.round(w / aspectRatioRef.current));
    }
  }, [maintainAspect]);
  const updateResizeHeight = useCallback((h: number) => {
    setResizeHeight(h);
    if (maintainAspect && aspectRatioRef.current != null) {
      setResizeWidth(Math.round(h * aspectRatioRef.current));
    }
  }, [maintainAspect]);

  const runOptimization = useCallback(async () => {
    if (!files.length) {
      setError("Please select at least one image.");
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
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
    batchResults.forEach((r) => URL.revokeObjectURL(r.url));
    setBatchResults([]);

    const toProcess = files;
    const batch: Array<{ file: File; blob: Blob; url: string; smartMeta?: SmartOptimizeResult }> = [];
    let usageIncremented = false;

    try {
      for (let i = 0; i < toProcess.length; i++) {
        const f = toProcess[i];
        let blob: Blob;
        let smartMeta: SmartOptimizeResult | undefined;

        if (mode === "resize") {
          blob = await resizeImage(f, {
            width: resizeWidth,
            height: resizeHeight,
            maintainAspectRatio: maintainAspect,
          });
        } else if (mode === "compress") {
          blob = await compressImage(f, { quality });
        } else if (mode === "exam") {
          const preset = EXAM_PRESETS.find((p) => p.id === examPresetId) ?? CUSTOM_PRESET;
          const kb = examIsSignature && preset.signatureKb ? preset.signatureKb : preset.targetKb;
          const res = await examOptimizeImage(f, {
            width: preset.width,
            height: preset.height,
            targetKb: kb,
          });
          blob = res.blob;
          smartMeta = res;
        } else {
          const res = await smartOptimizeImage(f, { targetKb, strategy: smartStrategy });
          blob = res.blob;
          smartMeta = res;
        }

        if (!isPremiumUser && !usageIncremented) {
          setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
          usageIncremented = true;
        }

        batch.push({
          file: f,
          blob,
          url: URL.createObjectURL(blob),
          smartMeta,
        });
      }

      setBatchResults(batch);
      if (batch.length === 1) {
        setResult({
          blob: batch[0].blob,
          url: batch[0].url,
          smartMeta: batch[0].smartMeta,
          file: batch[0].file,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      batch.forEach((r) => URL.revokeObjectURL(r.url));
    } finally {
      setIsProcessing(false);
    }
  }, [
    files,
    mode,
    resizeWidth,
    resizeHeight,
    maintainAspect,
    quality,
    targetKb,
    smartStrategy,
    examPresetId,
    examIsSignature,
    isPremiumUser,
    usage.allowed,
    userId,
    result,
    batchResults,
  ]);

  const handleDownload = useCallback(() => {
    if (batchResults.length === 1 && result) {
      const f = result.file;
      const base = f.name.replace(/\.[^.]+$/, "");
      const a = document.createElement("a");
      a.href = result.url;
      a.download = `${base}-optimized.jpg`;
      a.click();
    } else if (batchResults.length > 1) {
      batchResults.forEach((r) => {
        const base = r.file.name.replace(/\.[^.]+$/, "");
        const a = document.createElement("a");
        a.href = r.url;
        a.download = `${base}-optimized.jpg`;
        a.click();
      });
    }
  }, [result, batchResults]);

  const handleDownloadSingle = useCallback((url: string, file: File) => {
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${base}-optimized.jpg`;
    a.click();
  }, []);

  const modes: { id: SmartImageOptimizerMode; label: string; icon: React.ReactNode; recommended?: boolean }[] = [
    { id: "exam", label: "Indian Exams", icon: <GraduationCap className="h-4 w-4" aria-hidden />, recommended: true },
    { id: "smart", label: "Smart Optimize (Exact KB)", icon: <Sparkles className="h-4 w-4" aria-hidden /> },
    { id: "resize", label: "Resize (Dimensions)", icon: <Maximize2 className="h-4 w-4" aria-hidden /> },
    { id: "compress", label: "Compress (Quality)", icon: <Zap className="h-4 w-4" aria-hidden /> },
  ];

  const selectedExamPreset = EXAM_PRESETS.find((p) => p.id === examPresetId) ?? CUSTOM_PRESET;

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

      {/* Upload Area - drag-and-drop + multi-file */}
      <div
        className={`rounded-xl border-2 border-dashed bg-slate-50 p-8 transition-colors dark:bg-slate-800/50 ${
          isDragging ? "border-slate-400 bg-slate-100 dark:border-slate-500 dark:bg-slate-700/50" : "border-slate-200 dark:border-slate-600"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <label className="flex cursor-pointer flex-col items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-700">
            <Upload className="h-6 w-6 text-slate-500 dark:text-slate-400" aria-hidden />
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Drag & drop images here, or click to browse
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {isPremiumUser ? "Single or multiple images (JPEG, PNG, WebP)" : "One image at a time (Pro: batch multiple)"}
          </span>
          <input
            type="file"
            accept="image/*"
            multiple={isPremiumUser}
            className="hidden"
            onChange={(e) => {
              const list = e.target.files ? Array.from(e.target.files) : [];
              handleFileSelect(list.length > 1 ? list : list[0] ?? null);
            }}
          />
        </label>
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.length === 1 && file ? (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-4 py-2 shadow-sm dark:bg-slate-700">
                <span className="text-sm text-slate-700 dark:text-slate-200 truncate max-w-[200px]">{file.name}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {formatBytes(file.size)}
                  {originalDimensions && ` · ${originalDimensions.w}×${originalDimensions.h}`}
                </span>
                <button
                  type="button"
                  onClick={() => handleFileSelect(null)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                >
                  Replace
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-4 py-2 shadow-sm dark:bg-slate-700">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {files.length} images selected
                </span>
                <button
                  type="button"
                  onClick={() => handleFileSelect(null)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mode Tabs */}
      <div role="tablist" aria-label="Optimization mode" className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-700">
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
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
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
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        {mode === "resize" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Dimensions</h3>
            <div className="flex items-end gap-2">
              <div className="grid flex-1 grid-cols-2 gap-4">
                <div>
                  <label htmlFor="resize-width" className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
                    Width (px)
                  </label>
                  <input
                    id="resize-width"
                    type="number"
                    min={1}
                    max={8000}
                    value={resizeWidth}
                    onChange={(e) => updateResizeWidth(Number(e.target.value) || 1)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label htmlFor="resize-height" className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
                    Height (px)
                  </label>
                  <input
                    id="resize-height"
                    type="number"
                    min={1}
                    max={8000}
                    value={resizeHeight}
                    onChange={(e) => updateResizeHeight(Number(e.target.value) || 1)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMaintainAspect(!maintainAspect)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                title={maintainAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}
                aria-label={maintainAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}
              >
                {maintainAspect ? <Lock className="h-5 w-5" aria-hidden /> : <LockOpen className="h-5 w-5" aria-hidden />}
              </button>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={maintainAspect}
                onChange={(e) => setMaintainAspect(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-600"
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">Lock aspect ratio</span>
            </label>
          </div>
        )}

        {mode === "compress" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Quality</h3>
            <div>
              <label htmlFor="quality-slider" className="mb-2 block text-sm text-slate-600 dark:text-slate-400">
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
              {estimatedSizeKb != null && file && (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Estimated output: <strong className="text-slate-700 dark:text-slate-200">~{estimatedSizeKb} KB</strong>
                </p>
              )}
            </div>
          </div>
        )}

        {mode === "exam" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Exam preset</h3>
            {/* One-click exam chips */}
            <div className="flex flex-wrap gap-2">
              {["ssc-cgl-2026", "ssc-chsl-2026", "upsc-cse-2026", "rrb-alp-2026", "ibps-po-2026"].map((id) => {
                const p = EXAM_PRESETS.find((x) => x.id === id);
                if (!p) return null;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setExamPresetId(p.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      examPresetId === p.id
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-200"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {p.label.replace(/\s*\d{4}$/, "")} · {p.targetKb}KB
                  </button>
                );
              })}
            </div>
            <div>
              <label htmlFor="exam-preset" className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
                Or select exam
              </label>
              <select
                id="exam-preset"
                value={examPresetId || "custom"}
                onChange={(e) => setExamPresetId(e.target.value === "custom" ? "" : e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              >
                <option value="custom">{CUSTOM_PRESET.label}</option>
                <optgroup label="SSC">
                  {EXAM_PRESETS.filter((p) => p.id.startsWith("ssc-")).map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Railway (RRB)">
                  {EXAM_PRESETS.filter((p) => p.id.startsWith("rrb-")).map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </optgroup>
                <optgroup label="UPSC">
                  {EXAM_PRESETS.filter((p) => p.id.startsWith("upsc-")).map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Banking">
                  {EXAM_PRESETS.filter((p) => p.id.startsWith("ibps-") || p.id.startsWith("sbi-") || p.id.startsWith("rbi-")).map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Defence & State PSC">
                  {EXAM_PRESETS.filter((p) => ["cds-", "nda-", "uppsc-", "bpsc-", "mppsc-", "rpsc-", "ctet-"].some((pre) => p.id.startsWith(pre))).map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </optgroup>
              </select>
            </div>
            {examPresetId && selectedExamPreset.id !== "custom" && (
              <>
                <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-700/50 dark:text-slate-300">
                  <span className="font-medium">Photo:</span> {selectedExamPreset.width}×{selectedExamPreset.height} px · {selectedExamPreset.targetKb} KB · JPEG
                  {selectedExamPreset.signatureKb && (
                    <> · <span className="font-medium">Signature:</span> {selectedExamPreset.signatureKb} KB</>
                  )}
                </div>
                {estimatedSizeKb != null && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Estimated output: <strong className="text-slate-700 dark:text-slate-200">~{estimatedSizeKb} KB</strong>
                  </p>
                )}
                {selectedExamPreset.signatureKb && (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={examIsSignature}
                      onChange={(e) => setExamIsSignature(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Resize for signature ({selectedExamPreset.signatureKb} KB)</span>
                  </label>
                )}
              </>
            )}
          </div>
        )}

        {mode === "smart" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Target file size</h3>
            <div>
              <label htmlFor="target-kb" className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
                Target (KB)
              </label>
              <input
                id="target-kb"
                type="number"
                min={10}
                max={5000}
                value={targetKb}
                onChange={(e) => setTargetKb(Number(e.target.value) || 100)}
                className="w-full max-w-[180px] rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              />
              {estimatedSizeKb != null && (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Estimated output: <strong className="text-slate-700 dark:text-slate-200">~{estimatedSizeKb} KB</strong>
                </p>
              )}
            </div>
            <div>
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Compression mode</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSmartStrategy("smart")}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    smartStrategy === "smart"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-200"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  Smart (prefer quality)
                </button>
                <button
                  type="button"
                  onClick={() => setSmartStrategy("aggressive")}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    smartStrategy === "aggressive"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-200"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  Aggressive (smaller file)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Options: metadata & DPI */}
        <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-slate-200 pt-4 dark:border-slate-600">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={stripMetadata}
              onChange={(e) => setStripMetadata(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-600"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">Strip metadata (recommended for govt forms)</span>
          </label>
          <div className="flex items-center gap-2">
            <label htmlFor="output-dpi" className="text-sm text-slate-600 dark:text-slate-400">Output DPI:</label>
            <select
              id="output-dpi"
              value={outputDpi}
              onChange={(e) => setOutputDpi(Number(e.target.value) as 72 | 150 | 300)}
              className="rounded-lg border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            >
              <option value={72}>72 (screen)</option>
              <option value={150}>150 (print)</option>
              <option value={300}>300 (high-res print)</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={runOptimization}
          disabled={!files.length || isProcessing || (mode === "exam" && !examPresetId)}
          className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {isProcessing
            ? files.length > 1
              ? `Optimizing ${files.length} images…`
              : "Optimizing…"
            : mode === "exam"
              ? examPresetId
                ? `Optimize for ${selectedExamPreset.label}`
                : "Select an exam preset"
              : mode === "smart"
                ? `Optimize to ${targetKb}KB`
                : "Optimize Image"}
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      {/* Results Panel - side-by-side before/after + batch */}
      {batchResults.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Results</h3>

          {batchResults.length === 1 && result && (
            <>
              <div className={`mb-4 grid gap-4 ${originalUrl ? "grid-cols-2" : "grid-cols-1"}`}>
                {originalUrl && (
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Before</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="max-h-56 w-full rounded-lg border border-slate-200 object-contain dark:border-slate-600"
                    />
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {formatBytes(result.file.size)}
                      {originalDimensions && ` · ${originalDimensions.w}×${originalDimensions.h}`}
                    </p>
                  </div>
                )}
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">After</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.url}
                    alt="Optimized"
                    className="max-h-56 w-full rounded-lg border border-slate-200 object-contain dark:border-slate-600"
                  />
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {formatBytes(result.blob.size)}
                    {result.smartMeta && ` · ${result.smartMeta.finalWidth}×${result.smartMeta.finalHeight}`}
                    {outputDpi && ` · ${outputDpi} DPI`}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                {result.smartMeta && (
                  <>
                    <span>Quality used: {(result.smartMeta.qualityUsed * 100).toFixed(0)}%</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      Reduction: {result.smartMeta.reductionPercent}%
                    </span>
                  </>
                )}
                {!result.smartMeta && result.file.size > 0 && (
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    Reduction: {Math.round(((result.file.size - result.blob.size) / result.file.size) * 100)}%
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Download
                </button>
                <button
                  type="button"
                  onClick={() => { resetResult(); handleFileSelect(null); }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                >
                  Reset
                </button>
              </div>
            </>
          )}

          {batchResults.length > 1 && (
            <ul className="space-y-3">
              {batchResults.map((r, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 dark:border-slate-600 dark:bg-slate-700/50"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ImageIcon className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
                    <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{r.file.name}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{formatBytes(r.blob.size)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(r.url, r.file)}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    Download
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                >
                  Download all
                </button>
              </li>
            </ul>
          )}
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
      <PremiumFeatureModal
        open={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        featureName="Batch processing (multiple images)"
      />
    </section>
  );
}
