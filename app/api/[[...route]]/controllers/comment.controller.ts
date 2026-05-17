import { Context } from "hono";
import * as queries from "@/db/queries";
import { getAuth } from "@clerk/hono";

/* ==== CREATE COMMENT ========================================================================= */
export const createComment = async (c: Context) => {
  try {
    const auth = getAuth(c);
    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
    const productId = c.req.param("productId");
    if (!productId) return c.json({ error: "Missing product id" }, 400);
    const { content } = await c.req.json();
    if (!content) return c.json({ error: "Comment content is required" }, 400);
    const product = await queries.getProductById(productId);
    if (!product) return c.json({ error: "Product not found" }, 404);

    const comment = await queries.createComment({
      content,
      productId,
      userId: auth.userId,
    });
    return c.json(comment, 201);
  } catch (error) {
    console.error("Error creating comment:", error);
    return c.json({ error: "Failed to create comment" }, 500);
  }
};

/* ==== DELETE COMMENT ========================================================================= */
export const deleteComment = async (c: Context) => {
  try {
    const auth = getAuth(c);
    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
    const commentId = c.req.param("commentId");
    if (!commentId) return c.json({ error: "Missing comment id" }, 400);
    const existingComment = await queries.getCommentByID(commentId);
    if (!existingComment) return c.json({ error: "Comment not found " }, 404);
    if (existingComment.userId !== auth.userId)
      return c.json({ error: "You can only delete your own comments " }, 403);

    await queries.deleteComment(commentId);

    return c.json({ message: "Comment deleted successfully" }, 200);
  } catch (error) {
    console.error("Error deleting comment:", error);
    return c.json({ error: "Failed to delete comment" }, 500);
  }
};
