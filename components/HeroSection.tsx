import Link from "next/link";
import { SparklesIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="hero bg-linear-to-br from-base-300 via-base-200 to-base-300 rounded-boxn overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 py-10">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110" />
          <img
            src="/image.png"
            alt="Creator"
            className="relative h-64 lg:h-72 rounded-2xl shadow-2xl"
          />
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Share Your <span className="text-primary">Products</span>
          </h1>
          <p className="py-4 text-base-content/60">
            Upload, discover, and connect with creators.
          </p>
          <Link href="/create" className="btn btn-primary">
            <SparklesIcon className="size-4" /> Start Selling
          </Link>
        </div>
      </div>
    </div>
  );
}
