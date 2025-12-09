"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isUserTypingRef = useRef(false);

  // Sync URL params with search query when navigating
  useEffect(() => {
    isUserTypingRef.current = false;
    
    if (pathname === '/logged-in/search') {
      const queryParam = searchParams.get('q') || '';
      setSearchQuery(queryParam);
    } else {
      setSearchQuery('');
    }
  }, [pathname, searchParams]);

  // Debounced navigation - prevents navigation on every keystroke
  useEffect(() => {
    if (!isUserTypingRef.current) {
      return;
    }

    const debounceTimer = setTimeout(() => {
      isUserTypingRef.current = false;
      if (searchQuery.trim() === '') {
        if (pathname === '/logged-in/search') {
          router.push('/logged-in/for-you');
        }
      } else {
        router.push(`/logged-in/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, router, pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Sanitize input to prevent XSS and limit length
    const sanitizedQuery = searchQuery.trim().slice(0, 200).replace(/<[^>]*>/g, '');
    if (sanitizedQuery) {
      router.push(`/logged-in/search?q=${encodeURIComponent(sanitizedQuery)}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-4 md:mb-6 px-4 md:px-0">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => {
              isUserTypingRef.current = true;
              setSearchQuery(e.target.value);
            }}
            placeholder="Search..."
            className="w-full px-4 py-2 md:py-3 pl-10 md:pl-12 pr-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
          />
          <svg
            className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

