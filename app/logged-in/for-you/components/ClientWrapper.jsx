"use client";
import React from "react";
import { useBookData } from "@/hooks/useBookData";
import BooksBar from "./BooksBar";

const ClientWrapper = () => {
  const { recommendedBooks, suggestedBooks } = useBookData();

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold">Recommended For You</h1>
        <p>We think you’ll like these</p>
        <BooksBar books={recommendedBooks} />
      </div>
      <div className="mt-10">
        <h1 className="text-xl font-bold">Suggested For You</h1>
        <p>We think you’ll like these</p>
        <BooksBar books={suggestedBooks} />
      </div>
     
    </div>
  );
};

export default ClientWrapper;
