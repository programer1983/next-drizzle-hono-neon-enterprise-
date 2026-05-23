import { Hono } from "hono";
import { handle } from "hono/vercel";
import userRouting from "./routes/user.routes";
import productRouting from "./routes/product.routes";
import commentRouting from "./routes/comment.routes";

export const dynamic = "force-dynamic";

const app = new Hono().basePath("/api");

const routes = app
  .route("/users", userRouting)
  .route("/products", productRouting)
  .route("/comments", commentRouting);

export type AppType = typeof routes;

export const GET = handle(routes);
export const POST = handle(routes);
export const PUT = handle(routes);
export const DELETE = handle(routes);
