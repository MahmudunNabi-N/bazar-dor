import { Hero } from "@/components/hero";
import { PriceMovers } from "@/components/price-movers";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <SiteShell products={products}>
      <main>
        <Hero products={products} />
        <PriceMovers products={products} />
        <section className="catalogue-section shell" id="সব-পণ্য">
          <SectionHeading
            eyebrow="সম্পূর্ণ ক্যাটালগ"
            title="সব পণ্য"
            description="সকল নিত্যপ্রয়োজনীয় খাদ্য ও ভোগ্যপণ্যের বিস্তারিত তালিকা ও বর্তমান বাজারদর।"
            action={<span className="catalogue-total-pill">{products.length.toLocaleString("bn-BD")}টি পণ্য</span>}
          />
          <ProductGrid products={products} />
        </section>
      </main>
    </SiteShell>
  );
}
