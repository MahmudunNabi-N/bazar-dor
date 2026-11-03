import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatNumber } from "@/lib/format";

export function ProductDetail({ product }: { product: Product }) {
  const marketPrices = product.markets.map((market) => market.price).filter((price) => price > 0);
  const minPrice = marketPrices.length ? Math.min(...marketPrices) : product.price;
  const maxPrice = marketPrices.length ? Math.max(...marketPrices) : product.price;
  const averagePrice = marketPrices.length
    ? marketPrices.reduce((total, price) => total + price, 0) / marketPrices.length
    : product.price;

  return (
    <main className="page-main shell product-detail-page">
      <div className="breadcrumbs">
        <Link href="/">হোম</Link><span>/</span>
        <Link href={`/category/${product.category}`}>{product.categoryLabel}</Link><span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="detail-summary-card">
        <div className="detail-product-visual">
          <span className={`detail-product-emoji category-${product.category}`}>{product.emoji}</span>
          <span className="detail-visual-caption">বাজার দর</span>
        </div>
        <div className="detail-product-copy">
          <span className="detail-eyebrow">আজকের বাজারদর</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="detail-tags">
            <Link href={`/category/${product.category}`} className="detail-tag">{product.emoji} {product.categoryLabel}</Link>
            <span className="detail-tag">⚖ {product.unit}</span>
            <span className={`change-badge ${product.trend}`}>{product.change > 0 ? "দাম বেড়েছে " : product.change < 0 ? "দাম কমেছে " : "দাম অপরিবর্তিত "}{Math.abs(product.change).toLocaleString("bn-BD", { maximumFractionDigits: 1 })}%</span>
          </div>
        </div>
        <div className="detail-current-price">
          <span>আজকের গড় দাম</span>
          <strong>{formatNumber(product.price)} <small>টাকা</small></strong>
          <p>{product.unit}</p>
        </div>
      </section>

      <section className="price-summary-section">
        <div className="detail-section-title">
          <div><span className="section-eyebrow">মূল্য বিশ্লেষণ</span><h2>দামের সারসংক্ষেপ</h2></div>
          <span className="as-of-label"><span className="live-pulse" /> আজকের তথ্য</span>
        </div>
        <div className="price-stat-grid">
          <article className="price-stat-card min-stat"><span className="stat-icon">↓</span><span>সর্বনিম্ন দাম</span><strong>{formatNumber(minPrice)} <small>৳</small></strong><small>বাজারগুলোর মধ্যে সবচেয়ে কম</small></article>
          <article className="price-stat-card max-stat"><span className="stat-icon">↑</span><span>সর্বোচ্চ দাম</span><strong>{formatNumber(maxPrice)} <small>৳</small></strong><small>বাজারগুলোর মধ্যে সবচেয়ে বেশি</small></article>
          <article className="price-stat-card avg-stat"><span className="stat-icon">≈</span><span>গড় দাম</span><strong>{formatNumber(averagePrice)} <small>৳</small></strong><small>{product.markets.length}টি বাজারের গড় হিসাব</small></article>
        </div>
      </section>

      <section className="market-section">
        <div className="detail-section-title market-title-row">
          <div><span className="section-eyebrow">বাজার তুলনা</span><h2>বাজারভিত্তিক আজকের দাম</h2><p>বিভিন্ন বাজারে {product.name} এর দামের তুলনা এক নজরে।</p></div>
          <span className="market-count">{formatNumber(product.markets.length)}টি বাজার</span>
        </div>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead><tr><th>বাজারের নাম</th><th>আজকের দাম</th><th>গতকালের দাম</th><th>গত সপ্তাহ</th><th>গত মাস</th></tr></thead>
            <tbody>
              {product.markets.map((market) => (
                <tr key={market.id}>
                  <td><span className="market-pin">⌖</span><strong>{market.market}</strong></td>
                  <td><strong className="market-current-price">{formatNumber(market.price)} ৳</strong></td>
                  <td>{market.previousPrice ? `${formatNumber(market.previousPrice)} ৳` : "—"}</td>
                  <td>{market.lastWeekPrice ? `${formatNumber(market.lastWeekPrice)} ৳` : "—"}</td>
                  <td>{market.lastMonthPrice ? `${formatNumber(market.lastMonthPrice)} ৳` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="market-disclaimer">* বাজারভিত্তিক তথ্য API থেকে পাওয়া গেলে সেটি দেখানো হয়; অন্যথায় তুলনামূলক নমুনা মূল্য ব্যবহৃত হয়।</p>
      </section>

      <div className="detail-back-link"><Link href="/" className="button button-outline">← সব পণ্যে ফিরে যান</Link></div>
    </main>
  );
}
