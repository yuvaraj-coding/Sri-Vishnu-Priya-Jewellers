import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface LocalCartItem {
  id: string;
  title: string;
  price: number | null;
  currency: string;
  imageUrl: string | null;
  quantity: number;
}

interface LocalCartStore {
  items: LocalCartItem[];
  addItem: (item: Omit<LocalCartItem, "quantity">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useLocalCartStore = create<LocalCartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        set({
          items: existing
            ? get().items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
            : [...get().items, { ...item, quantity: 1 }],
        });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.id !== id) });
          return;
        }
        set({ items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)) });
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "catalog-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
