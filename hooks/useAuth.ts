"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/init";
import { setUser } from "../store/auth";
import { useRouter } from "next/navigation";

// Simple hook that gives you everything you need
export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Get data from Redux store
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);
  const isLoginOpen = useAppSelector((state) => state.auth.isLoginOpen);
  const isSignupOpen = useAppSelector((state) => state.auth.isSignupOpen);

  // Check if user is logged in
  const isLoggedIn = !!user;

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Convert Firebase user to our simple User type
        const user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName || "",
          photoURL: firebaseUser.photoURL || "",
        };
        dispatch(setUser(user));
        console.log("User logged in")
        console.log(user)
      } else {
        dispatch(setUser(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return {
    // Data
    user,
    isLoggedIn,
    isLoading,
    error,
    isLoginOpen,
    isSignupOpen,
  };
}
