"use client";
import React from "react";
import { useAuthActions } from "@/hooks/useAuthActions";

  interface LogoutProps {
  icon?: React.ReactNode;
}

const Logout = ({ icon }: LogoutProps) => {
    const { logout } = useAuthActions();
    
    const handleLogout = () => {
        logout();
    };
    
    return (
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
      >
        {icon}
        <span>Logout</span>
      </button>
    );
};

export default Logout;