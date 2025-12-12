"use client";
import React from "react";
import { FaRegStar, FaPlay, FaBookOpen, FaRegLightbulb } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { AiOutlineAudio } from "react-icons/ai";
import { useBookDataContext } from '@/app/providers/BookDataProvider';
import { Book } from "@/app/types/book";


const BookInfoHeader = ({
  book,
  handleReadListen,
  handleLogin,
  isGuest,
}: {
  book: Book | null;
  handleReadListen: (action: "read" | "listen") => void;
  handleLogin: () => void;
  isGuest: boolean;
}) => {
  const { addToLibrary, removeFromLibrary, isBookSaved, savedBooks } = useBookDataContext();

  const handleToggleLibrary = () => {
    // Check if user is a guest - if so, prompt them to login
    if (isGuest) {
      handleLogin();
      return;
    }
        
    // If user is logged in (not a guest), allow library operations
    if (!book) return;

    if (isBookSaved(book.id)) {
      removeFromLibrary(book.id);
    } else {
      addToLibrary(book);    }
  };


  return (
    <div className="max-w-6xl w-full px-4 md:px-0">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
        {/* Left side - Book details */}
        <div className="flex-1 w-full md:max-w-2xl">
          <div className="space-y-4 md:space-y-6">
            {/* Book title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {book?.title}
            </h1>

            {/* Author */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
              {book?.author}
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {book?.subTitle}
            </p>
            {/* Feature tags */}
            <div className="flex max-w-[300px] flex-wrap gap-2 md:gap-3 w-full">
              <span className="flex items-center gap-1 md:gap-2 bg-gray-100 text-gray-700 px-2 md:px-3 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium flex-1 min-w-[calc(50%-0.5rem)] md:min-w-0 md:flex-initial">
                <FaRegStar className="text-yellow-500 flex-shrink-0" />
                <span>{book?.averageRating} ({book?.totalRatings} ratings)</span>
              </span>
              <span className="flex items-center gap-1 md:gap-2 bg-gray-100 text-gray-700 px-2 md:px-3 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium flex-1 min-w-[calc(50%-0.5rem)] md:min-w-0 md:flex-initial">
                <FiClock className="text-yellow-500 flex-shrink-0" />
                <span>04:40</span>
              </span>
              <span className="flex items-center gap-1 md:gap-2 bg-gray-100 text-gray-700 px-2 md:px-3 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium flex-1 min-w-[calc(50%-0.5rem)] md:min-w-0 md:flex-initial">
                <AiOutlineAudio className="text-yellow-500 flex-shrink-0" />
                <span>{book?.type}</span>
              </span>
              <span className="flex items-center gap-1 md:gap-2 bg-gray-100 text-gray-700 px-2 md:px-3 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium flex-1 min-w-[calc(50%-0.5rem)] md:min-w-0 md:flex-initial">
                <FaRegLightbulb className="text-yellow-500 flex-shrink-0" />
                <span>{book?.keyIdeas} key ideas</span>
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={() => handleReadListen("read")}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                <FaBookOpen />
                Read
              </button>
              <button
                onClick={() => handleReadListen("listen")}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                <FaPlay />
                Listen
              </button>
            </div>

            {/* Add to library button */}
            <button onClick={handleToggleLibrary} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-base md:text-lg transition-colors">
              <FaRegStar />
              <span className="text-sm md:text-base">{book && isBookSaved(book.id) ? 'Remove from Library' : 'Add title to My Library'}</span>            </button>
          </div>
        </div>

        {/* Right side - Book cover */}
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
          <div className="w-full max-w-[200px] sm:max-w-[250px] md:w-80 h-auto">
            <img
              className="w-full h-auto"
              src={book?.imageLink}
              alt={book?.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-book.png";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoHeader;
