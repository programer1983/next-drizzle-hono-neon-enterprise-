"use client";

import { useProducts } from "@/hooks/useProducts";
import LoadingSpinner from "./LoadingSpinner";
import HeroSection from "./HeroSection";
import ProductsSection from "./ProductsSection";

export default function HomePage() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>Something went wrong. Please refresh the page.</span>
      </div>
    );
  }
  return (
    <div className="space-y-10">
      <HeroSection />
      <ProductsSection products={products} />
    </div>
  );
}
