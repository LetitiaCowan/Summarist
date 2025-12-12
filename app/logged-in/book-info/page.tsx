import React, { Suspense } from "react";
import BookClientWrapper from "./components/BookClientWrapper";

const page = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }>
        <BookClientWrapper />
      </Suspense>
    </div>
  );
};

export default page;
