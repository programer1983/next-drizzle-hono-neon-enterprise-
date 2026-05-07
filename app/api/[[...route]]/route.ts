import { Hono } from "hono";
import { handle } from "hono/vercel";
import userRouting from "./routes/user.routes";

const app = new Hono().basePath("/api");

app.route("/user", userRouting);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
