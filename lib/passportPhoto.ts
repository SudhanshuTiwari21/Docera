/**
 * Passport photo helpers: background replacement and shadow reduction.
 * Used by PassportPhotoTool for govt form requirements.
 */

export type BackgroundMode = "original" | "white" | "light";

/**
 * Sample average color from image edges (background estimate).
 */
function getEdgeColor(ctx: CanvasRenderingContext2D, w: number, h: number): { r: number; g: number; b: number } {
  const sample = 5;
  let r = 0, g = 0, b = 0, count = 0;
  const data = ctx.getImageData(0, 0, w, h).data;

  const samplePixel = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  };

  for (let i = 0; i < sample && i < w; i++) {
    samplePixel(i, 0);
    samplePixel(i, h - 1);
  }
  for (let i = 0; i < sample && i < h; i++) {
    samplePixel(0, i);
    samplePixel(w - 1, i);
  }
  if (count === 0) return { r: 255, g: 255, b: 255 };
  return { r: r / count, g: g / count, b: b / count };
}

function colorDistance(
  r1: number, g1: number, b1: number,
  r2: number, g2: number, b2: number
): number {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/**
 * Replace background (edge-similar pixels) with white or light grey.
 */
export function applyBackgroundReplacement(
  canvas: HTMLCanvasElement,
  mode: BackgroundMode
): HTMLCanvasElement {
  if (mode === "original") return canvas;

  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const edge = getEdgeColor(ctx, w, h);

  const threshold = 80;
  const replaceR = mode === "white" ? 255 : 240;
  const replaceG = mode === "white" ? 255 : 240;
  const replaceB = mode === "white" ? 255 : 240;

  for (let i = 0; i < data.length; i += 4) {
    const dist = colorDistance(
      data[i], data[i + 1], data[i + 2],
      edge.r, edge.g, edge.b
    );
    if (dist < threshold) {
      data[i] = replaceR;
      data[i + 1] = replaceG;
      data[i + 2] = replaceB;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Reduce shadows by lifting dark areas (0 = off, 1 = max).
 */
export function applyShadowReduction(canvas: HTMLCanvasElement, amount: number): HTMLCanvasElement {
  if (amount <= 0) return canvas;

  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const w = canvas.width;
  const h = canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const strength = Math.min(1, amount) * 0.4;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255;
    const g = data[i + 1] / 255;
    const b = data[i + 2] / 255;
    const l = 0.299 * r + 0.587 * g + 0.114 * b;
    if (l < 0.5) {
      const lift = (0.5 - l) * strength;
      data[i] = Math.min(255, (data[i] / 255 + lift) * 255);
      data[i + 1] = Math.min(255, (data[i + 1] / 255 + lift) * 255);
      data[i + 2] = Math.min(255, (data[i + 2] / 255 + lift) * 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/** Passport/exam presets: label, aspect ratio, and optional output size in px (e.g. at 300 DPI). */
export type PassportPreset = {
  id: string;
  label: string;
  /** Width × height in mm (e.g. 35×45) */
  sizeMm: string;
  aspect: number;
  /** Output dimensions for print (optional). */
  widthPx?: number;
  heightPx?: number;
};

/** 35×45 mm at 300 DPI ≈ 413×531 px. 3.5×4.5 cm = 35×45 mm. */
export const PASSPORT_PRESETS: PassportPreset[] = [
  { id: "indian-passport", label: "Indian Passport / Visa", sizeMm: "35×45 mm", aspect: 35 / 45, widthPx: 413, heightPx: 531 },
  { id: "ssc-upsc", label: "SSC / UPSC / Railway", sizeMm: "3.5×4.5 cm", aspect: 35 / 45, widthPx: 413, heightPx: 531 },
  { id: "banking", label: "IBPS / SBI / RBI", sizeMm: "3.5×4.5 cm", aspect: 35 / 45, widthPx: 413, heightPx: 531 },
  { id: "square", label: "1:1 (Square)", sizeMm: "—", aspect: 1 },
];

/** Create a print sheet with N copies (4, 6, or 8) per page. A4-ish at 150 DPI. */
export function createPrintSheet(
  imageUrl: string,
  copiesPerPage: 4 | 6 | 8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const singleW = img.naturalWidth;
      const singleH = img.naturalHeight;
      const cols = copiesPerPage === 4 ? 2 : 2;
      const rows = copiesPerPage === 4 ? 2 : copiesPerPage === 6 ? 3 : 4;
      const pad = 20;
      const sheetW = cols * singleW + pad * (cols + 1);
      const sheetH = rows * singleH + pad * (rows + 1);

      const canvas = document.createElement("canvas");
      canvas.width = sheetW;
      canvas.height = sheetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, sheetW, sheetH);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = pad + col * (singleW + pad);
          const y = pad + row * (singleH + pad);
          ctx.drawImage(img, x, y, singleW, singleH);
        }
      }

      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Failed to create sheet"))),
        "image/jpeg",
        0.92
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}
