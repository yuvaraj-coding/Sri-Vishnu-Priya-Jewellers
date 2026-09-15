import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  createCollection,
  createItem,
  deleteCollection,
  deleteItem,
  fetchCollections,
  fetchItems,
  formatPrice,
} from "@/lib/catalog";
import { isAdminUnlocked, lockAdmin } from "@/lib/gate.functions";
import ImagePicker from "@/components/ImagePicker";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { unlocked } = await isAdminUnlocked();
    if (!unlocked) throw redirect({ to: "/unlock" });
  },
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin | Sri Vishnu Priya Jewellers" },
      {
        name: "description",
        content: "Manage jewellery collections and items for Sri Vishnu Priya Jewellers.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin | Sri Vishnu Priya Jewellers" },
      { property: "og:description", content: "Manage collections and items." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold";
const labelClass = "mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground";
const buttonClass =
  "inline-flex items-center justify-center rounded-md bg-gold px-4 py-2 text-sm font-medium text-gold-foreground transition-colors hover:bg-gold/90 disabled:opacity-60";

function AdminPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const collections = useQuery({ queryKey: ["collections"], queryFn: fetchCollections });
  const items = useQuery({ queryKey: ["items"], queryFn: fetchItems });

  const [colName, setColName] = useState("");
  const [colDesc, setColDesc] = useState("");
  const [colImage, setColImage] = useState("");

  const [itemCollection, setItemCollection] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState("");

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["collections"] });
    queryClient.invalidateQueries({ queryKey: ["items"] });
  };

  const addCollection = useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      toast.success("Collection added");
      setColName("");
      setColDesc("");
      setColImage("");
      invalidate();
    },
    onError: (e: Error) => toast.error("Could not add collection", { description: e.message }),
  });

  const removeCollection = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      toast.success("Collection deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error("Could not delete", { description: e.message }),
  });

  const addItem = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      toast.success("Item added");
      setItemTitle("");
      setItemDesc("");
      setItemPrice("");
      setItemImage("");
      invalidate();
    },
    onError: (e: Error) => toast.error("Could not add item", { description: e.message }),
  });

  const removeItem = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      toast.success("Item deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error("Could not delete", { description: e.message }),
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add collections and jewellery items shown on your home page.
          </p>
        </div>
        <button
          onClick={async () => {
            await lockAdmin();
            await router.navigate({ to: "/unlock" });
          }}
          className="shrink-0 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Lock
        </button>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-medium text-foreground">Add a collection</h2>
        <form
          className="mt-5 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!colName.trim()) return;
            addCollection.mutate({
              name: colName.trim(),
              description: colDesc.trim() || null,
              image_url: colImage.trim() || null,
            });
          }}
        >
          <div>
            <label className={labelClass} htmlFor="col-name">
              Collection name
            </label>
            <input
              id="col-name"
              className={inputClass}
              value={colName}
              onChange={(e) => setColName(e.target.value)}
              placeholder="Temple Jewellery"
              required
            />
          </div>
          <ImagePicker label="Photo (optional)" value={colImage} onChange={setColImage} />
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="col-desc">
              Description (optional)
            </label>
            <textarea
              id="col-desc"
              className={inputClass}
              rows={2}
              value={colDesc}
              onChange={(e) => setColDesc(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={buttonClass} disabled={addCollection.isPending}>
              {addCollection.isPending ? "Adding..." : "Add collection"}
            </button>
          </div>
        </form>

        <div className="mt-8 space-y-3">
          {collections.isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
          {collections.data?.length === 0 && (
            <p className="text-sm text-muted-foreground">No collections yet.</p>
          )}
          {collections.data?.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{c.name}</p>
                {c.description && (
                  <p className="truncate text-sm text-muted-foreground">{c.description}</p>
                )}
              </div>
              <button
                onClick={() => removeCollection.mutate(c.id)}
                className="shrink-0 text-sm text-destructive hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-medium text-foreground">Add a jewellery item</h2>
        <form
          className="mt-5 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!itemTitle.trim()) return;
            addItem.mutate({
              collection_id: itemCollection || null,
              title: itemTitle.trim(),
              description: itemDesc.trim() || null,
              price: itemPrice ? Number(itemPrice) : null,
              image_url: itemImage.trim() || null,
            });
          }}
        >
          <div>
            <label className={labelClass} htmlFor="item-collection">
              Collection
            </label>
            <select
              id="item-collection"
              className={inputClass}
              value={itemCollection}
              onChange={(e) => setItemCollection(e.target.value)}
            >
              <option value="">Uncategorised</option>
              {collections.data?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="item-title">
              Item name
            </label>
            <input
              id="item-title"
              className={inputClass}
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              placeholder="Antique Lakshmi Haram"
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="item-price">
              Price (INR, optional)
            </label>
            <input
              id="item-price"
              type="number"
              min="0"
              step="1"
              className={inputClass}
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </div>
          <ImagePicker label="Photo (optional)" value={itemImage} onChange={setItemImage} />
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="item-desc">
              Description (optional)
            </label>
            <textarea
              id="item-desc"
              className={inputClass}
              rows={2}
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={buttonClass} disabled={addItem.isPending}>
              {addItem.isPending ? "Adding..." : "Add item"}
            </button>
          </div>
        </form>

        <div className="mt-8 space-y-3">
          {items.data?.length === 0 && (
            <p className="text-sm text-muted-foreground">No items yet.</p>
          )}
          {items.data?.map((it) => (
            <div
              key={it.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{it.title}</p>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(it.price, it.currency)}
                  {" · "}
                  {collections.data?.find((c) => c.id === it.collection_id)?.name ??
                    "Uncategorised"}
                </p>
              </div>
              <button
                onClick={() => removeItem.mutate(it.id)}
                className="shrink-0 text-sm text-destructive hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
