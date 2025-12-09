"use client";
import React, { useState } from "react";
import google from "../assets/google.png";
import { useAuth } from "../../hooks/useAuth";
import { useAuthActions } from "../../hooks/useAuthActions";
import PasswordResetModal from "./PasswordResetModal";

interface ModalProps {
  setIsOpen: (open: boolean) => void;
}

export default function Modal({ setIsOpen }: ModalProps) {
  const { user, isLoading, error } = useAuth();
  const { login, loginWithGoogle, openSignup, clearError, loginAnonymously } = useAuthActions();
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const handleEmailLogin = (email: string, password: string) => {
    login(email, password);
  };

  const handleSwitchToSignup = () => {
    clearError(); // Clear any existing errors when switching to signup
    openSignup();
  };
  const handleGuestLogin = () => {
    loginAnonymously(); // Use the new anonymous auth
  };

  const handleForgotPassword = () => {
    clearError(); // Clear any existing errors
    setShowPasswordReset(true);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
        <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl font-bold transition-colors"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>

          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            Log in to Summarist
          </h2>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
              <button
                onClick={clearError}
                className="absolute top-1 right-1 text-red-400 hover:text-red-600 text-sm"
              >
                ×
              </button>
            </div>
          )}

          {/* CONTINUE AS GUEST BUTTON */}
          <button
            onClick={handleGuestLogin}
            className="w-full bg-[#3a579d] text-white font-medium py-3 px-4 rounded-lg mb-4 hover:bg-[#33487d] transition-colors duration-200"
          >
            Continue as Guest
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="relative w-full bg-[#4285f4] text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg flex items-center justify-center mb-4 hover:bg-[#357ae8] transition-colors duration-200 text-sm sm:text-base"
          >
            <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white rounded-full">
              <img src={google.src} alt="Google" className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            Continue with Google
          </button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
              handleEmailLogin(email, password);
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={() => clearError()}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={() => clearError()}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            <button
              onClick={handleForgotPassword}
              className="text-blue-600 hover:text-blue-800"
            >
              Forgot your password?
            </button>
            <p className="mt-2">
              Don't have an account?{" "}
              <button
                onClick={handleSwitchToSignup}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
      />
    </>
  );
}
