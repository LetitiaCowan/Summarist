"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/init";
import { setUser, User } from "../store/auth";
import { useRouter } from "next/navigation";

/**
 * useAuth Hook - Main authentication hook for the app
 * 
 * This hook provides:
 * - Current user data and login status
 * - Loading states for auth operations
 * - Error messages from auth operations
 * - Modal visibility states
 * - Automatic Firebase auth state synchronization
 * 
 * @returns Object containing all auth-related state and computed values
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  /**
   * REDUX STATE SELECTORS - Get auth data from Redux store
   * These automatically update when auth state changes
   */
  const user = useAppSelector((state) => state.auth.user);           // Current user object
  const isLoading = useAppSelector((state) => state.auth.isLoading); // Loading state for async operations
  const isInitializing = useAppSelector((state) => state.auth.isInitializing); // Loading state for initial auth check
  const error = useAppSelector((state) => state.auth.error);         // Error messages
  const isLoginOpen = useAppSelector((state) => state.auth.isLoginOpen);   // Login modal visibility
  const isSignupOpen = useAppSelector((state) => state.auth.isSignupOpen); // Signup modal visibility

  /**
   * COMPUTED VALUES - Derived from current state
   */
  const isLoggedIn = !!user;  // Boolean: true if user exists, false if null

  /**
   * FIREBASE AUTH STATE LISTENER - Automatically sync with Firebase
   * This effect runs once when the component mounts and sets up a listener
   * that automatically updates Redux state when Firebase auth state changes
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in - convert Firebase user to our User type
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName || "",
          photoURL: firebaseUser.photoURL || "",
          plan: "", // Set to empty string for now - will be fetched from Firestore later
        };
        dispatch(setUser(user));  // Update Redux state with user data
      } else {
        // User is logged out - clear user from state
        dispatch(setUser(null));
      }
    });
    
    // Return cleanup function to unsubscribe when component unmounts
    return unsubscribe;
  }, [dispatch]);

  /**
   * RETURN VALUES - All auth-related state and computed values
   * Components can destructure these values as needed
   */
  return {
    // Core auth data
    user,           // Current user object (null if not logged in)
    isLoggedIn,     // Boolean login status
    isLoading,      // Loading state for async operations
    isInitializing, // Loading state for initial auth check
    error,          // Error messages from auth operations
    
    // UI state
    isLoginOpen,    // Login modal visibility
    isSignupOpen,   // Signup modal visibility
  };
}
