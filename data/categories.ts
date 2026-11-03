export type Category = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "chal", name: "চাল", emoji: "🍚", description: "বিভিন্ন জাতের চাল ও চালের বাজারদর" },
  { slug: "dal", name: "ডাল", emoji: "🫘", description: "মসুর, মুগসহ নিত্যপ্রয়োজনীয় ডাল" },
  { slug: "tel", name: "তেল", emoji: "🛢️", description: "খাদ্যতেল ও রান্নার প্রয়োজনীয় তেল" },
  { slug: "sobji", name: "সবজি", emoji: "🥬", description: "প্রতিদিনের তাজা শাকসবজির দর" },
  { slug: "mach", name: "মাছ", emoji: "🐟", description: "দেশি ও চাষের মাছের বাজারদর" },
  { slug: "mangsho", name: "মাংস", emoji: "🍗", description: "মুরগি, গরু, খাসি ও হাঁসের মাংস" },
  { slug: "dim-dudh", name: "ডিম-দুধ", emoji: "🥛", description: "ডিম, দুধ ও দুগ্ধজাত পণ্যের দর" },
  { slug: "mosla", name: "মসলা", emoji: "🌶️", description: "রান্নার প্রয়োজনীয় মসলা ও মসলা গুঁড়া" },
];

export const getCategory = (slug: string) =>
  categories.find((category) => category.slug === slug);
