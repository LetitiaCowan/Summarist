"use client";
import React from "react";
import { Book } from "@/app/types/book";


const PlayerContent = ({book}: {book: Book}) => {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[150px] flex flex-col gap-4 mb-20 md:mb-[80px]">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{book?.title}</h1>
      <div className="w-full h-[1px] bg-gray-400"></div>
      <p className="whitespace-pre-line text-sm sm:text-base md:text-lg leading-relaxed">{book?.summary}</p>
    </div>
  );
};

export default PlayerContent;
