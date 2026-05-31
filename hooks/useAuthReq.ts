"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useAuthReq() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      return router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  return {
    isSignedIn,
    isClerkLoaded: isLoaded,
  };
}

export default useAuthReq;
