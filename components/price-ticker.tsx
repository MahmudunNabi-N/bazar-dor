import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatChange, formatNumber } from "@/lib/format";

export function PriceTicker({ products }: { products: Product[] }) {
  const tickerProducts = products.length ? products : [];

  return (
    <div className="ticker-wrap" aria-label="আজকের বাজারদরের চলমান তালিকা">
      <div className="ticker-label"><span className="ticker-live-dot" /> লাইভ দর</div>
      <div className="ticker-window">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
              {tickerProducts.map((product) => (
                <Link className="ticker-item" href={`/product/${product.slug}`} key={`${copy}-${product.id}`} tabIndex={copy === 1 ? -1 : 0}>
                  <span className="ticker-emoji">{product.emoji}</span>
                  <span>{product.name}</span>
                  <strong>{formatNumber(product.price)} ৳ / {product.unit.replace("প্রতি ", "")}</strong>
                  <span className={`ticker-change ${product.trend}`}>{formatChange(product.change)}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
