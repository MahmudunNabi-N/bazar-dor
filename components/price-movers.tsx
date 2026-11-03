import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatChange, formatNumber } from "@/lib/format";
import { SectionHeading } from "@/components/section-heading";

function MoverCard({ product, type, rank }: { product: Product; type: "up" | "down"; rank: number }) {
  return (
    <Link className="mover-card" href={`/product/${product.slug}`}>
      <div className="mover-rank">{String(rank).padStart(2, "0")}</div>
      <div className="mover-product-emoji">{product.emoji}</div>
      <div className="mover-details">
        <span>{product.categoryLabel}</span>
        <strong>{product.name}</strong>
        <small>{product.unit}</small>
      </div>
      <div className="mover-price">
        <strong>{formatNumber(product.price)} ৳</strong>
        <span className={`change-badge ${type}`}>{formatChange(product.change)}</span>
      </div>
    </Link>
  );
}

export function PriceMovers({ products }: { products: Product[] }) {
  const risers = [...products].filter((product) => product.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].filter((product) => product.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <section className="movers-section shell">
      <div className="mover-column risers-column">
        <SectionHeading
          eyebrow="দামের ঊর্ধ্বগতি"
          title={<>আজ দাম বেড়েছে <span className="rise-symbol">▲</span></>}
          description="গতকালের তুলনায় যেসব পণ্যের দাম বৃদ্ধি পেয়েছে"
        />
        <div className="mover-list">
          {risers.map((product, index) => <MoverCard key={product.id} product={product} type="up" rank={index + 1} />)}
          {!risers.length && <p className="quiet-empty">আজ দামের উল্লেখযোগ্য বৃদ্ধি নেই।</p>}
        </div>
      </div>
      <div className="mover-column fallers-column">
        <SectionHeading
          eyebrow="দামের নিম্নগতি"
          title={<>আজ দাম কমেছে <span className="fall-symbol">▼</span></>}
          description="গতকালের তুলনায় যেসব পণ্যের দাম হ্রাস পেয়েছে"
        />
        <div className="mover-list">
          {fallers.map((product, index) => <MoverCard key={product.id} product={product} type="down" rank={index + 1} />)}
          {!fallers.length && <p className="quiet-empty">আজ দামের উল্লেখযোগ্য হ্রাস নেই।</p>}
        </div>
      </div>
    </section>
  );
}
