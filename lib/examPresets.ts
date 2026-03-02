/**
 * Indian exam photo presets for Exam Smart Resizer.
 * Dimensions (px), target KB, and format based on typical notifications.
 * Always verify against the official advertisement.
 */

export type ExamPreset = {
  id: string;
  label: string;
  /** Photo width in pixels (passport-style) */
  width: number;
  /** Photo height in pixels */
  height: number;
  /** Target file size in KB */
  targetKb: number;
  /** Output format */
  format: "jpeg";
  /** Signature variant (smaller size) - optional */
  signatureKb?: number;
};

export const EXAM_PRESETS: ExamPreset[] = [
  // SSC
  { id: "ssc-cgl-2026", label: "SSC CGL 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "ssc-chsl-2026", label: "SSC CHSL 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "ssc-mts-2026", label: "SSC MTS 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  // Railway
  { id: "rrb-alp-2026", label: "RRB ALP 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "rrb-ntpc-2026", label: "RRB NTPC 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "rrb-group-d-2026", label: "RRB Group D 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  // UPSC
  { id: "upsc-cse-2026", label: "UPSC CSE 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "upsc-capf-2026", label: "UPSC CAPF 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  // Banking
  { id: "ibps-po-2026", label: "IBPS PO 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "ibps-clerk-2026", label: "IBPS Clerk 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "sbi-po-2026", label: "SBI PO 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "rbi-grade-b-2026", label: "RBI Grade B 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  // Defence
  { id: "cds-2026", label: "CDS 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "nda-2026", label: "NDA 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  // State PSC
  { id: "uppsc-2026", label: "UPPSC 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "bpsc-2026", label: "BPSC 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "mppsc-2026", label: "MPPSC 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  { id: "rpsc-2026", label: "RPSC Rajasthan 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
  // Teaching
  { id: "ctet-2026", label: "CTET 2026", width: 275, height: 354, targetKb: 50, format: "jpeg", signatureKb: 20 },
];

/** Default "custom" option when no preset selected */
export const CUSTOM_PRESET: ExamPreset = {
  id: "custom",
  label: "Custom (manual settings)",
  width: 275,
  height: 354,
  targetKb: 50,
  format: "jpeg",
};
