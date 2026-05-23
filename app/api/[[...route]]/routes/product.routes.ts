import { Hono } from "hono";
import * as productController from "../controllers/product.comtroller";

const router = new Hono()
  .get("/", productController.getAllProducts)
  .get("/my", productController.getMyProducts)
  .get("/:id", productController.getProductById)
  .post("/", productController.createProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

export default router;
