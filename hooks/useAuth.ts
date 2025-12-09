"use client";
/**
 * Main authentication hook providing user state, loading states, and modal visibility.
 * Automatically syncs with Firebase auth state changes.
 */
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/init";
import { setUser, User } from "../store/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isInitializing = useAppSelector((state) => state.auth.isInitializing);
  const error = useAppSelector((state) => state.auth.error);
  const isLoginOpen = useAppSelector((state) => state.auth.isLoginOpen);
  const isSignupOpen = useAppSelector((state) => state.auth.isSignupOpen);

  const isLoggedIn = !!user;

  // Sync Firebase auth state with Redux store
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName || "",
          photoURL: firebaseUser.photoURL || "",
          plan: "", // TODO: Fetch from Firestore
        };
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
    
    return unsubscribe;
  }, [dispatch]);

  return {
    user,
    isLoggedIn,
    isLoading,
    isInitializing,
    error,
    isLoginOpen,
    isSignupOpen,
  };
}
