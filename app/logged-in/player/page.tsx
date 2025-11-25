import React, { Suspense } from "react";
import PlayerClientWrapper from "./components/PlayerClientWrapper";

const page = () => {
  return (
    <div>
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }>
        <PlayerClientWrapper />
      </Suspense>
    </div>
  );
};

export default page;
