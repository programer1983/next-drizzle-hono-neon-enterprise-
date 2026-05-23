import { Hono } from "hono";
import { syncUser } from "../controllers/user.controller";

const router = new Hono().post("/sync", syncUser);

export default router;
