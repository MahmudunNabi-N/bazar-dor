"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/categories";
import { formatBanglaDate } from "@/lib/format";
import type { Product } from "@/lib/types";
import { PriceTicker } from "@/components/price-ticker";

export function Navbar({ products }: { products: Product[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <>
      <header className="site-header">
        <div className="header-main shell">
          <Link href="/" className="brand" aria-label="বাজার দর হোম পেজ">
            <span className="brand-mark">🛒</span>
            <span className="brand-copy">
              <strong>বাজার দর</strong>
              <small>{formatBanglaDate()}</small>
            </span>
          </Link>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>

          <div className="header-actions">
            <Link href="/signin" className="button button-outline button-small">সাইন ইন</Link>
            <Link href="/signup" className="button button-primary button-small">সাইন আপ <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className={`category-nav-wrap ${menuOpen ? "is-open" : ""}`}>
          <nav className="category-nav shell" aria-label="পণ্যের ক্যাটাগরি">
            <Link
              href="/"
              className={`category-nav-link ${isHome ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <span>⌂</span> সব পণ্য
            </Link>
            {categories.map((category) => (
              <Link
                href={`/category/${category.slug}`}
                className={`category-nav-link ${pathname === `/category/${category.slug}` ? "active" : ""}`}
                key={category.slug}
                onClick={() => setMenuOpen(false)}
              >
                <span>{category.emoji}</span>{category.name}
              </Link>
            ))}
            <Link href="/profile" className={`category-nav-link profile-nav-link ${pathname.startsWith("/profile") ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
              <span>👤</span> প্রোফাইল
            </Link>
          </nav>
        </div>
      </header>
      <PriceTicker products={products.slice(0, 33)} />
    </>
  );
}
