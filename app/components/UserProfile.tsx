"use client";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthActions } from "../../hooks/useAuthActions";

export default function UserProfile() {
  const { user, isLoggedIn, isLoading, error } = useAuth();
  const { logout, openLogin, openSignup } = useAuthActions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred. Please try again.</div>;
  }

  if (!isLoggedIn) {
    return (
      <div>
        <p>Please log in to see your profile</p>
        <button onClick={openLogin}>Login</button>
        <button onClick={openSignup}>Sign Up</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user?.displayName || user?.email}!</h2>
      <p>Email: {user?.email}</p>
      {/* Removed UID display for security - UID should not be exposed to users */}
      {user?.photoURL && <img src={user.photoURL} alt="Profile" />}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
