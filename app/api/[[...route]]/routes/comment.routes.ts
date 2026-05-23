import { Hono } from "hono";
import * as commentController from "./../controllers/comment.controller";

const router = new Hono()
  .get("/:productId", commentController.createComment)
  .delete("/:commentId", commentController.deleteComment);

export default router;
