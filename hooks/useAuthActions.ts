"use client";
/**
 * Hook providing Redux action dispatchers for authentication operations.
 * Wraps auth actions in a clean API for components.
 */
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
  resetPassword,
  loginAnonymously,
} from "../store/auth";

export function useAuthActions() {
  const dispatch = useAppDispatch();

  return {
    login: (email: string, password: string) => {
      dispatch(loginWithEmail({ email, password }));
    },
    signup: (email: string, password: string) => {
      dispatch(signupWithEmail({ email, password }));
    },
    loginWithGoogle: () => {
      dispatch(loginWithGoogle());
    },
    loginAnonymously: () => {
      dispatch(loginAnonymously());
    },
    logout: () => {
      dispatch(logout());
    },
    openLogin: () => {
      dispatch(openLogin());
    },
    openSignup: () => {
      dispatch(openSignup());
    },
    closeModals: () => {
      dispatch(closeModals());
    },
    resetPassword: (email: string) => {
      dispatch(resetPassword(email));
    },
    clearError: () => {
      dispatch(clearError());
    },
  };
}
