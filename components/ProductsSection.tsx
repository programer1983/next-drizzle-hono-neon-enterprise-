import { PackageIcon } from "lucide-react";
import { client } from "@/lib/api";
import type { InferResponseType } from "hono";
import Link from "next/link";
import ProductCard from "./ProductCard";

type RawResponse = InferResponseType<typeof client.api.products.$get>;

export type GetAllProductsResponse = Extract<RawResponse, unknown[]>;

interface ProductsSectionProps {
  products: GetAllProductsResponse | undefined;
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const safeProducts: GetAllProductsResponse = Array.isArray(products)
    ? products
    : [];

  return (
    <div>
      <h1 className="flex gap-2 mb-4 items-center font-bold text-xl">
        <PackageIcon className="size-5 text-primary" />
        All products
      </h1>

      {safeProducts.length === 0 ? (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-6">
            <PackageIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">No products yet</h3>
            <p className="text-sm text-base-content/40">
              Be the first to share something!
            </p>
            <Link href="/create" className="btn btn-primary btn-sm mt-2">
              Create Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {safeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
