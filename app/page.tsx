"use client";
import Landing from "./components/Landing";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function Home() {
  // This will automatically redirect logged-in users to /for-you
  useAuthRedirect();

  return (
    <div>
      <Landing />
    </div>
  );
}
