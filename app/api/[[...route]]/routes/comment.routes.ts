import { Hono } from "hono";
import { getUser } from "../controllers/user.controllers";

const router = new Hono();

// router.get("/", getComment());

export default router;