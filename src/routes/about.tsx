import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us | Sri Vishnu Priya Jewellers" },
      {
        name: "description",
        content:
          "Learn about Sri Vishnu Priya Jewellers — traditional craftsmanship and timeless designs, trusted for decades.",
      },
      { property: "og:title", content: "About Us | Sri Vishnu Priya Jewellers" },
      {
        property: "og:description",
        content: "Traditional craftsmanship and timeless designs, trusted for decades.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
          About Us
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Sri Vishnu Priya Jewellers has been a trusted name in fine jewellery for decades. We
          blend traditional craftsmanship with contemporary designs to bring you pieces that are
          cherished for a lifetime.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          From antique temple jewellery to modern diamond collections, every piece is made with
          devotion, purity, and trust.
        </p>
      </section>
    </main>
  );
}
