import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchProducts, fetchProductByHandle, type ShopifyProduct } from "./shopify";

export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  const products = await fetchProducts(50);
  return products;
});

const productHandleSchema = z.object({
  handle: z.string(),
});

export const getProductByHandle = createServerFn({ method: "GET" })
  .inputValidator((data) => productHandleSchema.parse(data))
  .handler(async ({ data }) => {
    const product = await fetchProductByHandle(data.handle);
    return product;
  });

export type { ShopifyProduct };
