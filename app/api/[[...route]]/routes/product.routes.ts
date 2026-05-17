import { Hono } from "hono";
import * as productController from "../controllers/product.comtroller";

const router = new Hono();

router.get("/", productController.getAllProducts);
router.get("/my", productController.getMyProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
