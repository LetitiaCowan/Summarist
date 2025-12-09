"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaRegClock, FaRegStar } from "react-icons/fa";
import BookCardSkeleton from "./skeletons/BookCardSkeleton";
import { Book } from "@/app/types/book";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Stop showing skeleton even on error
  };

  return (
    <div className="flex flex-col flex-shrink-0 w-[160px] sm:w-[180px] md:w-[190px] lg:flex-1 lg:max-w-[198px] gap-2 relative">
      {/* Show skeleton overlay until image loads */}
      {!imageLoaded && (
        <div className="absolute inset-0 z-10">
          <BookCardSkeleton />
        </div>
      )}
      
      <Link
        href={`/logged-in/book-info?id=${book.id}`}
        className={`flex flex-col flex-1 min-w-0 w-full gap-2 hover:bg-gray-200 transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {imageError ? (
          <div className="w-full aspect-[2/3] bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        ) : (
          <img
            src={book.imageLink}
            alt={book.title}
            className="w-full h-auto"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        <h2 className="text-xs sm:text-sm font-bold line-clamp-2">{book.title}</h2>
        <p className="text-xs text-gray-500 line-clamp-1">{book.author}</p>
        <p className="text-xs sm:text-sm w-full sm:max-w-[130px] line-clamp-2">{book.subTitle}</p>
        <span className="flex gap-1 sm:gap-2 items-center text-xs sm:text-sm">
          <FaRegClock className="w-3 h-3 sm:w-4 sm:h-4" />
          <p>03:34</p>
          <FaRegStar className="w-3 h-3 sm:w-4 sm:h-4" />
          {book.averageRating}
        </span>
      </Link>
    </div>
  );
};

export default BookCard;

