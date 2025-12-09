import React from "react";

const BookInfoDescription = ({ book }) => {
  return (
    <div className="px-4 md:px-0">
      <h2 className="text-lg sm:text-xl font-bold mt-4 md:mt-7">What's this about?</h2>
      <div className="flex flex-wrap gap-2 md:gap-4 items-center max-w-4xl py-3 md:py-5 font-bold">
        {book.tags.map((tag) => (
          <span className="rounded bg-gray-200 px-3 py-2 md:p-4 text-xs md:text-sm" key={tag}>{tag}</span>
        ))}
      </div>
      <p className="text-sm sm:text-base leading-relaxed">{book?.bookDescription}</p>
      <h2 className="mt-6 md:mt-10 text-lg sm:text-xl font-bold">About the author</h2>
      <p className="mt-3 md:mt-5 text-sm sm:text-base leading-relaxed">{book?.authorDescription}</p>
    </div>
  );
};

export default BookInfoDescription;
