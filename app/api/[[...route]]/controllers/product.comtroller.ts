import { Context } from "hono";
import * as queries from "@/db/queries";
import { getAuth } from "@clerk/hono";

/* ====== GET ALL PRODUCTS  ================================================================ */
export const getAllProducts = async (c: Context) => {
  try {
    const products = await queries.getAllProducts();
    return c.json(products, 200);
  } catch (error) {
    console.error("Error getting products:", error);
    return c.json({ error: "Failed to get products" }, 500);
  }
};

/* ====== GET PRODUCT BY CURRENT USER ======================================================= */
export const getMyProducts = async (c: Context) => {
  try {
    const auth = getAuth(c);
    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
    const products = await queries.getProductByUserId(auth.userId);
    return c.json(products, 200);
  } catch (error) {
    console.error("Error getting user products:", error);
    return c.json({ error: "Failed to get user products" }, 500);
  }
};

/* ===== GET SINGLE PRODUCT BY  ID ========================================================== */
export const getProductById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    if (!id) return c.json({ error: "Product not found" }, 404);
    const product = await queries.getProductById(id);
    if (!product) return c.json({ error: "Product not found" }, 404);
    return c.json(product, 200);
  } catch (error) {
    console.error("Error getting product:", error);
    return c.json({ error: "Failed to get product" }, 500);
  }
};

/* ===== CREATE PRODUCT ===================================================================== */
export const createProduct = async (c: Context) => {
  try {
    const auth = getAuth(c);
    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
    const { title, description, imageUrl } = await c.req.json();
    if (!title || !description || !imageUrl)
      return c.json(
        { message: "Title, description, and imageUrl are required" },
        400,
      );
    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId: auth.userId,
    });
    return c.json(product, 201);
  } catch (error) {
    console.error("Error creating product:", error);
    return c.json({ error: "Failed to create product" }, 500);
  }
};

/* ===== UPDATE PRODUCT ===================================================================== */
export const updateProduct = async (c: Context) => {
  try {
    const auth = getAuth(c);
    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    if (!id) return c.json({ error: "Product not found" }, 400);
    const { title, description, imageUrl } = await c.req.json();
    const existingProduct = await queries.getProductById(id);

    if (!existingProduct) return c.json({ error: "Product not found" }, 404);

    if (existingProduct.userId !== auth.userId)
      return c.json({ error: "You can only update your own products" }, 403);

    const product = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });
    return c.json(product, 200);
  } catch (error) {
    console.error("Error updating product:", error);
    return c.json({ error: "Failed to update product" }, 500);
  }
};

/* ===== DELETE PRODUCT ===================================================================== */
export const deleteProduct = async (c: Context) => {
  try {
    const auth = getAuth(c);
    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    if (!id) return c.json({ error: "Missing product id" }, 400);
    const existingProduct = await queries.getProductById(id);

    if (!existingProduct) return c.json({ error: "Product not found" }, 404);

    if (existingProduct.userId !== auth.userId)
      return c.json({ error: "You can only deleted your own products" }, 403);

    await queries.deleteProduct(id);
    return c.json({ message: "Product deleted successfully" }, 200);
  } catch (error) {
    console.error("Error deleting product:", error);
    return c.json({ error: "Failed to delete product" }, 500);
  }
};
