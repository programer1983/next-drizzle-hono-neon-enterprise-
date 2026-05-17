import { Hono } from "hono";
import { handle } from "hono/vercel";
import userRouting from "./routes/user.routes";
import productRouting from "./routes/product.routes";
import commentRouting from "./routes/comment.routes";
import { clerkMiddleware } from "@clerk/hono";

const app = new Hono().basePath("/api");

app.use("*", clerkMiddleware());

app.get("/", (c) => {
  return c.json({
    message:
      "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.route("/users", userRouting);
app.route("/products", productRouting);
app.route("/comments", commentRouting);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
