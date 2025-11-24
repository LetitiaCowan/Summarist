"use client";
import React from "react";
import BookInfoHeader from "./BookInfoHeader";
import BookInfoDescription from "./BookInfoDescription";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAuthActions } from "@/hooks/useAuthActions";
import AuthModalWrapper from "../../../components/AuthModalWrapper";
import { useBookDataContext } from '@/app/providers/BookDataProvider';

const BookClientWrapper = () => {
  const { openLogin } = useAuthActions();
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const uid = user?.uid;
  const searchParams = useSearchParams();
  const guest = "tiOfFCBiZ2fy05LZhoulaz3TGk13"
  const id = searchParams.get("id");
  const { findBookById, loading } = useBookDataContext();
  const book = findBookById(id);
 

  const handleLogin = () => {
    if (uid === guest) {
      openLogin();
      return;
    }
    return
  };

  const isGuest = uid === guest;

  const handleReadListen = (action) => {

    // Check if book requires subscription
    const requiresSubscription = book?.subscriptionRequired; // Note: keeping the typo from the interface
    
    // For now, we'll assume user is not subscribed (you can implement subscription check later)
    const isSubscribed = false; // TODO: Implement actual subscription check

    if (requiresSubscription && !isSubscribed) {
      // Redirect to choose plan page
      router.push("/logged-in/chosen-plan");
    } else {
      // Redirect to player page with book ID
      router.push(`/logged-in/player?id=${book.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Book not found
      </div>
    );
  }

  return (
    <>
      <AuthModalWrapper>
        <BookInfoHeader 
          book={book} 
          handleLogin={handleLogin} 
          handleReadListen={handleReadListen}
          isGuest={isGuest}
        />
        <BookInfoDescription book={book} />
      </AuthModalWrapper>
    </>
  );
};

export default BookClientWrapper;
