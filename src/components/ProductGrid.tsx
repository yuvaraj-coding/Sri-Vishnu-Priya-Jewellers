import { ProductCard } from "./ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";

interface ProductGridProps {
  products: ShopifyProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/50 py-24 text-center">
        <h3 className="font-display text-2xl font-medium text-foreground">No products found</h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Your store is connected, but there are no jewellery products yet. Tell me what you&apos;d
          like to add—gold necklaces, diamond rings, bangles, earrings—and I&apos;ll create them for
          you.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
}
