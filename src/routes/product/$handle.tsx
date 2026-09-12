import { createFileRoute, useLoaderData, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft } from "lucide-react";
import { getProductByHandle } from "@/lib/shopify.functions";
import { useCartStore, type CartItem } from "@/stores/cartStore";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  loader: ({ params }) => getProductByHandle({ handle: params.handle }),
  head: ({ params }) => ({
    meta: [
      { title: `Product | Sri Vishnu Priya Jewellers` },
      {
        name: "description",
        content: "Explore this beautiful piece from Sri Vishnu Priya Jewellers.",
      },
      { property: "og:title", content: "Sri Vishnu Priya Jewellers" },
      {
        property: "og:description",
        content: "Exquisite jewellery crafted with tradition and elegance.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ProductPage() {
  const product = useLoaderData({ from: "/product/$handle" });
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const [adding, setAdding] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-medium text-foreground">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-gold hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  const image = product.images.edges[0]?.node;
  const variant = product.variants.edges[0]?.node;
  const allImages = product.images.edges.map((e) => e.node);

  const handleAddToCart = async () => {
    if (!variant) return;
    setAdding(true);
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    } as Omit<CartItem, "lineId">);
    setAdding(false);
  };

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to collections
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
              {image ? (
                <img
                  src={image.url}
                  alt={image.altText ?? product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                  >
                    <img
                      src={img.url}
                      alt={img.altText ?? `${product.title} ${idx + 2}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-foreground">
              {product.priceRange.minVariantPrice.currencyCode}{" "}
              {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {product.description || "No description available."}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={handleAddToCart}
                disabled={!variant?.availableForSale || isLoading || adding}
                size="lg"
                className="bg-gold px-10 text-gold-foreground hover:bg-gold/90"
              >
                {adding || isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Add to Cart"
                )}
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {product.options.length > 0 && (
              <div className="mt-10 border-t border-border pt-8">
                <h3 className="font-display text-lg font-medium text-foreground">Options</h3>
                <div className="mt-3 space-y-3">
                  {product.options.map((option) => (
                    <div key={option.name} className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{option.name}:</span>{" "}
                      {option.values.join(", ")}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
