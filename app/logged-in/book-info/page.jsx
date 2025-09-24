"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useBookData } from "@/hooks/useBookData";
import { FaRegStar, FaPlay, FaBookOpen } from "react-icons/fa";

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { recommendedBooks, suggestedBooks, loading, error } = useBookData();
  const book =
    recommendedBooks.find((book) => book.id === id) ||
    suggestedBooks.find((book) => book.id === id);
  console.log(book);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!book) {
    return <div className="flex justify-center items-center min-h-screen">Book not found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
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
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium">
                  <FaRegStar className="text-yellow-500" />
                  Audio & Text
                </span>
                <span className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium">
                  <FaRegStar className="text-yellow-500" />
                  Audio & Text
                </span>
                <span className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium">
                  <FaRegStar className="text-yellow-500" />
                  Audio & Text
                </span>
                <span className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium">
                  <FaRegStar className="text-yellow-500" />
                  Audio & Text
                </span>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <FaBookOpen />
                  Read
                </button>
                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <FaPlay />
                  Listen
                </button>
              </div>
              
              {/* Add to library button */}
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-lg transition-colors">
                <FaRegStar />
                Add title to My Library
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
                  e.target.src = '/placeholder-book.png';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
