"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "@/lib/api"; // Скорректируйте путь к вашему queries.ts

function useUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: syncUser,
  });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      syncUserMutation({
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: user.fullName || user.firstName || "User",
        imageUrl: user.imageUrl ?? "",
      });
    }
  }, [isSignedIn, user, syncUserMutation, isPending, isSuccess]);

  return {
    isSynced: isSuccess,
    isPending,
  };
}

export default useUserSync;
