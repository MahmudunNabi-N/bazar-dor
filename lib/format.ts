const banglaDigits = "০১২৩৪৫৬৭৮৯";
const englishDigits = "0123456789";

export function toEnglishDigits(value: string | number): string {
  return String(value).replace(/[০-৯]/g, (digit) =>
    String(banglaDigits.indexOf(digit)),
  );
}

export function toBanglaDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) =>
    banglaDigits[englishDigits.indexOf(digit)],
  );
}

export function parsePrice(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return 0;
  const normalized = toEnglishDigits(value).replace(/[^0-9.-]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatNumber(value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatPrice(value: number): string {
  return `${formatNumber(value)} টাকা`;
}

export function formatChange(value: number): string {
  if (Math.abs(value) < 0.05) return "— ০.০%";
  const arrow = value > 0 ? "▲" : "▼";
  return `${arrow} ${formatNumber(Math.abs(value), 1)}%`;
}

export function formatBanglaDate(date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}
