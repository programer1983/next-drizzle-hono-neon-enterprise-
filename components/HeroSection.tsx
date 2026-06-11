import { SparklesIcon, PlusCircleIcon } from "lucide-react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function HeroSection() {
  const { isSignedIn } = useAuth();
  return (
    <div className="hero bg-linear-to-br from-base-300 via-base-200 to-base-300 rounded-boxn overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 py-10">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110" />
          <picture className="w-full">
            <img
              src="/image.png"
              alt="Creator"
              className="relative h-64 lg:h-72 rounded-2xl shadow-2xl"
            />
          </picture>
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Share Your <span className="text-primary">Products</span>
          </h1>
          <p className="py-4 text-base-content/60">
            Upload, discover, and connect with creators.
          </p>

          {isSignedIn ? (
            <Link href="/create" className="btn btn-primary">
              <PlusCircleIcon className="size-4" />
              Add Product
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="btn btn-primary">
                <SparklesIcon className="size-4" />
                Start Selling
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
