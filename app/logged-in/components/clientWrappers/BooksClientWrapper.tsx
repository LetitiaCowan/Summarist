"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useBookDataContext } from '@/app/providers/BookDataProvider';
import BooksBar from "../../for-you/components/BooksBar";
import BookCardSkeleton from "@/app/components/skeletons/BookCardSkeleton";

const BooksClientWrapper = () => {
  const pathname = usePathname();
  const { recommendedBooks, suggestedBooks, savedBooks, loading } = useBookDataContext();

  // Check if we're on the library route
  const isLibraryRoute = pathname === "/logged-in/library";

  if (isLibraryRoute) {
    return (
      <div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Saved Books</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Books you've saved to your library</p>
          {loading ? (
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 flex-wrap mt-4">
              {[...Array(5)].map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <BooksBar books={savedBooks} />
            </div>
          )}
        </div>
        <div className="mt-6 md:mt-10">
          <h1 className="text-lg sm:text-xl font-bold">Finished Books</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Books you've completed reading</p>
          <div className="mt-4">
            <BooksBar books={[]} />
          </div>
        </div>
      </div>
    );
  }

  // Default content for other routes (for-you, etc.)
  return (
    <div className="px-4 md:px-0">
      <div className="mt-6 md:mt-10">
        <h1 className="text-xl sm:text-2xl font-bold">Recommended For You</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">We think you'll like these</p>
        {loading ? (
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 flex-wrap mt-4">
            {[...Array(5)].map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <BooksBar books={recommendedBooks} />
          </div>
        )}
      </div>
      <div className="mt-6 md:mt-10">
        <h1 className="text-lg sm:text-xl font-bold">Suggested For You</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">We think you'll like these</p>
        {loading ? (
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 flex-wrap mt-4">
            {[...Array(5)].map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <BooksBar books={suggestedBooks} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksClientWrapper;
