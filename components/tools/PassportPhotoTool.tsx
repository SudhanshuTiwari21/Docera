"use client";

import { useCallback, useState } from "react";
import { CropImageTool, type CropImageToolResult } from "@/components/tools/CropImageTool";
import {
  PASSPORT_PRESETS,
  applyBackgroundReplacement,
  applyShadowReduction,
  createPrintSheet,
  type BackgroundMode,
} from "@/lib/passportPhoto";
import { Printer } from "lucide-react";

const PASSPORT_ASPECT_PRESETS = [
  { label: "3.5×4.5 cm (35×45 mm)", value: 35 / 45 },
  { label: "1:1 (Square)", value: 1 },
];

export function PassportPhotoTool() {
  const [presetId, setPresetId] = useState<string>(PASSPORT_PRESETS[0].id);
  const [background, setBackground] = useState<BackgroundMode>("white");
  const [shadowReduction, setShadowReduction] = useState(0);

  const preset = PASSPORT_PRESETS.find((p) => p.id === presetId) ?? PASSPORT_PRESETS[0];
  const outputSize =
    preset.widthPx && preset.heightPx
      ? { width: preset.widthPx, height: preset.heightPx }
      : undefined;

  const postProcess = useCallback(
    (canvas: HTMLCanvasElement): HTMLCanvasElement => {
      let c = canvas;
      c = applyBackgroundReplacement(c, background);
      if (shadowReduction > 0) {
        c = applyShadowReduction(c, shadowReduction / 100);
      }
      return c;
    },
    [background, shadowReduction]
  );

  const handlePrintSheet = useCallback(
    async (result: CropImageToolResult, copies: 4 | 6 | 8) => {
      const blob = await createPrintSheet(result.url, copies);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `passport-photo-sheet-${copies}up.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    },
    []
  );

  const renderResultExtras = useCallback(
    (result: CropImageToolResult) => (
      <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-600">
        <h4 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
          Print sheet (multiple copies per page)
        </h4>
        <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
          Download one page with 4, 6, or 8 copies for printing.
        </p>
        <div className="flex flex-wrap gap-2">
          {([4, 6, 8] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handlePrintSheet(result, n)}
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <Printer className="h-4 w-4" aria-hidden />
              {n} per page
            </button>
          ))}
        </div>
      </div>
    ),
    [handlePrintSheet]
  );

  return (
    <section aria-labelledby="passport-photo-heading" className="space-y-6">
      <h2 id="passport-photo-heading" className="sr-only">
        Passport photo
      </h2>

      {/* Exam / size preset */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
          Exam / size preset
        </h3>
        <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
          Locked aspect ratio for govt forms. Choose preset for correct dimensions.
        </p>
        <select
          value={presetId}
          onChange={(e) => setPresetId(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
          aria-label="Select exam or size preset"
        >
          {PASSPORT_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label} {p.sizeMm !== "—" ? `(${p.sizeMm})` : ""}
            </option>
          ))}
        </select>
        {preset.sizeMm !== "—" && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Output: {preset.sizeMm}
            {preset.widthPx && preset.heightPx && ` → ${preset.widthPx}×${preset.heightPx} px`}
          </p>
        )}
      </div>

      {/* Background & shadow (options applied before crop result) */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
          Background &amp; quality
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
              Background (govt forms often require white)
            </label>
            <select
              value={background}
              onChange={(e) => setBackground(e.target.value as BackgroundMode)}
              className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            >
              <option value="original">Keep original</option>
              <option value="white">White</option>
              <option value="light">Light grey</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
              Shadow reduction: {shadowReduction}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={shadowReduction}
              onChange={(e) => setShadowReduction(Number(e.target.value))}
              className="w-full max-w-xs"
            />
          </div>
        </div>
      </div>

      <CropImageTool
        key={presetId}
        defaultAspect={preset.aspect}
        defaultOutputFormat="jpeg"
        aspectLocked
        aspectPresets={PASSPORT_ASPECT_PRESETS}
        postProcess={postProcess}
        outputSize={outputSize}
        renderResultExtras={renderResultExtras}
      />
    </section>
  );
}
