"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from '@/app/types/book';
import BookCardSkeleton from '@/app/components/skeletons/BookCardSkeleton';
import BookCard from '@/app/components/BookCard';

interface SearchResultsProps {
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sanitize and validate search query
  const sanitizeQuery = (query: string): string => {
    // Remove potentially dangerous characters and limit length
    const sanitized = query.trim().slice(0, 200); // Limit to 200 characters
    // Remove any script tags or HTML
    return sanitized.replace(/<[^>]*>/g, '').replace(/[<>]/g, '');
  };

  useEffect(() => {
    let cancel = false;

    async function fetchSearchResults() {
      const sanitizedQuery = sanitizeQuery(searchQuery);
      
      if (!sanitizedQuery) {
        setLoading(false);
        setBooks([]);
        return;
      }

      setLoading(true);
      setError(null);
      setBooks([]);

      try {
        const response = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(sanitizedQuery)}`
        );

        if (!cancel) {
          setBooks(response.data || []);
        }
      } catch (err) {
        if (!cancel) {
          // Generic error message to avoid information disclosure
          setError("Unable to fetch search results. Please try again.");
        }
      } finally {
        if (!cancel) {
          setLoading(false);
        }
      }
    }

    fetchSearchResults();

    return () => {
      cancel = true;
    };
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:flex-wrap lg:min-w-0">
          {[...Array(5)].map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px] px-4">
        <div className="text-red-500 text-sm sm:text-base text-center">Error: {error}</div>
      </div>
    );
  }

  if (books.length === 0) {
    const sanitizedQuery = sanitizeQuery(searchQuery);
    return (
      <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px] px-4">
        <div className="text-gray-500 text-sm sm:text-base text-center">No books found for "{sanitizedQuery}"</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
      <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:flex-wrap lg:min-w-0">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

