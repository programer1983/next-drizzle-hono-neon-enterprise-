import { Hono } from "hono";
import { getUser } from "../controllers/user.controllers";

const router = new Hono();

router.get("/", getUser);

export default router;
