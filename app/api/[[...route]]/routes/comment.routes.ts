import { Hono } from "hono";
import * as commentController from "./../controllers/comment.controller";

const router = new Hono()
  .post("/:productId", commentController.createComment)
  .delete("/:commentId", commentController.deleteComment);

export default router;
