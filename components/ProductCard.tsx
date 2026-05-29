import { client } from "@/lib/api";
import type { InferResponseType } from "hono";
import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";

type RawResponse = InferResponseType<typeof client.api.products.$get>;

export type ProductItem = Extract<RawResponse, unknown[]>[number];

interface ProductsCardProps {
  product: ProductItem;
}

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

export default function ProductCard({ product }: ProductsCardProps) {
  const inNew = new Date(product.createdAt) > oneWeekAgo;

  return (
    <Link
      href={`/product/${product.id}`}
      className="card bg-base-300 hover:bg-base-200 transition-colors"
    >
      <figure className="px-4 pt-4">
        <picture className="w-full">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="rounded-xl h-40 w-full object-cover"
          />
        </picture>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base">
          {product.title}
          {inNew && <span className="badge badge-sm text-secondary">NEW</span>}
        </h2>
        <p className="text-sm text-base-content/70 line-clamp-2">
          {product.description}
        </p>
        <div className="divider m-1" />
        <div className="flex items-center justify-between">
          {product.user && (
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-6 rounded-full ring-1 ring-primary">
                  <picture className="w-full">
                    <img
                      src={product.user.imageUrl ?? "/avatar-placeholder.png"}
                      alt={product.user.name ?? "User"}
                    />
                  </picture>
                </div>
              </div>
              <span className="text-sm text-base-content/60">
                {product.user.name}
              </span>
            </div>
          )}
          {product.comments && (
            <div className="flex items-center gap-1 text-base-content/50">
              <MessageCircleIcon className="size-3" />
              <span>{product.comments.length}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
