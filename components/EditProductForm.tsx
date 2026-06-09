import {
  ArrowLeftIcon,
  ImageIcon,
  TypeIcon,
  FileTextIcon,
  SaveIcon,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ProductFormData {
  title: string;
  description: string;
  imageUrl: string;
}

interface EditProductFormProps {
  product: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
  isPending: boolean;
  isError: boolean;
  onSubmit: (formData: ProductFormData) => void;
}

export const EditProductForm = ({
  product,
  isPending,
  isError,
  onSubmit,
}: EditProductFormProps) => {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
  });
  return (
    <div className="max-w-lg mx-auto pt-8 pb-6 lg:pb-20 lg:pt-20">
      <Link href="/profile" className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className="size-4" /> Back
      </Link>
      <div className="card bg-base-300">
        <div className="card-body">
          <SaveIcon className="size-5 text-primary" />
          <h1 className="card-title">Edit Product</h1>
          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              onSubmit(formData);
            }}
            className="space-y-4 mt-4"
          >
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

            {isError && (
              <div role="alert" className="alert alert-error alert-sm">
                <span>Failed to update. Try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
