import { db } from "./index";
import { eq } from "drizzle-orm";
import {
  users,
  products,
  comments,
  type NewUser,
  type NewComment,
  type NewProduct,
} from "./schema";

/* =========== USER QUERIES ============================================================================ */

// CREATE USER
export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

// GET USER BY ID
export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({ where: eq(users.id, id) });
};

// UPDATE USER
export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    throw new Error(`User with ${id} not found`);
  }

  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();

  return user;
};

// UPSERT USER
export const upsertUser = async (data: NewUser) => {
  // const existingUser = await getUserById(data.id);
  // if (existingUser) return updateUser(data.id, data);
  // return createUser(data);

  const [user] = await db
    .insert(users)
    .values(data)
    .onConflictDoUpdate({
      target: users.id,
      set: data,
    })
    .returning();
  return user;
};

/* =========== PRODUCT QUERIES ============================================================================ */

// CREATE PRODUCT
export const createProduct = async (data: NewProduct) => {
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

// GET ALL PRODUCTS
export const getAllProducts = async () => {
  return await db.query.products.findMany({
    with: { user: true, comments: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
};

// GET PRODUCTS BY ID
export const getProductById = async (id: string) => {
  return await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      user: true,
      comments: {
        with: { user: true },
        orderBy: (comments, { desc }) => [desc(comments.createdAt)],
      },
    },
  });
};

// GET PRODUCT BY USER
export const getProductByUserId = async (userId: string) => {
  return await db.query.products.findMany({
    where: eq(products.userId, userId),
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
};

// UPDATE PRODUCT
export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw new Error(`Product with ${id} not found`);
  }

  const [product] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return product;
};

// DELETE PRODUCT
export const deleteProduct = async (id: string) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw new Error(`Product with ${id} not found`);
  }

  const [product] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();
  return product;
};

/* =========== COMENTS QUERIES ============================================================================ */

// CREATE COMMENT
export const createComment = async (data: NewComment) => {
  const [comment] = await db.insert(comments).values(data).returning();
  return comment;
};

// DELETE COMMENT
export const deleteComment = async (id: string) => {
  const existingComment = await getCommentByID(id);
  if (!existingComment) {
    throw new Error(`Comment with ${id} not found`);
  }

  const [comment] = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning();
  return comment;
};

// GET COMMENT BY ID
export const getCommentByID = async (id: string) => {
  return await db.query.comments.findFirst({
    where: eq(comments.id, id),
    with: { user: true },
  });
};
