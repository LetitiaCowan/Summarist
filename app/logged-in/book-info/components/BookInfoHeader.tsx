"use client";
import React from "react";
import { FaRegStar, FaPlay, FaBookOpen, FaRegLightbulb } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { AiOutlineAudio } from "react-icons/ai";
import { useBookDataContext } from '@/app/providers/BookDataProvider';


const BookInfoHeader = ({
  book,
  handleReadListen,
  handleLogin,
  isGuest,
}: {
  book: any;
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
    if (isBookSaved(book.id)) {
      removeFromLibrary(book.id);
    } else {
      addToLibrary(book);
    }
  };


  return (
    <div className="max-w-6xl">
      <div className="flex gap-12 items-start">
        {/* Left side - Book details */}
        <div className="flex-1 max-w-2xl">
          <div className="space-y-6">
            {/* Book title */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {book?.title}
            </h1>

            {/* Author */}
            <h2 className="text-xl font-semibold text-gray-700">
              {book?.author}
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {book?.subTitle}
            </p>
            {/* Feature tags */}
            <div className="flex flex-wrap gap-3 w-full max-w-[300px]">
              <span className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium w-[calc(100% / 2)]">
                <FaRegStar className="text-yellow-500" />
                {book?.averageRating} ({book?.totalRating} ratings)
              </span>
              <span className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium w-[calc(100% / 2)]">
                <FiClock className="text-yellow-500" />
                04:40
              </span>
              <span className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium w-[calc(100% / 2)]">
                <AiOutlineAudio className="text-yellow-500" />
                {book?.type}
              </span>
              <span className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium w-[calc(100% / 2)]">
                <FaRegLightbulb className="text-yellow-500" />
                {book?.keyIdeas} key ideas
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => handleReadListen("read")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <FaBookOpen />
                Read
              </button>
              <button
                onClick={() => handleReadListen("listen")}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <FaPlay />
                Listen
              </button>
            </div>

            {/* Add to library button */}
            <button onClick={handleToggleLibrary} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-lg transition-colors">
              <FaRegStar />
              {isBookSaved(book.id) ? 'Remove from Library' : 'Add title to My Library'}
            </button>
          </div>
        </div>

        {/* Right side - Book cover */}
        <div className="flex-shrink-0">
          <div className="w-80 h-auto">
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
