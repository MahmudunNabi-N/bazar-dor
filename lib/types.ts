export type Trend = "up" | "down" | "flat";

export type MarketPrice = {
  id: string;
  market: string;
  price: number;
  previousPrice?: number;
  lastWeekPrice?: number;
  lastMonthPrice?: number;
  updatedAt?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
  trend: Trend;
  description: string;
  markets: MarketPrice[];
};
