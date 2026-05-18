import { Hono } from "hono";
import { handle } from "hono/vercel";
import userRouting from "./routes/user.routes";
import productRouting from "./routes/product.routes";
import commentRouting from "./routes/comment.routes";

export const dynamic = "force-dynamic";

const app = new Hono().basePath("/api");

app.route("/users", userRouting);
app.route("/products", productRouting);
app.route("/comments", commentRouting);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
