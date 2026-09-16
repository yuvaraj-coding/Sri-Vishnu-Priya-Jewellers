import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";

export const Route = createFileRoute("/")({
  component: Index,
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
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            Our Collections
          </h2>
          <p className="mt-3 text-muted-foreground">
            Handpicked jewellery for every occasion
          </p>
          <Link
            to="/collections"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-colors hover:bg-gold/90"
          >
            Explore Collections
          </Link>
        </div>
      </section>
    </main>
  );
}
