"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Book } from "@/app/types/book";

export function useBookData() {
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


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
      }  catch (err) {
        if (!cancel) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            // handle non-Error cases
            setError(String(err));
          }
        }
      }finally {
        if (!cancel) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancel = true;
    };
  }, []);

  return { recommendedBooks, suggestedBooks, loading, error };
}
