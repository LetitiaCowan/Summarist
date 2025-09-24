"use client";
import React from "react";
import { useAuthActions } from "@/hooks/useAuthActions";

const Logout = () => {
    const { logout } = useAuthActions();
    
    const handleLogout = () => {
        logout();
    };
  return (
    <div>
      <li>
        <button onClick={() => handleLogout()}>Logout</button>
      </li>
    </div>
  );
};

export default Logout;