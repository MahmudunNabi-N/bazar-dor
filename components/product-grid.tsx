"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { categories } from "@/data/categories";
import type { Product } from "@/lib/types";

type SortValue = "default" | "low-high" | "high-low";

export function ProductGrid({
  products,
  showFilters = true,
  showCategories = true,
  emptyTitle = "কোনো পণ্য পাওয়া যায়নি",
}: {
  products: Product[];
  showFilters?: boolean;
  showCategories?: boolean;
  emptyTitle?: string;
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortValue>("default");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("bn-BD");
    const filtered = products.filter((product) => {
      const matchesQuery = !query || `${product.name} ${product.categoryLabel}`.toLocaleLowerCase("bn-BD").includes(query);
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });

    if (sort === "low-high") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "high-low") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [products, search, selectedCategory, sort]);

  return (
    <div className="catalogue-wrap">
      {showFilters && (
        <div className="catalogue-toolbar">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="পণ্য খুঁজুন (যেমন: চাল, আলু)..."
              aria-label="পণ্য খুঁজুন"
            />
            {search && <button type="button" onClick={() => setSearch("")} aria-label="সার্চ মুছুন">×</button>}
          </label>
          <label className="sort-control">
            <span>সাজান:</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortValue)} aria-label="দাম অনুযায়ী সাজান">
              <option value="default">ডিফল্ট</option>
              <option value="low-high">দাম: কম থেকে বেশি</option>
              <option value="high-low">দাম: বেশি থেকে কম</option>
            </select>
            <span className="select-chevron" aria-hidden="true">⌄</span>
          </label>
        </div>
      )}

      {showCategories && (
        <div className="category-chips" aria-label="ক্যাটাগরি ফিল্টার">
          <button className={selectedCategory === "all" ? "category-chip active" : "category-chip"} onClick={() => setSelectedCategory("all")} type="button">
            সব পণ্য <span>{products.length}</span>
          </button>
          {categories.map((category) => {
            const count = products.filter((product) => product.category === category.slug).length;
            return (
              <button
                className={selectedCategory === category.slug ? "category-chip active" : "category-chip"}
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                type="button"
              >
                {category.emoji} {category.name} <span>{count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="catalogue-result-line">
        <span>মোট <strong>{visibleProducts.length.toLocaleString("bn-BD")}</strong>টি পণ্য</span>
        {(search || selectedCategory !== "all" || sort !== "default") && (
          <button className="reset-filter" type="button" onClick={() => { setSearch(""); setSelectedCategory("all"); setSort("default"); }}>
            ফিল্টার মুছুন ×
          </button>
        )}
      </div>

      {visibleProducts.length ? (
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="empty-state">
          <span>🧺</span>
          <h3>{emptyTitle}</h3>
          <p>অন্য কোনো পণ্যের নাম দিয়ে আবার খুঁজে দেখুন।</p>
          <button className="button button-primary" type="button" onClick={() => { setSearch(""); setSelectedCategory("all"); }}>
            সব পণ্য দেখুন
          </button>
          <Link href="/" className="visually-hidden">হোম পেজ</Link>
        </div>
      )}
    </div>
  );
}
