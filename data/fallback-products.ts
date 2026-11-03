import type { Product } from "@/lib/types";

const fallbackMarkets = (price: number) => {
  const marketFactors = [
    ["কারওয়ান বাজার", 0.98],
    ["মোহাম্মদপুর কৃষি মার্কেট", 1.02],
    ["মিরপুর ১ বাজার", 1.04],
    ["নিউ মার্কেট", 1.01],
    ["যাত্রাবাড়ী বাজার", 0.96],
    ["উত্তরা ৬ নম্বর সেক্টর", 1.06],
  ] as const;

  return marketFactors.map(([market, factor], index) => ({
    market,
    price: Math.max(1, Math.round(price * factor)),
    previousPrice: Math.max(1, Math.round(price * factor * 0.98)),
    lastWeekPrice: Math.max(1, Math.round(price * factor * 0.95)),
    lastMonthPrice: Math.max(1, Math.round(price * factor * 0.91)),
    updatedAt: "আজ",
    id: `${index}-${market}`,
  }));
};

type Seed = [
  id: string,
  name: string,
  category: string,
  emoji: string,
  unit: string,
  price: number,
  change: number,
  description?: string,
];

const seeds: Seed[] = [
  ["1", "স্বর্ণমাছি চাল", "chal", "🍚", "প্রতি কেজি", 148, 2.1],
  ["2", "মিনিকেট চাল", "chal", "🍚", "প্রতি কেজি", 99, -2.9],
  ["3", "নাজির চাল", "chal", "🍚", "প্রতি কেজি", 74, 0],
  ["4", "বাটাম সাইজ চাল", "chal", "🍚", "প্রতি কেজি", 66, 3.1],
  ["5", "মসুর ডাল", "dal", "🫘", "প্রতি কেজি", 142, 2.9],
  ["6", "মুগ ডাল", "dal", "🫘", "প্রতি কেজি", 135, 0],
  ["7", "ছোলা", "dal", "🫘", "প্রতি কেজি", 120, -2.4],
  ["8", "আমন ডাল (খোসাসিলা)", "dal", "🫘", "প্রতি কেজি", 156, 2.6],
  ["9", "সরিষার তেল", "tel", "🫙", "প্রতি লিটার", 192, 2.1],
  ["10", "পাম তেল", "tel", "🛢️", "প্রতি কেজি", 168, -2.3],
  ["11", "ঘানি ভাঙা সরিষার তেল", "tel", "🫙", "প্রতি লিটার", 215, 2.4],
  ["12", "আলু", "sobji", "🥔", "প্রতি কেজি", 30, -6.2],
  ["13", "পেঁয়াজ", "sobji", "🧅", "প্রতি কেজি", 54, 12.5],
  ["14", "কাঁচামরিচ", "sobji", "🌶️", "প্রতি কেজি", 92, -12.4],
  ["15", "বেগুন", "sobji", "🍆", "প্রতি কেজি", 44, 4.8],
  ["16", "ঢেঁড়স", "sobji", "🟢", "প্রতি কেজি", 38, 0],
  ["17", "রুই মাছ", "mach", "🐟", "প্রতি কেজি", 46, 4.5],
  ["18", "তেলাপিয়া", "mach", "🐟", "প্রতি কেজি", 36, 0],
  ["19", "ইলিশ মাছ", "mach", "🐠", "প্রতি কেজি", 1850, 3.4],
  ["20", "কাতলা মাছ", "mach", "🐠", "প্রতি কেজি", 43, -4.4],
  ["21", "চিংড়ি মাছ (খোলা)", "mach", "🦐", "প্রতি কেজি", 330, 3.1],
  ["22", "মুরগির মাংস", "mangsho", "🍗", "প্রতি কেজি", 225, -1.3],
  ["23", "গরুর মাংস", "mangsho", "🥩", "প্রতি কেজি", 790, -1.2],
  ["24", "খাসির মাংস", "mangsho", "🍖", "প্রতি কেজি", 1290, -3],
  ["25", "হাঁসের মাংস", "mangsho", "🦆", "প্রতি কেজি", 285, -3.4],
  ["26", "ডিম", "dim-dudh", "🥚", "প্রতি ডজন", 158, 3.9],
  ["27", "দুধ", "dim-dudh", "🥛", "প্রতি লিটার", 102, 2],
  ["28", "দই", "dim-dudh", "🥣", "প্রতি লিটার", 92, 0],
  ["29", "মাখন (১০০ গ্রাম)", "dim-dudh", "🧈", "প্রতি পিস", 145, 3.6],
  ["30", "আদা", "mosla", "🫚", "প্রতি কেজি", 85, 9],
  ["31", "রসুন", "mosla", "🧄", "প্রতি কেজি", 125, -7.4],
  ["32", "মরিচ গুঁড়া", "mosla", "🌶️", "প্রতি কেজি", 245, -2],
  ["33", "ধনেপাতা গুঁড়া", "mosla", "🍃", "প্রতি কেজি", 265, 0],
];

export const fallbackProducts: Product[] = seeds.map(
  ([id, name, category, emoji, unit, price, change, description]) => ({
    id,
    slug: id,
    name,
    category,
    categoryLabel: ({
      chal: "চাল",
      dal: "ডাল",
      tel: "তেল",
      sobji: "সবজি",
      mach: "মাছ",
      mangsho: "মাংস",
      "dim-dudh": "ডিম-দুধ",
      mosla: "মসলা",
    } as Record<string, string>)[category] ?? "অন্যান্য",
    emoji,
    unit,
    price,
    change,
    trend: change > 0 ? "up" : change < 0 ? "down" : "flat",
    description:
      description ?? `${name} এর আজকের বাজারদর ও বিভিন্ন বাজারের দামের তুলনা দেখুন।`,
    markets: fallbackMarkets(price),
  }),
);
