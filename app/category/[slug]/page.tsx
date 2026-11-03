import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { getCategory } from "@/data/categories";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const allProducts = await getProducts();
  const products = allProducts.filter((product) => product.category === category.slug);
  if (!products.length) notFound();

  return (
    <SiteShell products={allProducts}>
      <main className="shell page-main category-page">
        <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>{category.name}</span></div>
        <section className="category-hero-card">
          <div className="category-hero-emoji">{category.emoji}</div>
          <div><span className="section-eyebrow">পণ্যের ক্যাটাগরি</span><h1>{category.name}</h1><p>{category.description}</p></div>
          <span className="category-hero-count">{products.length.toLocaleString("bn-BD")}টি পণ্য</span>
        </section>
        <section className="category-products-section">
          <SectionHeading title={`${category.name} এর পণ্যসমূহ`} description="দাম অনুযায়ী সাজিয়ে আপনার প্রয়োজনীয় পণ্যটি খুঁজে নিন।" />
          <ProductGrid products={products} showCategories={false} />
        </section>
      </main>
    </SiteShell>
  );
}
