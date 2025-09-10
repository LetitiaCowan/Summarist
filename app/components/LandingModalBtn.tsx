"use client";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthActions } from "../../hooks/useAuthActions";
import Modal from "./Modal";

export default function LandingModalBtn() {
  const { isLoginOpen } = useAuth();
  const { openLogin, closeModals } = useAuthActions();

  return (
    <>
      <button 
        onClick={openLogin} 
        className="btn"
      >
        Login
      </button>

      {isLoginOpen && (
        <Modal
          setIsOpen={closeModals}
        />
      )}
    </>
  );
}
