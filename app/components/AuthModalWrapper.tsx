"use client";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthActions } from "../../hooks/useAuthActions";
import Modal from "./Modal";
import SignUpModal from "./SignUpModal";

interface AuthModalWrapperProps {
  children: React.ReactNode;
}

export default function AuthModalWrapper({ children }: AuthModalWrapperProps) {
  const { isLoginOpen, isSignupOpen, error, isLoading } = useAuth();
  const { openLogin, closeModals, loginWithGoogle, signup, clearError } = useAuthActions();

  const handleGoogleSignup = () => {
    loginWithGoogle(); // You can reuse the same Google auth for signup
  };

  const handleEmailSignup = (email: string, password: string, confirmPassword: string) => {
    signup(email, password);
  };

  const switchToLogin = () => {
    // Clear any existing errors when switching to login
    clearError();
    // This will be handled by the openLogin action which closes signup and opens login
    openLogin();
  };

  return (
    <>
      {children}
      
      {isLoginOpen && (
        <Modal
          setIsOpen={closeModals}
        />
      )}

      {isSignupOpen && (
        <SignUpModal
          setIsOpen={closeModals}
          handleGoogleSignup={handleGoogleSignup}
          handleEmailSignup={handleEmailSignup}
          switchToLogin={switchToLogin}
          error={error}
          clearError={clearError}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
