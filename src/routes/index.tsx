import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/shopify.functions";

export const Route = createFileRoute("/")({
  component: Index,
  loader: () => getProducts(),
  head: () => ({
    meta: [
      { title: "Sri Vishnu Priya Jewellers | Timeless Gold & Diamond Jewellery" },
      {
        name: "description",
        content:
          "Discover exquisite gold, diamond, and temple jewellery at Sri Vishnu Priya Jewellers. Crafted with tradition, elegance, and trust.",
      },
      { property: "og:title", content: "Sri Vishnu Priya Jewellers" },
      {
        property: "og:description",
        content: "Timeless gold, diamond, and temple jewellery crafted with devotion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const products = useLoaderData({ from: "/" });

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <section id="collections" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            Our Collections
          </h2>
          <p className="mt-3 text-muted-foreground">
            Handpicked jewellery for every occasion
          </p>
        </div>
        <ProductGrid products={products} />
      </section>
      <section id="about" className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-medium text-foreground">About Us</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Sri Vishnu Priya Jewellers has been a trusted name in fine jewellery for decades. We
            blend traditional craftsmanship with contemporary designs to bring you pieces that are
            cherished for a lifetime.
          </p>
        </div>
      </section>
    </main>
  );
}
