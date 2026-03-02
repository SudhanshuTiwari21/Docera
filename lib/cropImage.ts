/**
 * Crop image to a region using Canvas API.
 * Used by CropImageTool.
 */
import type { PixelCrop } from "react-image-crop";

export async function getCroppedCanvas(
  image: HTMLImageElement,
  crop: PixelCrop
): Promise<HTMLCanvasElement> {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const cropW = crop.width * scaleX;
  const cropH = crop.height * scaleY;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(cropW);
  canvas.height = Math.round(cropH);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2d context not available");

  ctx.drawImage(
    image,
    cropX, cropY, cropW, cropH, // source rect
    0, 0, canvas.width, canvas.height  // dest rect
  );

  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: "image/jpeg" | "image/png",
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, mimeType, mimeType === "image/jpeg" ? quality : undefined);
  });
}
