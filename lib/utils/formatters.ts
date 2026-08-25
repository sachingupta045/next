/**
 * Utility functions for formatting and form helpers
 */

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatAbv(abv?: string | number | null): string {
  if (abv === undefined || abv === null || abv === "") return "N/A";
  const num = typeof abv === "number" ? abv : parseFloat(String(abv));
  return isNaN(num) ? String(abv) : `${num.toFixed(1)}%`;
}

export function parseJsonSafely<T = Record<string, unknown>>(
  input: string | null | undefined,
  fallback: T = {} as T
): T {
  if (!input || !input.trim()) return fallback;
  try {
    return JSON.parse(input);
  } catch {
    return fallback;
  }
}

export function stringifyJsonPretty(data: unknown): string {
  if (data === null || data === undefined) return "";
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return "";
  }
}
