import type { Product } from "@/lib/types";
import { formatNumber } from "@/lib/format";

export function Hero({ products }: { products: Product[] }) {
  const rice = products.find((product) => product.category === "chal") ?? products[0];
  const fish = products.find((product) => product.name.includes("ইলিশ")) ?? products.find((product) => product.category === "mach");

  return (
    <section className="hero-section shell">
      <div className="hero-copy">
        <div className="hero-eyebrow"><span className="hero-eyebrow-dot" /> প্রতিদিনের বাজার মনিটরিং ও সঠিক মূল্য তালিকা</div>
        <h1>প্রতিদিনের বাজার দর জানুন <span>এক নিমিষে</span></h1>
        <p className="hero-description">
          সারা দেশের প্রধান বাজারগুলোর শাকসবজি, চাল, ডাল, তেল, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের আপডেটেড মূল্য তালিকা এখন আপনার হাতের মুঠোয়।
        </p>
        <div className="hero-benefits">
          <span><i>✓</i> দৈনিক মূল্য হ্রাস-বৃদ্ধি ট্র্যাক</span>
          <span><i>✓</i> বাজারভিত্তিক দামের তুলনা</span>
        </div>
        <div className="hero-actions">
          <a href="#সব-পণ্য" className="button button-primary button-large">আজকের বাজার দর দেখুন <span>↗</span></a>
          <span className="hero-updated"><span className="live-pulse" /> সর্বশেষ বাজারদর</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image-frame">
          <img
            src="https://raw.githubusercontent.com/ProgrammingHero1/B14-A7-Bazar-Dor/main/bazar-hero.png"
            alt="তাজা সবজির বাজারের ঝুড়ি"
            width={301}
            height={222}
            className="hero-basket-image"
          />
          <div className="hero-visual-caption"><span>🌿</span> প্রতিদিনের তাজা বাজারদর</div>
        </div>
      </div>
    </section>
  );
}
