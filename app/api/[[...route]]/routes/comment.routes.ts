import { Hono } from "hono";
import { getUser } from "../controllers/user.controller";

const router = new Hono();

// router.get("/", getComment());

export default router;
