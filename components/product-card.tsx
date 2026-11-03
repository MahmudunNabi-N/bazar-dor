import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatChange, formatNumber } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="product-card">
      <div className="product-card-top">
        <span className={`product-emoji category-${product.category}`}>{product.emoji}</span>
        <span className={`change-badge ${product.trend}`}>{formatChange(product.change)}</span>
      </div>
      <div className="product-info">
        <span className="product-category">{product.categoryLabel}</span>
        <h3>{product.name}</h3>
        <p className="product-unit">{product.unit}</p>
      </div>
      <div className="product-card-bottom">
        <div>
          <span className="price-label">আজকের দাম</span>
          <strong className="product-price">{formatNumber(product.price)} <small>টাকা</small></strong>
        </div>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </div>
    </Link>
  );
}
