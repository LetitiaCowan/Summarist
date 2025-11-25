import Link from "next/link";
import React from "react";
import { FaRegClock, FaRegStar  } from "react-icons/fa";


const BooksBar = ({ books }) => {
  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {books.slice(0, 5).map((book) => (
        <Link href={`/logged-in/book-info?id=${book.id}`} key={book.id} className="flex flex-col flex-1 min-w-0 max-w-[198px] gap-2  hover:bg-gray-200">
          <img
            src={book.imageLink}
            alt={book.title}
            className="w-full h-auto"
          />
          <h2 className="text-sm font-bold">{book.title}</h2>
          <p className="text-xs text-gray-500">{book.author}</p>
          <p className="text-sm w-full max-w-[130px]">{book.subTitle}</p>
          <span className="flex gap-2 items-center">
            <FaRegClock />
            <p>03:34</p>
            <FaRegStar />
            {book.averageRating}
          </span>
        </Link>
        
      ))}
    </div>
  );
};

export default BooksBar;
