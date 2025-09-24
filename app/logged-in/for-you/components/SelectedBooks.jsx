"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";

const SelectedBooks = () => {
  const [selectedBook, setSelectedBook] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  async function getSelectedBook() {
    try {
      const response = await axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
      );
      setSelectedBook(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSelectedBook();
  }, []);
 
  return (
    <div>
      <h1 className="text-2xl font-bold">Selected just for you</h1>
      <div className="flex gap-4 mt-3 bg-[#fbefd6] p-5 w-full max-w-[700px]">
        <span>
          <p className="w-full max-w-[300px]">
            How Constant Innovation Creates Radically Successful Businesses
          </p>
        </span>
        <span className="flex ">
          <img
            className="w-full max-w-[140px] shrink-1"
            src={selectedBook.imageLink}
          ></img>
          <span className="flex flex-col gap-3">
            <h2>{selectedBook.title}</h2>
            <p>{selectedBook.author}</p>
            <span className="flex gap-2 items-center">
              <button
                onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                className="font-bold text-4xl"
              >
                {isAudioPlaying ? <FaCirclePause /> : <FaPlayCircle />}
              </button>
              <span>3 mins 23 seconds</span>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default SelectedBooks;
