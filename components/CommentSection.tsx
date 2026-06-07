"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { useCreateComment, useDeleteComment } from "@/hooks/useComments";
import {
  SendIcon,
  Trash2Icon,
  MessageSquareIcon,
  LogInIcon,
} from "lucide-react";
interface CommentUser {
  id: string;
  name: string | null;
  imageUrl: string | null;
}
interface Comment {
  id: string;
  content: string;
  createdAt: string | Date;
  userId: string;
  user: CommentUser;
}
interface CommentSectionProps {
  productId: string;
  comments: Comment[];
  currentUserId: string | null | undefined;
}

export default function CommentSection({
  productId,
  comments,
  currentUserId,
}: CommentSectionProps) {
  const { isSignedIn } = useAuth();
  const [content, setContent] = useState("");
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (!currentUserId) return;
    createComment.mutate(
      { productId, content, userId: currentUserId },
      { onSuccess: () => setContent("") },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquareIcon className="size-5 text-primary" />
        <h3 className="font-bold">Comments</h3>
        <span className="badge badge-neutral badge-sm">{comments.length}</span>
      </div>
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="input input-bordered input-sm flex-1 bg-base-200 focus:outline-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={createComment.isPending}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm btn-square"
            disabled={createComment.isPending || !content.trim()}
          >
            {createComment.isPending ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between bg-base-200 rounded-lg p-3">
          <span className="text-sm text-base-content/60">
            Sign in to join the conversation
          </span>
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-sm gap-1">
              <LogInIcon className="size-4" />
              Sign In
            </button>
          </SignInButton>
        </div>
      )}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-base-content/50">
            <MessageSquareIcon className="size-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No comments yet. Be first!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <picture>
                    <img
                      alt={comment.user?.name ?? "User Name"}
                      src={comment.user?.imageUrl ?? "User Avatar"}
                    />
                  </picture>
                </div>
              </div>
              <div className="chat-header text-sm opacity-70 mb-2">
                {comment.user?.name}
                <time className="ml-2 text-xs opacity-50">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>
              </div>
              <div className="chat-bubble chat-bubble-neutral text-sm">
                {comment.content}
              </div>
              {currentUserId === comment.userId && (
                <div className="chat-footer">
                  <button
                    onClick={() =>
                      confirm("Delete") &&
                      deleteComment.mutate({
                        commentId: comment.id,
                        productId: productId,
                      })
                    }
                    className="btn btn-ghost text-error btn-sm"
                    disabled={deleteComment.isPending}
                  >
                    {deleteComment.isPending ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <Trash2Icon className="size-3" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
