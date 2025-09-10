"use client";
import { useAppDispatch } from "../store/store";
import {
  loginWithEmail,
  signupWithEmail,
  loginWithGoogle,
  logout,
  openLogin,
  openSignup,
  closeModals,
  clearError,
} from "../store/auth";

// Hook for all auth actions - keeps components clean
export function useAuthActions() {
  const dispatch = useAppDispatch();

  return {
    // Login actions
    login: (email: string, password: string) => {
      dispatch(loginWithEmail({ email, password }));
    },
    
    // Signup actions
    signup: (email: string, password: string) => {
      dispatch(signupWithEmail({ email, password }));
    },
    
    // Google auth
    loginWithGoogle: () => {
      dispatch(loginWithGoogle());
    },
    
    // Logout
    logout: () => {
      dispatch(logout());
    },
    
    // Modal actions
    openLogin: () => {
      dispatch(openLogin());
    },
    openSignup: () => {
      dispatch(openSignup());
    },
    closeModals: () => {
      dispatch(closeModals());
    },
    
    // Error handling
    clearError: () => {
      dispatch(clearError());
    },
  };
}
