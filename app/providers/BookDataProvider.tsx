"use client";
import React, { createContext, useContext } from 'react';
import { useBookData } from '@/hooks/useBookData';  
const BookDataContext = createContext<ReturnType<typeof useBookData> | null>(null);

// This provider is used to provide the book information to the entire application whilst keeping the data calls as little as possible
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