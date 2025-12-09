"use client";
/**
 * Context provider for book data across the application.
 * Prevents redundant API calls by sharing book state globally.
 */
import React, { createContext, useContext } from 'react';
import { useBookData } from '@/hooks/useBookData';  
const BookDataContext = createContext<ReturnType<typeof useBookData> | null>(null);

export function BookDataProvider({ children }: { children: React.ReactNode }) {
  const bookData = useBookData();
  return (
    <BookDataContext.Provider value={bookData}>
      {children}
    </BookDataContext.Provider>
  );
}

export function useBookDataContext() {
  const context = useContext(BookDataContext);
  if (!context) {
    throw new Error('useBookDataContext must be used within BookDataProvider');
  }
  return context;
}       