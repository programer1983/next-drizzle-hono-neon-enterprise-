"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { ShoppingBagIcon, PlusIcon, UserIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

function Navbar() {
  const { isSignedIn } = useAuth();
  return (
    <header className="navbar bg-base-300">
      <div className="max-w-5xl mx-auto w-full px-4 flex items-center justify-between">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost gap-2">
            <ShoppingBagIcon className="size-5 text-primary" />
            <span className="text-lg font-bold font-mono uppercase tracking-wider">
              Productify
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSelector />
          {isSignedIn ? (
            <>
              <Link href="/create" className="btn btn-primary btn-sm gap-1">
                <PlusIcon className="size-4" />
                <span className="hidden sm:inline">New product</span>
              </Link>
              <Link href="/profile" className="btn btn-ghost btn-sm gap-1">
                <UserIcon className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="btn btn-ghost btn-sm">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-primary btn-sm">Get Started</button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
