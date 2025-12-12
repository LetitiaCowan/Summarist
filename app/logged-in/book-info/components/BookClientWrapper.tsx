"use client";
import React from "react";
import BookInfoHeader from "./BookInfoHeader";
import BookInfoDescription from "./BookInfoDescription";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAuthActions } from "@/hooks/useAuthActions";
import AuthModalWrapper from "../../../components/AuthModalWrapper";
import { useBookDataContext } from '@/app/providers/BookDataProvider';
import BookInfoSkeleton from "@/app/components/skeletons/BookInfoSkeleton";

const BookClientWrapper = () => {
  const { openLogin } = useAuthActions();
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  // Sanitize ID to prevent XSS and invalid characters
  const sanitizeId = (id: string) => {
    if (!id) return null;
    return id.replace(/[^a-zA-Z0-9_-]/g, '');
  };
  
  const sanitizedId = sanitizeId(id || "");
  const { findBookById, loading } = useBookDataContext();
  const book = sanitizedId ? findBookById(sanitizedId) : null;

  const isGuest = user && !user.email;

  const handleLogin = () => {
    if (isGuest) {
      openLogin();
      return;
    }
  };

  const handleReadListen = (action: "read" | "listen") => {
    if (!book || !book.id) return;

    const requiresSubscription = book?.subscriptionRequired;
    const isSubscribed = user?.plan === 'premium' || user?.plan === 'basic';
    
    if (requiresSubscription && !isSubscribed) {
      router.push("/logged-in/chosen-plan");
    } else {
      const safeBookId = sanitizeId(book.id);
      if (safeBookId) {
        router.push(`/logged-in/player?id=${encodeURIComponent(safeBookId)}`);
      }
    }
  };

  if (loading || !book) {
    return <BookInfoSkeleton />;
  }

  return (
    <>
      <AuthModalWrapper>
        <BookInfoHeader 
          book={book} 
          handleLogin={handleLogin} 
          handleReadListen={handleReadListen}
          isGuest={isGuest || false}
        />
        <BookInfoDescription book={book} />
      </AuthModalWrapper>
    </>
  );
};

export default BookClientWrapper;
