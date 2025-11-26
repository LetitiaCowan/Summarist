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
  resetPassword,
  loginAnonymously,
} from "../store/auth";

/**
 * useAuthActions Hook - Provides all authentication action dispatchers
 *
 * This hook wraps Redux action dispatchers in simple functions
 * to keep components clean and provide a consistent API for auth operations.
 *
 * All functions dispatch Redux actions that trigger async thunks or reducers
 * in the auth store, which then update the global auth state.
 *
 * @returns Object containing all auth action functions
 */
export function useAuthActions() {
  const dispatch = useAppDispatch();

  return {
    /**
     * AUTHENTICATION ACTIONS - Handle user login/logout operations
     */

    /**
     * Login with email and password
     * Dispatches loginWithEmail async thunk to Firebase
     * @param email - User's email address
     * @param password - User's password
     */
    login: (email: string, password: string) => {
      dispatch(loginWithEmail({ email, password }));
    },

    /**
     * Create new user account with email and password
     * Dispatches signupWithEmail async thunk to Firebase
     * @param email - User's email address
     * @param password - User's password
     */
    signup: (email: string, password: string) => {
      dispatch(signupWithEmail({ email, password }));
    },

    /**
     * Login with Google OAuth
     * Dispatches loginWithGoogle async thunk to Firebase
     * Opens Google popup for authentication
     */
    loginWithGoogle: () => {
      dispatch(loginWithGoogle());
    },

    loginAnonymously: () => {
      dispatch(loginAnonymously());
    },

    /**
     * Logout current user
     * Dispatches logout async thunk to Firebase
     * Clears user data from state
     */
    logout: () => {
      dispatch(logout());
    },

    /**
     * MODAL CONTROL ACTIONS - Handle UI modal visibility
     */

    /**
     * Open login modal and close signup modal
     * Dispatches openLogin reducer action
     */
    openLogin: () => {
      dispatch(openLogin());
    },

    /**
     * Open signup modal and close login modal
     * Dispatches openSignup reducer action
     */
    openSignup: () => {
      dispatch(openSignup());
    },

    /**
     * Close both login and signup modals
     * Dispatches closeModals reducer action
     */
    closeModals: () => {
      dispatch(closeModals());
    },

    /**
     * Send password reset email
     * Dispatches resetPassword async thunk to Firebase
     * @param email - User's email address
     */
    resetPassword: (email: string) => {
      dispatch(resetPassword(email));
    },

    /**
     * ERROR HANDLING ACTIONS - Manage error states
     */

    /**
     * Clear current error message
     * Dispatches clearError reducer action
     */
    clearError: () => {
      dispatch(clearError());
    },
  };
}
