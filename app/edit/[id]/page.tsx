"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useProduct, useUpdateProduct } from "@/hooks/useProducts";
import LoadingSpinner from "@/components/LoadingSpinner";
import { EditProductForm } from "@/components/EditProductForm";

export const EditProduct = () => {
  const { userId } = useAuth();
  const params = useParams();
  const id = params.id as string;
  const routes = useRouter();

  const { data: product, isLoading } = useProduct(id);
  const updateProduct = useUpdateProduct();

  if (isLoading) return <LoadingSpinner />;

  if (!product || product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">
            {!product ? "Not Found" : "Access denied"}
          </h2>
          <Link href="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { id: id, ...formData },
          {
            onSuccess: () => routes.push(`/product/${id}`),
          },
        );
      }}
    />
  );
};

export default EditProduct;
