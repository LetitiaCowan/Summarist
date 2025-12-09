import React, { Suspense } from "react";
import AuthClientWrapper from "./components/clientWrappers/AuthClientWrapper";
import { BookDataProvider } from "../providers/BookDataProvider";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";

export const dynamic = 'force-dynamic';

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
            <Suspense fallback={
              <div className="w-full max-w-2xl mx-auto mb-4 md:mb-6 px-4 md:px-0">
                <div className="w-full px-4 py-2 md:py-3 pl-10 md:pl-12 pr-4 bg-white border border-gray-300 rounded-lg h-10 md:h-12"></div>
              </div>
            }>
              <SearchBar />
            </Suspense>
            <main className="row flex-1 w-full">{children}</main>
          </div>
        </div>
      </BookDataProvider>
    </>
  );
}
