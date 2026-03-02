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
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";
import { Upload, Crop, Download } from "lucide-react";

const TOOL_ID = "signature-extractor";
const DAILY_LIMIT = 10;

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number | undefined
): PixelCrop {
  if (aspect === undefined) {
    return centerCrop(
      { unit: "px", width: mediaWidth * 0.6, height: mediaHeight * 0.3 },
      mediaWidth,
      mediaHeight
    );
  }
  return centerCrop(
    makeAspectCrop({ unit: "px", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export function SignatureExtractorTool() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropArea | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [whiteBg, setWhiteBg] = useState(true);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
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

  const handleFileSelect = useCallback((f: File | null) => {
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setImgSrc(null);
    setCrop(undefined);
    setCompletedCrop(null);
    setResult(null);
    setError(null);
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please select an image.");
      return;
    }
    setFile(f);
    setImgSrc(URL.createObjectURL(f));
  }, [imgSrc, result]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileSelect(e.dataTransfer.files?.[0] ?? null);
    },
    [handleFileSelect]
  );

  const runExtract = useCallback(async () => {
    if (!file || !completedCrop || !imgRef.current) {
      setError("Select an image and adjust the crop area around your signature.");
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
      const canvas = await getCroppedCanvas(imgRef.current, completedCrop);
      if (whiteBg) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png", 1);
      });
      if (!blob) throw new Error("Failed to create image");
      setResult({ blob, url: URL.createObjectURL(blob) });
      setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Extract failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, completedCrop, whiteBg, result, isPremiumUser, usage.allowed, userId]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}_signature.png`;
    a.click();
  }, [result, file]);

  return (
    <section className="space-y-6" aria-labelledby="signature-extractor-heading">
      <h2 id="signature-extractor-heading" className="sr-only">
        Signature extractor
      </h2>

      <div
        className={`rounded-xl border-2 border-dashed bg-slate-50 p-8 transition-colors dark:bg-slate-800/50 ${
          isDragging ? "border-slate-400 bg-slate-100 dark:bg-slate-700" : "border-slate-200 dark:border-slate-600"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
      >
        <label className="flex cursor-pointer flex-col items-center gap-2">
          <Upload className="h-12 w-12 text-slate-400" aria-hidden />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Upload image with your signature
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {imgSrc && (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-600 dark:bg-slate-800">
          <div className="overflow-hidden rounded-lg bg-slate-900">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className="max-h-[min(50vh,400px)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Signature crop"
                style={{ maxHeight: "50vh", width: "auto" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setAspect(undefined)}
              className={`rounded-lg px-3 py-1.5 text-sm ${aspect === undefined ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "bg-slate-100 dark:bg-slate-700"}`}
            >
              Free
            </button>
            <button
              type="button"
              onClick={() => setAspect(4)}
              className={`rounded-lg px-3 py-1.5 text-sm ${aspect === 4 ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "bg-slate-100 dark:bg-slate-700"}`}
            >
              4:1 (Wide)
            </button>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={whiteBg}
              onChange={(e) => setWhiteBg(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">White background</span>
          </label>
          <button
            type="button"
            onClick={runExtract}
            disabled={isProcessing || !completedCrop}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <Crop className="h-4 w-4" aria-hidden />
            {isProcessing ? "Extracting…" : "Extract signature"}
          </button>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-600 dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Extracted signature</h3>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.url}
              alt="Signature"
              className="max-h-32 rounded border border-slate-200 bg-white object-contain dark:border-slate-600"
            />
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-2 self-start rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download PNG
            </button>
          </div>
        </div>
      )}

      <LimitReachedModal open={showLimitModal} onClose={() => setShowLimitModal(false)} toolName="signature extractor" />
    </section>
  );
}
