"use client";

import { useAuth } from "@clerk/nextjs";

function useAuthReq() {
  const { isSignedIn, isLoaded } = useAuth();

  return {
    isSignedIn,
    isClerkLoaded: isLoaded,
  };
}

export default useAuthReq;
