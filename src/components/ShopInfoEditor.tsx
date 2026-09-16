import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchShopInfo, saveShopInfo, type ShopInfo } from "@/lib/shopInfo";

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold";
const labelClass = "mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground";
const buttonClass =
  "inline-flex items-center justify-center rounded-md bg-gold px-4 py-2 text-sm font-medium text-gold-foreground transition-colors hover:bg-gold/90 disabled:opacity-60";

const empty = {
  shop_name: "Sri Vishnu Priya Jewellers",
  address: "",
  phone: "",
  whatsapp: "",
  email: "",
  hours: "",
  map_url: "",
  note: "",
};

export function ShopInfoEditor() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["shop_info"], queryFn: fetchShopInfo });
  const [form, setForm] = useState(empty);
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!data) return;
    setId(data.id);
    setForm({
      shop_name: data.shop_name ?? "",
      address: data.address ?? "",
      phone: data.phone ?? "",
      whatsapp: data.whatsapp ?? "",
      email: data.email ?? "",
      hours: data.hours ?? "",
      map_url: data.map_url ?? "",
      note: data.note ?? "",
    });
  }, [data]);

  const save = useMutation({
    mutationFn: () =>
      saveShopInfo({
        ...(id ? { id } : {}),
        shop_name: form.shop_name.trim() || "Sri Vishnu Priya Jewellers",
        address: form.address.trim() || null,
        phone: form.phone.trim() || null,
        whatsapp: form.whatsapp.trim() || null,
        email: form.email.trim() || null,
        hours: form.hours.trim() || null,
        map_url: form.map_url.trim() || null,
        note: form.note.trim() || null,
      } as ShopInfo),
    onSuccess: () => {
      toast.success("Contact details saved");
      queryClient.invalidateQueries({ queryKey: ["shop_info"] });
    },
    onError: (e: Error) => toast.error("Could not save", { description: e.message }),
  });

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <section className="mt-10 rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-xl font-medium text-foreground">Contact page details</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        These details are shown to visitors on the Contact Us page.
      </p>

      {isLoading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading…</p>
      ) : (
        <form
          className="mt-5 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
        >
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="shop-name">
              Shop name
            </label>
            <input id="shop-name" className={inputClass} {...field("shop_name")} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="shop-address">
              Address
            </label>
            <textarea id="shop-address" rows={2} className={inputClass} {...field("address")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="shop-phone">
              Phone
            </label>
            <input id="shop-phone" className={inputClass} {...field("phone")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="shop-whatsapp">
              WhatsApp
            </label>
            <input id="shop-whatsapp" className={inputClass} {...field("whatsapp")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="shop-email">
              Email
            </label>
            <input id="shop-email" className={inputClass} {...field("email")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="shop-map">
              Map link (optional)
            </label>
            <input id="shop-map" className={inputClass} {...field("map_url")} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="shop-hours">
              Opening hours
            </label>
            <textarea id="shop-hours" rows={2} className={inputClass} {...field("hours")} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="shop-note">
              Good to know (optional)
            </label>
            <textarea id="shop-note" rows={2} className={inputClass} {...field("note")} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={buttonClass} disabled={save.isPending}>
              {save.isPending ? "Saving…" : "Save contact details"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
