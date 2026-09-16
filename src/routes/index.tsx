import { createFileRoute } from "@tanstack/react-router";
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
  return <Hero />;
}
