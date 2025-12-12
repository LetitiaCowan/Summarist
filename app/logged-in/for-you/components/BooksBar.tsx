import React from "react";
import BookCard from "@/app/components/BookCard";

const BooksBar = ({ books }) => {
  return (
    <div className="overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0">
      <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:flex-wrap lg:min-w-0">
        {books.slice(0, 5).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksBar;
