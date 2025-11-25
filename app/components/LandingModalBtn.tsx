"use client";
import React from "react";
import { useAuthActions } from "../../hooks/useAuthActions";
import AuthModalWrapper from "./AuthModalWrapper";

export default function LandingModalBtn() {
  const { openLogin } = useAuthActions();

  return (
    <AuthModalWrapper>
      <button 
        onClick={openLogin} 
        className="btn"
      >
        Login
      </button>
    </AuthModalWrapper>
  );
}
