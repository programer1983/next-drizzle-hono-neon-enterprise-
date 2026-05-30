"use client";

import { useCreateProduct } from "@/hooks/useProducts";
import {
  ArrowLeftIcon,
  FileTextIcon,
  SparklesIcon,
  TypeIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProduct() {
  const router = useRouter();
  const createProduct = useCreateProduct();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct.mutate(formData, {
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <div className="w-full min-h-screen pt-4">
      <div className="w-full md:w-125 mx-auto">
        <Link href="/" className="btn btn-ghost btn-sm gap-1 mb-4">
          <ArrowLeftIcon className="size-4" /> Left
        </Link>
        <div className="card mx-auto bg-base-300  w-full">
          <div className="card-body">
            <h1 className="card-title">
              <SparklesIcon /> New Product
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4 w-full">
              <label className="input input-bordered flex items-center w-full gap-2 bg-base-200 focus-within:outline-none">
                <TypeIcon className="size-4 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Product Title"
                  className="grow"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </label>

              <label className="input input-bordered flex items-center w-full gap-2 bg-base-200 focus-within:outline-none">
                <TypeIcon className="size-4 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Image Url"
                  className="grow"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  required
                />
              </label>

              {formData.imageUrl && (
                <div className="rounded-box overflow-hidden">
                  <picture className="w-full">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                      onError={(e) =>
                        ((e.currentTarget as HTMLImageElement).style.display =
                          "none")
                      }
                    />
                  </picture>
                </div>
              )}

              <div className="form-control">
                <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                  <FileTextIcon className="size-1 mt-1 bg-base-content/50" />
                  <textarea
                    placeholder="Description"
                    className="qrow bg-transparent w-full resize-none focus:outline-none min-h-24"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {createProduct.isError && (
                <div role="alert" className="alert alert-error alert-sm">
                  <span>Failed to cretae. Try again.</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={createProduct.isPending}
              >
                {createProduct.isPending ? (
                  <span className="loading loading-spinner" />
                ) : (
                  "Create Product"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
