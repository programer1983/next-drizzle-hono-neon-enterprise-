import { Hono } from "hono";
import * as productController from "../controllers/product.comtroller";

const router = new Hono();

router.get("/", productController.getAllProducts);

export default router;
