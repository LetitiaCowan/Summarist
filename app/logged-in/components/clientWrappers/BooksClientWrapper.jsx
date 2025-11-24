"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useBookDataContext } from '@/app/providers/BookDataProvider';
import BooksBar from "../../for-you/components/BooksBar";

const BooksClientWrapper = () => {
  const pathname = usePathname();
  const { recommendedBooks, suggestedBooks, savedBooks } = useBookDataContext();

  // Check if we're on the library route
  const isLibraryRoute = pathname === "/logged-in/library";

  if (isLibraryRoute) {
    return (
      <div>
        <div className="mt-10">
          <h1 className="text-2xl font-bold">Saved Books</h1>
          <p>Books you've saved to your library</p>
          <BooksBar books={savedBooks} />
        </div>
        <div className="mt-10">
          <h1 className="text-xl font-bold">Finished Books</h1>
          <p>Books you've completed reading</p>
          <BooksBar books={[]} />
        </div>
      </div>
    );
  }

  // Default content for other routes (for-you, etc.)
  return (
    <div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold">Recommended For You</h1>
        <p>We think you'll like these</p>
        <BooksBar books={recommendedBooks} />
      </div>
      <div className="mt-10">
        <h1 className="text-xl font-bold">Suggested For You</h1>
        <p>We think you'll like these</p>
        <BooksBar books={suggestedBooks} />
      </div>
    </div>
  );
};

export default BooksClientWrapper;
