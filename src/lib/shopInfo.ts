import { supabase } from "@/integrations/supabase/client";

export interface ShopInfo {
  id: string;
  shop_name: string;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  hours: string | null;
  map_url: string | null;
  note: string | null;
}

export type ShopInfoInput = Omit<ShopInfo, "id">;

export async function fetchShopInfo(): Promise<ShopInfo | null> {
  const { data, error } = await supabase
    .from("shop_info")
    .select("id, shop_name, address, phone, whatsapp, email, hours, map_url, note")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as ShopInfo | null;
}

export async function saveShopInfo(input: ShopInfoInput & { id?: string }) {
  if (input.id) {
    const { id, ...rest } = input;
    const { error } = await supabase.from("shop_info").update(rest).eq("id", id);
    if (error) throw error;
    return;
  }
  const { error } = await supabase.from("shop_info").insert(input);
  if (error) throw error;
}
