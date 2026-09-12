import { supabase } from "@/integrations/supabase/client";

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface CatalogItem {
  id: string;
  collection_id: string | null;
  title: string;
  description: string | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  available: boolean;
  created_at: string;
}

export async function fetchCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Collection[];
}

export async function fetchItems(): Promise<CatalogItem[]> {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CatalogItem[];
}

export async function createCollection(input: {
  name: string;
  description?: string | null;
  image_url?: string | null;
  sort_order?: number;
}) {
  const { error } = await supabase.from("collections").insert(input);
  if (error) throw error;
}

export async function deleteCollection(id: string) {
  const { error } = await supabase.from("collections").delete().eq("id", id);
  if (error) throw error;
}

export async function createItem(input: {
  collection_id: string | null;
  title: string;
  description?: string | null;
  price?: number | null;
  image_url?: string | null;
}) {
  const { error } = await supabase.from("items").insert(input);
  if (error) throw error;
}

export async function deleteItem(id: string) {
  const { error } = await supabase.from("items").delete().eq("id", id);
  if (error) throw error;
}

export function formatPrice(price: number | null, currency = "INR") {
  if (price == null) return "Price on request";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
