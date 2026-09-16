import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchShopInfo } from "@/lib/shopInfo";

export const Route = createFileRoute("/contact")({
  ssr: false,
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us | Sri Vishnu Priya Jewellers" },
      {
        name: "description",
        content:
          "Visit or call Sri Vishnu Priya Jewellers — shop address, phone number, WhatsApp, email and opening hours.",
      },
      { property: "og:title", content: "Contact Sri Vishnu Priya Jewellers" },
      {
        property: "og:description",
        content: "Shop address, phone, WhatsApp, email and opening hours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border py-4 last:border-0 sm:flex sm:gap-6">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:w-40 sm:shrink-0">
        {label}
      </p>
      <p className="mt-1 whitespace-pre-line text-base leading-relaxed text-foreground sm:mt-0">
        {value}
      </p>
    </div>
  );
}

function ContactPage() {
  const { data, isLoading } = useQuery({ queryKey: ["shop_info"], queryFn: fetchShopInfo });

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 text-muted-foreground">
          We would love to welcome you to our showroom.
        </p>

        {isLoading && <p className="mt-10 text-sm text-muted-foreground">Loading…</p>}

        {!isLoading && !data && (
          <p className="mt-10 text-sm text-muted-foreground">
            Shop details will appear here soon.
          </p>
        )}

        {data && (
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <Row label="Shop" value={data.shop_name} />
            {data.address && <Row label="Address" value={data.address} />}
            {data.phone && <Row label="Phone" value={data.phone} />}
            {data.whatsapp && <Row label="WhatsApp" value={data.whatsapp} />}
            {data.email && <Row label="Email" value={data.email} />}
            {data.hours && <Row label="Opening hours" value={data.hours} />}
            {data.note && <Row label="Good to know" value={data.note} />}
            {data.map_url && (
              <div className="pt-6">
                <a
                  href={data.map_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-colors hover:bg-gold/90"
                >
                  Get directions
                </a>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
