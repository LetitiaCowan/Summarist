"use client";
import React from "react";
import Link from "next/link";
import logo from "../assets/logo.png";
import Logout from "./components/Logout";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";


export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthRedirect();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <span className="w-full max-w-[256px]"></span>
      <nav className="w-64 h-screen bg-[#f7faf9] text-white flex flex-col fixed">
        <div className="p-4">
          <img src={logo.src} alt="logo" className="max-w-[160px] max-h-[40px]" />
        </div>
        <div className="flex flex-col justify-between flex-1 p-4 text-black">
          <ul>
            <li>
              <Link href="/logged-in/for-you">For You</Link>
            </li>
            <li>
              <Link href="/logged-in/library">Library</Link>
            </li>
            <li>
              <span>Highlights</span>
            </li>
            <li>
              <span>Search</span>
            </li>
          </ul>

          <ul>
            <li>
              <Link href="/logged-in/settings">Settings</Link>
            </li>
            <li>
              <span>Help and Support</span>
            </li>
           <Logout />
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
