import { categories, getCategory } from "@/data/categories";
import { fallbackProducts } from "@/data/fallback-products";
import type { MarketPrice, Product, Trend } from "@/lib/types";
import { parsePrice, slugify } from "@/lib/format";

const DEFAULT_API_BASE = "https://openapi.programming-hero.com/api/bazardor";
const API_BASES = [
  process.env.NEXT_PUBLIC_BAZARDOR_API_URL || DEFAULT_API_BASE,
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter((value, index, array) => array.indexOf(value) === index);

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function firstValue(record: UnknownRecord, keys: string[]): unknown {
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

function readText(value: unknown, fallback = ""): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (isRecord(value)) {
    const nested = firstValue(value, ["name", "title", "label", "slug", "value"]);
    return nested === undefined ? fallback : String(nested);
  }
  return fallback;
}

function findArray(payload: unknown, candidates: string[] = []): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];

  for (const key of [...candidates, "data", "products", "result", "results", "items"] ) {
    const value = payload[key];
    if (Array.isArray(value)) return value;
    if (isRecord(value)) {
      const nested = findArray(value, candidates);
      if (nested.length) return nested;
    }
  }
  return [];
}

function normalizeCategory(rawCategory: unknown, productName: string): string {
  const value = readText(rawCategory).toLowerCase();
  const normalized = slugify(value);
  const aliases: Record<string, string> = {
    rice: "chal",
    chal: "chal",
    চাল: "chal",
    lentil: "dal",
    pulse: "dal",
    ডাল: "dal",
    oil: "tel",
    tel: "tel",
    তেল: "tel",
    vegetable: "sobji",
    vegetables: "sobji",
    sobji: "sobji",
    সবজি: "sobji",
    fish: "mach",
    mach: "mach",
    মাছ: "mach",
    meat: "mangsho",
    mangsho: "mangsho",
    মাংস: "mangsho",
    egg: "dim-dudh",
    dairy: "dim-dudh",
    "dim-dudh": "dim-dudh",
    "ডিম-দুধ": "dim-dudh",
    spices: "mosla",
    spice: "mosla",
    mosla: "mosla",
    মসলা: "mosla",
  };
  if (aliases[value] || aliases[normalized]) return aliases[value] || aliases[normalized];

  const name = productName.toLowerCase();
  if (/চাল|rice/.test(name)) return "chal";
  if (/ডাল|ছোলা|মসুর|মুগ/.test(name)) return "dal";
  if (/তেল|oil/.test(name)) return "tel";
  if (/আলু|পেঁয়াজ|মরিচ|বেগুন|ঢেঁড়স|সবজি/.test(name)) return "sobji";
  if (/মাছ|ইলিশ|রুই|তেলাপিয়া|কাতলা|চিংড়ি/.test(name)) return "mach";
  if (/মাংস|মুরগি|গরু|খাসি|হাঁস/.test(name)) return "mangsho";
  if (/ডিম|দুধ|দই|মাখন/.test(name)) return "dim-dudh";
  return "mosla";
}

function normalizeUnit(rawUnit: unknown): string {
  const unit = readText(rawUnit).toLowerCase();
  if (!unit) return "প্রতি কেজি";
  if (/ডজন|dozen/.test(unit)) return "প্রতি ডজন";
  if (/লিটার|litre|liter/.test(unit)) return "প্রতি লিটার";
  if (/পিস|piece|pcs|piece/.test(unit)) return "প্রতি পিস";
  if (/কেজি|kg|kilogram/.test(unit)) return "প্রতি কেজি";
  return unit.startsWith("প্রতি") ? readText(rawUnit) : `প্রতি ${readText(rawUnit)}`;
}

function normalizeMarkets(rawMarkets: unknown, basePrice: number): MarketPrice[] {
  if (!Array.isArray(rawMarkets) || rawMarkets.length === 0) {
    const factors = [
      ["কারওয়ান বাজার", 0.98],
      ["মোহাম্মদপুর কৃষি মার্কেট", 1.02],
      ["মিরপুর ১ বাজার", 1.04],
      ["নিউ মার্কেট", 1.01],
      ["যাত্রাবাড়ী বাজার", 0.96],
      ["উত্তরা ৬ নম্বর সেক্টর", 1.06],
    ] as const;
    return factors.map(([market, factor], index) => ({
      id: `${index}-${market}`,
      market,
      price: Math.max(1, Math.round(basePrice * factor)),
      previousPrice: Math.max(1, Math.round(basePrice * factor * 0.98)),
      lastWeekPrice: Math.max(1, Math.round(basePrice * factor * 0.95)),
      lastMonthPrice: Math.max(1, Math.round(basePrice * factor * 0.91)),
      updatedAt: "আজ",
    }));
  }

  return rawMarkets.map((entry, index) => {
    const marketRecord = isRecord(entry) ? entry : {};
    const price = parsePrice(
      firstValue(marketRecord, ["price", "today_price", "price_today", "priceToday", "current_price", "amount", "average_price"]) ?? basePrice,
    );
    return {
      id: String(firstValue(marketRecord, ["id", "_id"]) ?? index),
      market: readText(firstValue(marketRecord, ["market", "market_name", "marketName", "bazar", "bazar_name", "bazarName", "name"]), `বাজার ${index + 1}`),
      price: price || basePrice,
      previousPrice: parsePrice(firstValue(marketRecord, ["previous_price", "yesterday_price", "last_day_price"])) || undefined,
      lastWeekPrice: parsePrice(firstValue(marketRecord, ["last_week_price", "week_ago_price"])) || undefined,
      lastMonthPrice: parsePrice(firstValue(marketRecord, ["last_month_price", "month_ago_price"])) || undefined,
      updatedAt: readText(firstValue(marketRecord, ["updated_at", "updatedAt", "date"]), "আজ"),
    };
  });
}

function normalizeProduct(raw: unknown, index: number): Product | null {
  if (!isRecord(raw)) return null;
  const name = readText(firstValue(raw, ["name", "product_name", "product_name_bn", "title", "productName", "name_bn", "bn_name"]));
  if (!name) return null;

  const id = readText(firstValue(raw, ["id", "_id", "product_id", "slug"]), String(index + 1));
  const category = normalizeCategory(
    firstValue(raw, ["category", "category_slug", "categorySlug", "category_name", "categoryName"]),
    name,
  );
  const categoryLabel = getCategory(category)?.name ?? categories[0].name;
  const priceObject = firstValue(raw, ["price", "current_price", "today_price", "todayPrice", "amount"]);
  const priceValue = isRecord(priceObject)
    ? firstValue(priceObject, ["current", "today", "value", "amount", "average"])
    : priceObject;
  const price = parsePrice(
    priceValue ?? firstValue(raw, ["average_price", "avg_price", "price_today", "currentPrice"]),
  );
  const rawChange = firstValue(raw, [
    "change_percent",
    "changePercent",
    "change_percentage",
    "percentage_change",
    "percent_change",
    "price_change_percent",
    "change",
    "variation",
  ]);
  const change = parsePrice(rawChange);
  const emojiMap: Record<string, string> = {
    chal: "🍚", dal: "🫘", tel: "🫙", sobji: "🥬", mach: "🐟",
    mangsho: "🍗", "dim-dudh": "🥛", mosla: "🌶️",
  };
  const description = readText(
    firstValue(raw, ["description", "subtitle", "summary", "market_summary"]),
    `${name} এর আজকের বাজারদর ও বিভিন্ন বাজারের দামের তুলনা দেখুন।`,
  );
  const marketsRaw = firstValue(raw, ["markets", "market_prices", "marketPrices", "bazaars", "bazar_prices", "bazar_data", "market_wise_prices", "prices_by_market"]);

  return {
    id,
    slug: readText(firstValue(raw, ["slug", "id", "_id", "product_id"]), id),
    name,
    category,
    categoryLabel,
    emoji: readText(firstValue(raw, ["emoji", "icon", "symbol"]), emojiMap[category] ?? "🛒"),
    unit: normalizeUnit(firstValue(raw, ["unit", "per_unit", "measurement", "unit_name", "quantity_unit"])),
    price,
    change,
    trend: change > 0 ? "up" : change < 0 ? "down" : "flat",
    description,
    markets: normalizeMarkets(marketsRaw, price),
  };
}

async function requestJson(path: string): Promise<unknown | null> {
  for (const base of API_BASES) {
    try {
      const response = await fetch(`${base}${path}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(4500),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) continue;
      return await response.json();
    } catch {
      // Try the next documented API base. Local sample data is used if all fail.
    }
  }
  return null;
}

export async function getProducts(): Promise<Product[]> {
  const payload = await requestJson("/products");
  const rows = findArray(payload, ["products"]);
  const normalized = rows
    .map((row, index) => normalizeProduct(row, index))
    .filter((product): product is Product => Boolean(product && product.name));

  return normalized.length ? normalized : fallbackProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  const normalizedSlug = slug.toLowerCase();
  const localMatch = products.find(
    (product) => product.slug.toLowerCase() === normalizedSlug || product.id.toLowerCase() === normalizedSlug,
  );
  if (localMatch) return localMatch;

  const payload = await requestJson(`/products/${encodeURIComponent(slug)}`);
  const rows = findArray(payload, ["product"]);
  const first = rows[0] ?? (isRecord(payload) ? firstValue(payload, ["data", "product", "result"]) : undefined);
  return normalizeProduct(first, 0) ?? undefined;
}
