"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchResults from './components/SearchResults';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">
        {query ? `Search results for "${query}"` : 'Search'}
      </h1>
      {query ? (
        <SearchResults searchQuery={query} />
      ) : (
        <div className="text-gray-500">Enter a search query to find books</div>
      )}
    </div>
  );
}

