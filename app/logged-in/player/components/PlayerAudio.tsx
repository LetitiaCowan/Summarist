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
    <div className="fixed flex flex-col md:flex-row items-center justify-center bottom-0 left-0 w-full min-h-[80px] md:h-[80px] bg-[#042330] px-4 sm:px-6 md:px-10 py-3 md:py-0 gap-3 md:gap-4 z-50">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
      
      {/* Book info - hidden on mobile, shown on md+ */}
      <div className="hidden md:flex items-center gap-4 w-full max-w-[500px]">
        <span>
          <img className="w-full max-w-[48px] h-auto rounded" src={book?.imageLink} alt={book?.title} />
        </span>
        <span className="min-w-0">
          <h1 className="text-white text-sm truncate">{book?.title}</h1>
          <p className="text-gray-400 text-xs truncate">{book?.author}</p>
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 md:gap-4 w-full max-w-[500px] justify-center">
        <button onClick={seekBackward} className="text-white text-2xl sm:text-3xl md:text-4xl hover:text-gray-300 transition-colors">
          <MdOutlineReplay10 />
        </button>
        
        <button onClick={togglePlayPause} className="text-white text-3xl sm:text-4xl md:text-5xl hover:text-gray-300 transition-colors">
          {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
        </button>
        
        <button onClick={seekForward} className="text-white text-2xl sm:text-3xl md:text-4xl hover:text-gray-300 transition-colors">
          <MdOutlineForward10 />
        </button>
      </div>

      {/* Interactive Progress bar */}
      <div className="max-w-[500px] w-full order-first md:order-last">
        {/* Book info - shown on mobile only */}
        <div className="md:hidden flex items-center gap-2 mb-2 w-full">
          <img className="w-10 h-auto rounded flex-shrink-0" src={book?.imageLink} alt={book?.title} />
          <div className="min-w-0 flex-1">
            <h1 className="text-white text-xs truncate">{book?.title}</h1>
            <p className="text-gray-400 text-xs truncate">{book?.author}</p>
          </div>
        </div>
        <div 
          ref={progressBarRef}
          className="w-full bg-gray-600 rounded-full h-1 cursor-pointer transition-all duration-200"
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