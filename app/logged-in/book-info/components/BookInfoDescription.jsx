import React from "react";

const BookInfoDescription = ({ book }) => {
  return (
    <>
      <h2 className="text-xl font-bold mt-7">What's this about?</h2>
      <div className="flex gap-4 items-center max-w-4xl py-5 font-bold">
        {book.tags.map((tag) => (
          <span className="rounded bg-gray-200 p-4" key={tag}>{tag}</span>
        ))}
      </div>
      <p>{book?.bookDescription}</p>
      <h2 className="mt-10 text-xl font-bold">About the author</h2>
      <p className="mt-5">{book?.authorDescription}</p>
    </>
  );
};

export default BookInfoDescription;
