import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { CollectionSections } from "@/components/CollectionSections";
import { getProducts } from "@/lib/shopify.functions";

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
  loader: () => getProducts(),
  head: () => ({
    meta: [
      { title: "Collections | Sri Vishnu Priya Jewellers" },
      {
        name: "description",
        content:
          "Browse our gold, diamond, and temple jewellery collections at Sri Vishnu Priya Jewellers.",
      },
      { property: "og:title", content: "Collections | Sri Vishnu Priya Jewellers" },
      {
        property: "og:description",
        content: "Browse our gold, diamond, and temple jewellery collections.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function CollectionsPage() {
  const products = useLoaderData({ from: "/collections" });

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            Our Collections
          </h1>
          <p className="mt-3 text-muted-foreground">
            Handpicked jewellery for every occasion
          </p>
        </div>
        <CollectionSections />
        {products.length > 0 && (
          <div className="mt-14">
            <ProductGrid products={products} />
          </div>
        )}
      </section>
    </main>
  );
}
