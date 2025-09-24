"use client";
import React from "react";
import google from "../assets/google.png";

interface SignUpModalProps {
  setIsOpen: (open: boolean) => void;
  handleGoogleSignup: () => void;
  handleEmailSignup: (email: string, password: string, confirmPassword: string) => void;
  switchToLogin?: () => void;
  error?: string | null;
  clearError?: () => void;
  isLoading?: boolean;
}

export default function SignUpModal({ setIsOpen, handleGoogleSignup, handleEmailSignup, switchToLogin, error, clearError, isLoading }: SignUpModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    handleEmailSignup(email, password, confirmPassword);
  };

  const handleInputChange = () => {
    if (clearError) {
      clearError();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 text-xl font-bold"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Create your account
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Join Summarist and start your reading journey
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg relative">
            <p className="text-red-600 text-sm text-center">{error}</p>
            {clearError && (
              <button
                onClick={clearError}
                className="absolute top-1 right-1 text-red-400 hover:text-red-600 text-sm"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* GOOGLE SIGNUP BUTTON */}
        <button 
          onClick={handleGoogleSignup}
          className="relative w-full bg-[#4285f4] text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center mb-6 hover:bg-[#357ae8] transition-colors duration-200"
        >
          <span className="flex items-center justify-center w-8 h-8 absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full">
            <img src={google.src} alt="Google" className="w-5 h-5" />
          </span>   
          Sign up with Google
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="signup-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="signup-password"
              name="password"
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength={6}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength={6}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <button 
              onClick={switchToLogin}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
