/**
 * Client-side image optimization utilities.
 * Resize (dimensions), Compress (quality), Smart (auto target size).
 */

const MIN_QUALITY = 0.1;
const QUALITY_STEP = 0.08;
const MAX_ITERATIONS = 100;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), "image/jpeg", quality);
  });
}

export type ResizeOptions = {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
};

/**
 * Resize image by dimensions. Preserves quality (0.92).
 */
export async function resizeImage(file: File, options: ResizeOptions): Promise<Blob> {
  const img = await loadImage(file);
  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;

  let outW: number;
  let outH: number;

  if (options.maintainAspectRatio) {
    const ratio = Math.min(options.width / srcW, options.height / srcH);
    outW = Math.round(srcW * ratio);
    outH = Math.round(srcH * ratio);
  } else {
    outW = Math.max(1, Math.round(options.width));
    outH = Math.max(1, Math.round(options.height));
  }

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(img, 0, 0, outW, outH);
  const blob = await canvasToBlob(canvas, 0.92);
  if (!blob) throw new Error("Failed to create image blob");
  return blob;
}

export type CompressOptions = {
  quality: number; // 0.1 - 1.0
};

/**
 * Compress image by reducing JPEG quality. Keeps original dimensions.
 */
export async function compressImage(file: File, options: CompressOptions): Promise<Blob> {
  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const quality = Math.max(0.1, Math.min(1, options.quality));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(img, 0, 0, w, h);
  const blob = await canvasToBlob(canvas, quality);
  if (!blob) throw new Error("Failed to create image blob");
  return blob;
}

export type SmartOptimizeResult = {
  blob: Blob;
  finalWidth: number;
  finalHeight: number;
  qualityUsed: number;
  reductionPercent: number;
};

/**
 * Smart optimize: reduce quality and dimensions iteratively until target size is met.
 */
export async function smartOptimizeImage(file: File, targetKb: number): Promise<SmartOptimizeResult> {
  const targetBytes = Math.max(1024, targetKb * 1024);
  const img = await loadImage(file);

  let width = img.naturalWidth;
  let height = img.naturalHeight;
  let quality = 0.9;
  let blob: Blob | null = null;
  let scaleFactor = 1;
  let iterations = 0;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  while (iterations < MAX_ITERATIONS) {
    const w = Math.round(width * scaleFactor);
    const h = Math.round(height * scaleFactor);
    if (w < 1 || h < 1) break;

    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);

    let q = quality;
    while (q >= MIN_QUALITY) {
      blob = await canvasToBlob(canvas, q);
      if (blob && blob.size <= targetBytes) {
        const reductionPercent = file.size > 0
          ? Math.round(((file.size - blob.size) / file.size) * 100)
          : 0;
        return {
          blob,
          finalWidth: w,
          finalHeight: h,
          qualityUsed: q,
          reductionPercent,
        };
      }
      q -= QUALITY_STEP;
    }

    scaleFactor -= 0.05;
    if (scaleFactor < 0.25) break;
    iterations++;
  }

  blob = await canvasToBlob(canvas, MIN_QUALITY);
  if (!blob) throw new Error("Failed to create image blob");
  const reductionPercent = file.size > 0
    ? Math.round(((file.size - blob.size) / file.size) * 100)
    : 0;
  return {
    blob,
    finalWidth: canvas.width,
    finalHeight: canvas.height,
    qualityUsed: MIN_QUALITY,
    reductionPercent,
  };
}

export type ExamOptimizeOptions = {
  width: number;
  height: number;
  targetKb: number;
};

/**
 * Exam preset mode: resize to fit within dimensions, then compress to target KB.
 * Produces JPEG suitable for Indian exam forms.
 */
export async function examOptimizeImage(file: File, options: ExamOptimizeOptions): Promise<SmartOptimizeResult> {
  const img = await loadImage(file);
  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;

  // Fit within preset dimensions (maintain aspect)
  const ratio = Math.min(options.width / srcW, options.height / srcH);
  const outW = Math.round(srcW * ratio);
  const outH = Math.round(srcH * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(img, 0, 0, outW, outH);

  const targetBytes = Math.max(1024, options.targetKb * 1024);
  let quality = 0.9;
  let blob: Blob | null = null;

  while (quality >= MIN_QUALITY) {
    blob = await canvasToBlob(canvas, quality);
    if (blob && blob.size <= targetBytes) {
      const reductionPercent = file.size > 0
        ? Math.round(((file.size - blob.size) / file.size) * 100)
        : 0;
      return {
        blob,
        finalWidth: outW,
        finalHeight: outH,
        qualityUsed: quality,
        reductionPercent,
      };
    }
    quality -= QUALITY_STEP;
  }

  blob = await canvasToBlob(canvas, MIN_QUALITY);
  if (!blob) throw new Error("Failed to create image blob");
  const reductionPercent = file.size > 0
    ? Math.round(((file.size - blob.size) / file.size) * 100)
    : 0;
  return {
    blob,
    finalWidth: outW,
    finalHeight: outH,
    qualityUsed: MIN_QUALITY,
    reductionPercent,
  };
}
