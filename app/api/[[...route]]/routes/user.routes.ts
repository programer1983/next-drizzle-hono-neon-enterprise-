import { Hono } from "hono";
import { syncUser } from "../controllers/user.controllers";

const router = new Hono();

router.post("/sync", syncUser);

export default router;
