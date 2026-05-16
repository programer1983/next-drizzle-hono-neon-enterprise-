import { Context } from "hono";
import * as queries from "@/db/queries";
import { getAuth } from "@clerk/hono";

export async function syncUser(c: Context) {
  try {
    const auth = getAuth(c);
    const userId = auth?.userId;

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { name, email, imageUrl } = await c.req.json();

    if (!name || !email || !imageUrl) {
      return c.json({ error: "Email, name, and imageUrl are required" }, 400);
    }

    const user = await queries.upsertUser({
      id: userId,
      name,
      email,
      imageUrl,
    });

    return c.json(user, 200);
  } catch (error) {
    console.log("Error syncing user:", error);
    return c.json({ error: "Failed to sync user" }, 500);
  }
}
