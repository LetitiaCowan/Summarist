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
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { findBookById, loading } = useBookDataContext();
  const book = findBookById(id);

  // Check if user is anonymous (anonymous users have no email)
  const isGuest = user && !user.email;

  const handleLogin = () => {
    // If user is anonymous (guest), prompt them to login
    if (isGuest) {
      openLogin();
      return;
    }
  };
  console.log(user?.plan);


  const handleReadListen = (action) => {

    // Check if book requires subscription
    const requiresSubscription = book?.subscriptionRequired; // Note: keeping the typo from the interface
    
    // For now, we'll assume user is not subscribed (you can implement subscription check later)
    const isSubscribed = user?.plan === 'premium' || user?.plan === 'basic';
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
