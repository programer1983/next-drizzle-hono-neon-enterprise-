import { Hono } from "hono";
import * as commentController from "./../controllers/comment.controller";

const router = new Hono();

router.get("/:productId", commentController.createComment);
router.get("/:commentId", commentController.deleteComment);

export default router;
