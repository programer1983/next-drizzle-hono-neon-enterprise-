"use client";
import useAuthReq from "@/hooks/useAuthReq";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMyProducts, useDeleteProduct } from "@/hooks/useProducts";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  PlusIcon,
  PackageIcon,
  EyeIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react";

const ProfilePage = () => {
  const { isSignedIn, isClerkLoaded } = useAuthReq();
  const router = useRouter();
  const { data: products, isLoading } = useMyProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) deleteProduct.mutate(id);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isSignedIn || !isClerkLoaded) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pt-8 pb-6 lg:pb-20 lg:pt-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Product</h1>
          <p className="text-base-content/50 text-sm">Manage Your Listing</p>
        </div>
        <Link href="/create" className="btn btn-primary btn-sm gap-1">
          <PlusIcon className="size-4" /> New
        </Link>
      </div>
      <div className="stats bg-base-300 w-full">
        <div className="stat">
          <div className="stat-title">Total Products</div>
          <div className="stat-value text-primary">{products?.length || 0}</div>
        </div>
      </div>
      {products?.length === 0 ? (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-16">
            <PackageIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">No products yet</h3>
            <p className="text-base-content/40 text-sm">
              Start by creating your first product
            </p>
            <Link href="/create" className="btn btn-primary btn-sm mt-4">
              Cretate Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {products?.map((product) => (
            <div key={product.id} className="card card-side bg-base-300">
              <figure className="w-32 shrink-0">
                <picture>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full object-cover"
                  />
                </picture>
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-base">{product.title}</h2>
                <p className="text-sm text-base-content/60 line-clamp-1">
                  {product.description}
                </p>
                <div className="card-actions justify-end mt-2">
                  <button
                    onClick={() => router.push(`/product/${product.id}`)}
                    className="btn btn-ghost btn-xs gap-1"
                  >
                    <EyeIcon className="size-3" /> View
                  </button>
                  <button
                    onClick={() => router.push(`/edit/${product.id}`)}
                    className="btn btn-ghost btn-xs gap-1"
                  >
                    <EditIcon className="size-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-ghost text-error btn-xs gap-1"
                    disabled={deleteProduct.isPending}
                  >
                    <Trash2Icon className="size-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
