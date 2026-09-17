import { useQuery } from "@tanstack/react-query";
import { fetchCollections, fetchItems, formatPrice } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useLocalCartStore } from "@/stores/localCartStore";

export function CollectionSections() {
  const addToCart = useLocalCartStore((state) => state.addItem);
  const collections = useQuery({ queryKey: ["collections"], queryFn: fetchCollections });
  const items = useQuery({ queryKey: ["items"], queryFn: fetchItems });

  const cols = collections.data ?? [];
  const allItems = items.data ?? [];
  if (cols.length === 0 && allItems.length === 0) return null;

  const groups = [
    ...cols.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      items: allItems.filter((i) => i.collection_id === c.id),
    })),
    {
      id: "uncategorised",
      name: "More Jewellery",
      description: null,
      items: allItems.filter((i) => !i.collection_id),
    },
  ].filter((g) => g.items.length > 0 || g.id !== "uncategorised");

  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <section key={group.id}>
          <div className="mb-6 text-center">
            <h3 className="font-display text-2xl font-medium text-foreground sm:text-3xl">
              {group.name}
            </h3>
            {group.description && (
              <p className="mt-2 text-muted-foreground">{group.description}</p>
            )}
          </div>
          {group.items.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">Items coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.items.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="aspect-square w-full overflow-hidden bg-muted">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-display text-lg font-medium text-foreground">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                    <p className="mt-3 text-sm font-medium text-gold">
                      {formatPrice(item.price, item.currency)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
