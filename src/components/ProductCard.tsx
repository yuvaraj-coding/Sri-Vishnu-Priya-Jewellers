import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCartStore, type CartItem } from "@/stores/cartStore";
import { useState } from "react";
import type { ShopifyProduct } from "@/lib/shopify";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const [adding, setAdding] = useState(false);

  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!variant) return;
    setAdding(true);
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    } as Omit<CartItem, "lineId">);
    setAdding(false);
  };

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card p-3 transition-shadow hover:shadow-lg">
      <Link to="/product/$handle" params={{ handle: product.node.handle }} className="relative overflow-hidden rounded-lg bg-muted">
        <div className="aspect-square w-full">
          {image ? (
            <img
              src={image.url}
              alt={image.altText ?? product.node.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              No image
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <Link to="/product/$handle" params={{ handle: product.node.handle }}>
          <h3 className="font-display text-lg font-medium text-card-foreground transition-colors group-hover:text-gold">
            {product.node.title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {product.node.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">
            {product.node.priceRange.minVariantPrice.currencyCode}{" "}
            {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={!variant?.availableForSale || isLoading || adding}
            size="sm"
            className="bg-gold text-gold-foreground hover:bg-gold/90"
          >
            {adding || isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
