import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { ProductDetail } from "@/components/product-detail";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug.toLowerCase() === slug.toLowerCase() || item.id.toLowerCase() === slug.toLowerCase());
  if (!product) notFound();

  return (
    <SiteShell products={products}>
      <ProductDetail product={product} />
    </SiteShell>
  );
}
