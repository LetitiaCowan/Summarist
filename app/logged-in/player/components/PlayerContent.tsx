"use client";
import React from "react";
import { Book } from "@/app/types/book";


const PlayerContent = ({book}: {book: Book}) => {
  return (
    <div className="px-[150px] flex flex-col gap-4 mb-[80px]">
      <h1 className="text-2xl font-bold">{book?.title}</h1>
      <div className= "w-full h-[1px] bg-gray-400"></div>
      <p className="whitespace-pre-line">{book?.summary}</p>

      </div>
  );
};

export default PlayerContent;
