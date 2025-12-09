import React from "react";
import AuthClientWrapper from "./components/clientWrappers/AuthClientWrapper";
import { BookDataProvider } from "../providers/BookDataProvider";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthClientWrapper />
      <BookDataProvider>
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="pt-16 md:pt-4 flex-1 w-full min-w-0">
            <SearchBar />
            <main className="row flex-1 w-full">{children}</main>
          </div>
        </div>
      </BookDataProvider>
    </>
  );
}
