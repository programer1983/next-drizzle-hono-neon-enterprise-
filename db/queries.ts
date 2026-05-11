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

export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({ where: eq(users.id, id) });
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();

  return user;
};

export const upsertUser = async (data: NewUser) => {
  const existingUser = await getUserById(data.id);

  if (existingUser) return updateUser(data.id, data);

  return createUser(data);
};
