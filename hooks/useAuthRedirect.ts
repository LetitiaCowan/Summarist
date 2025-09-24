"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./useAuth";

/**
 * useAuthRedirect Hook - Handles automatic redirection based on auth status
 * 
 * This hook automatically redirects users to appropriate pages based on their
 * authentication status. It prevents redirects while auth state is still loading
 * to avoid flickering or incorrect redirects.
 * 
 * Redirect logic:
 * - If user is logged in and on home page: redirect to "/logged-in/for-you"
 * - If user is not logged in and on protected pages: redirect to "/" (home page)
 * - If auth is still loading: wait (no redirect)
 * 
 * This hook should be used in components that need to enforce authentication
 * or redirect users based on their login status.
 */
export function useAuthRedirect() {
  const { isLoggedIn, isInitializing } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  /**
   * REDIRECT EFFECT - Automatically redirect based on auth status
   * Runs whenever isLoggedIn, isInitializing, router, or pathname changes
   */
  useEffect(() => {
    // Only redirect when initial auth check has finished
    if (!isInitializing) {
      // If user is logged in and on home page, redirect to for-you
      if (isLoggedIn && pathname === "/") {
        router.push("/logged-in/for-you");
      }
      // If user is not logged in and on protected pages, redirect to home
      else if (!isLoggedIn && pathname.startsWith("/logged-in")) {
        router.push("/");
      }
    }
  }, [isLoggedIn, isInitializing, router, pathname]);
}
