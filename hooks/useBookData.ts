"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Book } from "@/app/types/book";

export function useBookData() {
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved books from localStorage on mount
  useEffect(() => {
    const savedBooksFromStorage = localStorage.getItem("savedBooks");
    if (savedBooksFromStorage) {
      try {
        setSavedBooks(JSON.parse(savedBooksFromStorage));
      } catch (error) {
        console.error("Error parsing saved books from localStorage:", error);
      }
    }
  }, []);

  // Save to localStorage whenever savedBooks changes
  useEffect(() => {
    if (savedBooks.length > 0) {
      localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
    }
  }, [savedBooks]);

  const findBookById = (bookId: string) => {
    return (
      recommendedBooks.find((book) => book.id === bookId) ||
      suggestedBooks.find((book) => book.id === bookId) ||
      savedBooks.find((book) => book.id === bookId)
    );
  };

  const addToLibrary = (book: Book) => {
    setSavedBooks((prev) => {
      // Check if book is already saved to avoid duplicates
      if (prev.some((b) => b.id === book.id)) {
        return prev;
      }
      return [...prev, book];
    });
  };

  const removeFromLibrary = (bookId: string) => {
    setSavedBooks((prev) => {
      const newSavedBooks = prev.filter((b) => b.id !== bookId);
      // Update localStorage immediately
      localStorage.setItem("savedBooks", JSON.stringify(newSavedBooks));
      return newSavedBooks;
    });
  };

  const isBookSaved = (bookId: string) => {
    return savedBooks.some((book) => book.id === bookId);
  };

  useEffect(() => {
    let cancel = false;

    async function fetchData() {
      try {
        const [recommendedRes, suggestedRes] = await Promise.all([
          axios.get(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
          ),
          axios.get(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
          ),
        ]);

        if (!cancel) {
          setRecommendedBooks(recommendedRes.data);
          setSuggestedBooks(suggestedRes.data);
        }
      } catch (err) {
        if (!cancel) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            // handle non-Error cases
            setError(String(err));
          }
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancel = true;
    };
  }, []);

  return {
    recommendedBooks,
    suggestedBooks,
    savedBooks,
    addToLibrary,
    removeFromLibrary,
    isBookSaved,
    findBookById,
    loading,
    error,
  };
}
