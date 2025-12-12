"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import SelectedBookSkeleton from "@/app/components/skeletons/SelectedBookSkeleton";

const SelectedBooks = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getSelectedBook() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
      );
      setSelectedBook(response.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSelectedBook();
  }, []);

  if (loading || !selectedBook) {
    return <SelectedBookSkeleton />;
  }
 
  return (
    <div className="px-4 md:px-0">
      <h1 className="text-xl sm:text-2xl font-bold">Selected just for you</h1>
      <div className="flex flex-col gap-4 mt-3 bg-[#fbefd6] p-4 md:p-5 w-full max-w-[700px] rounded-lg">
        <div>
          <p className="text-sm sm:text-base font-medium">
            How Constant Innovation Creates Radically Successful Businesses
          </p>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <img
            className="w-24 h-auto sm:w-32 md:max-w-[140px] flex-shrink-0 rounded"
            src={selectedBook.imageLink}
            alt={selectedBook.title}
          />
          <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-2">{selectedBook.title}</h2>
            <p className="text-xs sm:text-sm text-gray-600">{selectedBook.author}</p>
            <span className="flex gap-2 items-center">
              <button
                onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                className=" cursor-not-allowed font-bold text-2xl sm:text-3xl md:text-4xl text-gray-700 hover:text-gray-900 transition-colors"
              >
                {isAudioPlaying ? <FaCirclePause /> : <FaPlayCircle />}
              </button>
              <span className="text-xs sm:text-sm">3 mins 23 seconds</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedBooks;
