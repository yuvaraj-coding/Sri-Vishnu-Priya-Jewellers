import { createServerFn } from "@tanstack/react-start";
import {
  fetchProducts,
  fetchProductByHandle,
  type ShopifyProduct,
} from "./shopify";

export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  const products = await fetchProducts(50);
  return products;
});

export const getProductByHandle = createServerFn({ method: "GET" })
  .inputValidator((data) => {
    if (typeof data !== "object" || data === null || !("handle" in data)) {
      throw new Error("handle is required");
    }
    return data as { handle: string };
  })
  .handler(async ({ data }) => {
    const product = await fetchProductByHandle(data.handle);
    return product;
  });
