"use client";

import { SignInButton, Show, SignOutButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="btn btn-primary text-white">Login</button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <SignOutButton>
          <button className="btn btn-error text-white">Logout</button>
        </SignOutButton>
      </Show>
    </div>
  );
}
