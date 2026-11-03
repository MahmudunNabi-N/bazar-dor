import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Product } from "@/lib/types";

export function SiteShell({ products, children }: { products: Product[]; children: ReactNode }) {
  return (
    <>
      <Navbar products={products} />
      {children}
      <Footer />
    </>
  );
}
