"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop as CropArea,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedCanvas } from "@/lib/cropImage";
import { canvasToBlob } from "@/lib/cropImage";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { Upload, Crop, Download, Lock, LockOpen } from "lucide-react";

const TOOL_ID = "crop-image";
const DAILY_LIMIT = 10;
const DPI_FOR_CM = 300;

/** Convert pixels to cm at given DPI (25.4 mm = 1 inch). */
function pxToCm(px: number, dpi: number): number {
  return (px / dpi) * 2.54;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number | undefined
): PixelCrop {
  if (aspect === undefined) {
    return centerCrop(
      { unit: "px", width: mediaWidth * 0.8, height: mediaHeight * 0.8 },
      mediaWidth,
      mediaHeight
    );
  }
  return centerCrop(
    makeAspectCrop(
      { unit: "px", width: 90 },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export type CropImageToolResult = {
  blob: Blob;
  url: string;
  width: number;
  height: number;
};

export type CropImageToolProps = {
  defaultAspect?: number;
  defaultOutputFormat?: "jpeg" | "png";
  /** When true, only allow preset aspects (no free crop). */
  aspectLocked?: boolean;
  /** Override aspect ratio presets (e.g. passport 35:45, 1:1 only). */
  aspectPresets?: { label: string; value: number }[];
  /** Run after crop, before blob (e.g. background whiten, shadow reduction). */
  postProcess?: (canvas: HTMLCanvasElement) => HTMLCanvasElement | Promise<HTMLCanvasElement>;
  /** Resize output to exact dimensions after postProcess. */
  outputSize?: { width: number; height: number };
  /** Extra UI below result (e.g. print sheet download). */
  renderResultExtras?: (result: CropImageToolResult) => React.ReactNode;
};

/** Exam-specific and common ratio presets. 3.5:4.5 = 35:45 for govt forms. */
const DEFAULT_ASPECT_PRESETS: { label: string; value: number | undefined }[] = [
  { label: "Free", value: undefined },
  { label: "1:1 (Square)", value: 1 },
  { label: "3.5:4.5 (Exam/Passport)", value: 35 / 45 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:2", value: 3 / 2 },
  { label: "2:3", value: 2 / 3 },
  { label: "9:16 (Story)", value: 9 / 16 },
  { label: "4:5 (Instagram)", value: 4 / 5 },
];

export function CropImageTool({
  defaultAspect,
  defaultOutputFormat = "jpeg",
  aspectLocked = false,
  aspectPresets,
  postProcess,
  outputSize,
  renderResultExtras,
}: CropImageToolProps = {}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropArea | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const presets = aspectPresets ?? DEFAULT_ASPECT_PRESETS;
  const initialAspect = defaultAspect ?? (aspectLocked ? (aspectPresets?.[0]?.value ?? 35 / 45) : undefined);
  const [aspect, setAspect] = useState<number | undefined>(initialAspect);
  const [dimensionLock, setDimensionLock] = useState(!!aspectLocked);
  const lockedByParent = !!aspectLocked;
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png">(defaultOutputFormat);
  const [quality, setQuality] = useState(0.92);
  const [result, setResult] = useState<CropImageToolResult | null>(null);
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

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const newCrop = centerAspectCrop(width, height, aspect);
      setCrop(newCrop);
      setCompletedCrop(newCrop);
    },
    [aspect]
  );

  const resetAll = useCallback(() => {
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setImgSrc(null);
    setCrop(undefined);
    setCompletedCrop(null);
    setResult(null);
    setError(null);
  }, [imgSrc, result]);

  const handleFileSelect = useCallback(
    (f: File | null) => {
      resetAll();
      if (!f) return;
      if (!f.type.startsWith("image/")) {
        setError("Please select an image (JPEG, PNG, WebP, etc.).");
        return;
      }
      setFile(f);
      setError(null);
      setImgSrc(URL.createObjectURL(f));
    },
    [resetAll]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFileSelect(f);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleAspectChange = useCallback((val: number | undefined) => {
    if (dimensionLock && val === undefined) return;
    setAspect(val);
    if (imgRef.current && val !== undefined) {
      const { width, height } = imgRef.current;
      const newCrop = centerAspectCrop(width, height, val);
      setCrop(newCrop);
      setCompletedCrop(newCrop);
    }
  }, [dimensionLock]);

  const cropDimensionsPx =
    completedCrop && imgRef.current
      ? {
          w: Math.round(completedCrop.width * (imgRef.current.naturalWidth / imgRef.current.width)),
          h: Math.round(completedCrop.height * (imgRef.current.naturalHeight / imgRef.current.height)),
        }
      : null;

  const runCrop = useCallback(async () => {
    if (!file || !completedCrop || !imgRef.current) {
      setError("Please select an image and adjust the crop area.");
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

    try {
      let canvas = await getCroppedCanvas(imgRef.current, completedCrop);
      if (postProcess) {
        canvas = await Promise.resolve(postProcess(canvas));
      }
      if (outputSize && outputSize.width > 0 && outputSize.height > 0) {
        const resized = document.createElement("canvas");
        resized.width = outputSize.width;
        resized.height = outputSize.height;
        const rctx = resized.getContext("2d");
        if (rctx) {
          rctx.drawImage(canvas, 0, 0, outputSize.width, outputSize.height);
          canvas = resized;
        }
      }
      const mime = outputFormat === "jpeg" ? "image/jpeg" : "image/png";
      const q = outputFormat === "jpeg" ? quality : 1;
      const blob = await canvasToBlob(canvas, mime, q);
      if (!blob) throw new Error("Failed to create image blob");

      const url = URL.createObjectURL(blob);
      setResult({ blob, url, width: canvas.width, height: canvas.height });
      setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Crop failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, completedCrop, outputFormat, quality, result, isPremiumUser, usage.allowed, userId, postProcess, outputSize]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const ext = outputFormat === "jpeg" ? "jpg" : "png";
    const base = file?.name?.replace(/\.[^.]+$/, "") ?? "cropped";
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}_cropped.${ext}`;
    a.click();
  }, [result, outputFormat, file?.name]);

  return (
    <section className="space-y-6" aria-labelledby="crop-tool-heading">
      <h2 id="crop-tool-heading" className="sr-only">
        Crop image
      </h2>

      {/* Upload */}
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
            <span className="max-w-[200px] truncate text-sm text-slate-700">{file.name}</span>
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

      {/* Crop area + controls */}
      {imgSrc && (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="overflow-hidden rounded-lg bg-slate-900">
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop) => setCrop(pixelCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className="max-h-[min(70vh,500px)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- ReactCrop requires img; blob URLs not supported by next/image */}
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop preview"
                style={{ maxHeight: "70vh", width: "auto" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Aspect ratio {(dimensionLock || lockedByParent) && "(locked for govt forms)"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {presets.map(({ label, value }) => {
                    const isFree = value === undefined;
                    const disabled = (dimensionLock || lockedByParent) && isFree;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleAspectChange(value)}
                        disabled={disabled}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                          disabled
                            ? "cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
                            : aspect === value
                              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
              {!lockedByParent && (
                <button
                  type="button"
                  onClick={() => {
                    const next = !dimensionLock;
                    setDimensionLock(next);
                    if (next && aspect === undefined && imgRef.current) {
                      const val = 1;
                      setAspect(val);
                      const { width, height } = imgRef.current;
                      const newCrop = centerAspectCrop(width, height, val);
                      setCrop(newCrop);
                      setCompletedCrop(newCrop);
                    }
                  }}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium ${
                    dimensionLock
                      ? "border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  }`}
                  title={dimensionLock ? "Unlock aspect ratio" : "Lock aspect ratio (govt forms)"}
                >
                  {dimensionLock ? <Lock className="h-4 w-4" aria-hidden /> : <LockOpen className="h-4 w-4" aria-hidden />}
                  <span>{dimensionLock ? "Locked" : "Lock"}</span>
                </button>
              )}
            </div>

            {cropDimensionsPx && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Crop size: <strong>{cropDimensionsPx.w} × {cropDimensionsPx.h} px</strong>
                {" "}(≈ {pxToCm(cropDimensionsPx.w, DPI_FOR_CM).toFixed(1)} × {pxToCm(cropDimensionsPx.h, DPI_FOR_CM).toFixed(1)} cm at {DPI_FOR_CM} DPI)
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Output format
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as "jpeg" | "png")}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                </select>
              </div>
              {outputFormat === "jpeg" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Quality: {(quality * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min={0.5}
                    max={1}
                    step={0.05}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={runCrop}
              disabled={isProcessing || !completedCrop}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              <Crop className="h-4 w-4" aria-hidden />
              {isProcessing ? "Cropping…" : "Crop image"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {/* Result */}
      {result && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Cropped image</h3>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element -- Blob URL preview; next/image doesn't support blob */}
            <img
              src={result.url}
              alt="Cropped result"
              className="max-h-64 rounded-lg border border-slate-200 object-contain dark:border-slate-600"
            />
            <div className="flex flex-1 flex-col justify-between gap-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {formatBytes(result.blob.size)} · {outputFormat.toUpperCase()}
                {result.width && result.height && ` · ${result.width}×${result.height} px`}
              </p>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 self-start rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download
              </button>
            </div>
          </div>
          {renderResultExtras?.(result)}
        </div>
      )}

      <LimitReachedModal
        open={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        toolName="crop image"
      />
    </section>
  );
}
