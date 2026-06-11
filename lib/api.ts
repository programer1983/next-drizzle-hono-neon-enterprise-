import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>("/");

// =========== USERS API =================================================================================
export const syncUser = async (userData: Record<string, unknown>) => {
  const res = await client.api.users.sync.$post({ json: userData });
  if (!res.ok) throw new Error("User synchronization error");
  return res.json();
};

// ===========  PRODUCTS API =================================================================================
export const getAllProducts = async () => {
  const res = await client.api.products.$get();
  if (!res.ok) throw new Error("Error receiving all products");
  return res.json();
};

export const getProductById = async (id: string) => {
  const res = await client.api.products[":id"].$get({ param: { id } });
  if (!res.ok) throw new Error(`Error receiving product with id ${id}`);
  return res.json();
};

export const getMyProducts = async () => {
  const res = await client.api.products.my.$get();
  if (!res.ok) throw new Error("Error receiving my products");
  return res.json();
};

export const createProduct = async (productData: Record<string, unknown>) => {
  const res = await client.api.products.$post({ json: productData });
  if (!res.ok) throw new Error("Error creating product");
  return res.json();
};

// export const updateProduct = async ({
//   id,
//   ...productData
// }: {
//   id: string;
//   [key: string]: unknown;
// }) => {
//   const res = await client.api.products[":id"].$put({
//     param: { id },
//     json: productData,
//   });
//   if (!res.ok) throw new Error("Product update error");
//   return res.json();
// };

export const updateProduct = async ({
  id,
  ...productData
}: {
  id: string;
  [key: string]: unknown;
}) => {
  type PutArgs = Parameters<(typeof client.api.products)[":id"]["$put"]>[0];
  type PermissivePutArgs = PutArgs & { json: Record<string, unknown> };

  const res = await client.api.products[":id"].$put({
    param: { id },
    json: productData,
  } as PermissivePutArgs);

  if (!res.ok) throw new Error("Product update error");
  return res.json();
};

export const deleteProduct = async (id: string) => {
  const res = await client.api.products[":id"].$delete({ param: { id } });
  if (!res.ok) throw new Error("Error deleting product");
  return res.json();
};

// ===========  COMMENTS API =================================================================================
export const createComment = async ({ productId }: { productId: string }) => {
  const res = await client.api.comments[":productId"].$post({
    param: { productId },
  });
  if (!res.ok) throw new Error("Error creating comment");
  return res.json();
};

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const res = await client.api.comments[":commentId"].$delete({
    param: { commentId },
  });
  if (!res.ok) throw new Error("Ошибка удаления комментария");
  return res.json();
};
