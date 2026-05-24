"use client";

import useUserSync from "@/hooks/useUserSync";

export default function ClientInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  useUserSync();
  return <>{children}</>;
}
