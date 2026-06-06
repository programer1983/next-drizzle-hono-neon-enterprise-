"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@clerk/nextjs";
import { useProduct, useDeleteProduct } from "@/hooks/useProducts";
import CommentSection from "@/components/CommentSection";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CalendarIcon,
  Edit3Icon,
  EditIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const { userId } = useAuth();
  const routes = useRouter();

  const { data: product, isLoading, error } = useProduct(id);
  const deleteProduct = useDeleteProduct();

  const handleDelete = () => {
    if (confirm("Delete this product permanently?")) {
      deleteProduct.mutate(id, { onSuccess: () => routes.push("/") });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Product Not Found</h2>
          <Link href="/" className="btn btn-sm btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = userId === product.userId;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="btn btn-ghost btn-sm gap-1 mb-4">
          <ArrowLeftIcon className="size-4" /> Back
        </Link>
        {isOwner && (
          <div className="flex gap-2">
            <Link
              href={`/edit/${product.id}`}
              className="btn btn-ghost btn-sm gap-1"
            >
              <EditIcon className="size-4" /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-sm gap-1"
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? (
                <span className="loading loadimg-spinner loading-xs" />
              ) : (
                <Trash2Icon className="size-4" />
              )}
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card bg-base-300">
          <figure className="p-4">
            <picture>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="rounded-xs h-80 w-full object-cover"
              />
            </picture>
          </figure>
        </div>
        <div className="card bg-base-300">
          <div className="card-body">
            <h1 className="card-title text-2xl">{product.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-4" />
                {new Date(product.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="size-4" />
                {product.user?.name}
              </div>
            </div>
            <div className="divider my-2" />
            <p className="text-base-content/80 leading-relaxed">
              {product.description}
            </p>
            {product.user && (
              <>
                <div className="divider my-2" />
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100">
                      <picture>
                        <img
                          src={product.user.imageUrl ?? "/default-avatar.png"}
                          alt={product.user.name ?? "User avatar"}
                        />
                      </picture>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{product.user.name}</p>
                    <p className="text-sm text-base-content/50">Creator</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="card bg-base-300">
        <div className="card-body">
          <CommentSection />
        </div>
      </div>
    </div>
  );
}
