/**
 * SEO title optimization: intent-based suffixes and length cap for CTR.
 * Target 60–65 characters for search result display.
 */

const MAX_TITLE_LENGTH = 65;

const SUFFIXES = {
  govt: " | Govt Form Upload Tool | Dockera",
  exam: " | SSC, UPSC, Railway Forms | Dockera",
  general: " | Dockera",
} as const;

export type TitleIntent = "govt" | "exam" | "general";

export type BuildOptimizedTitleOptions = {
  year?: number;
  intent?: TitleIntent;
};

function truncateToFit(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength - 3).trim();
  return trimmed.endsWith(".") ? trimmed : `${trimmed}…`;
}

/**
 * Builds an SEO title with intent-based suffix and optional year.
 * Keeps total length under MAX_TITLE_LENGTH when possible.
 */
export function buildOptimizedTitle(
  baseTitle: string,
  options?: BuildOptimizedTitleOptions
): string {
  const intent = options?.intent ?? "general";
  const suffix = SUFFIXES[intent];
  const maxBaseLength = MAX_TITLE_LENGTH - suffix.length;

  let basePart = baseTitle.trim();
  if (options?.year != null) {
    const yearPart = ` (${options.year})`;
    basePart = basePart.length + yearPart.length <= maxBaseLength
      ? `${basePart}${yearPart}`
      : truncateToFit(basePart, maxBaseLength - yearPart.length) + yearPart;
  } else if (basePart.length > maxBaseLength) {
    basePart = truncateToFit(basePart, maxBaseLength);
  }

  return basePart + suffix;
}
