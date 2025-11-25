"use client";
import React from "react";
import { Book } from "@/app/types/book";
import { MdOutlineForward10, MdOutlineReplay10 } from "react-icons/md";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import {useAudioPlayer} from "../../../../hooks/usePlayerAudio";
const PlayerAudio = ({ book }: { book: Book }) => {
  const {
    audioRef,
    progressBarRef,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    seekForward,
    seekBackward,
    handleProgressClick,
    handleMouseDown,
    formatTime,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
  } = useAudioPlayer({ audioLink: book?.audioLink });

  return (
    <div className="fixed flex items-center justify-center bottom-0 left-0 w-full h-[80px] bg-[#042330] px-10">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
      
      <div className="flex items-center gap-4 w-full max-w-[500px]">
        <span>
          <img className="w-full max-w-[48px]" src={book?.imageLink} alt="" />
        </span>
        <span>
          <h1 className="text-white text-sm">{book?.title}</h1>
          <p className="text-gray-400 text-sm">{book?.author}</p>
        </span>
      </div>

      
      {/* Controls */}
      <div className="flex items-center gap-4 w-full max-w-[500px] justify-center">
        <button onClick={seekBackward} className="text-white text-4xl hover:text-gray-300">
          <MdOutlineReplay10 />
        </button>
        
        <button onClick={togglePlayPause} className="text-white text-5xl hover:text-gray-300">
          {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
        </button>
        
        <button onClick={seekForward} className="text-white text-4xl hover:text-gray-300">
          <MdOutlineForward10 />
        </button>
      </div>

      {/* Interactive Progress bar */}
      <div className="max-w-[500px] w-full">
        <div 
          ref={progressBarRef}
          className="w-full max-w-[500px] bg-gray-600 rounded-full h-1 cursor-pointer transition-all duration-200"
          onClick={handleProgressClick}
          onMouseDown={handleMouseDown}
        >
          <div 
            className="bg-white h-1 rounded-full transition-all duration-100"
            style={{ 
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' 
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

    </div>
  );
};

export default PlayerAudio;