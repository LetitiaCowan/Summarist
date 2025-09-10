"use client";
import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuthActions } from "@/hooks/useAuthActions";


export default function ForYouPage() {
  useAuthRedirect();
  const user = useSelector((state: RootState) => state.auth.user);
  const { logout } = useAuthActions();

  if (!user) return <p>Loading...</p>; // Show while checking user

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">For You</h1>
      <p>✅ Only logged-in users can see this page.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
