"use client";
import React from "react";
import PlayerContent from "./PlayerContent";
import PlayerAudio from "./PlayerAudio";
import { useSearchParams } from "next/navigation";
import { useBookDataContext } from "@/app/providers/BookDataProvider";
import PlayerSkeleton from "@/app/components/skeletons/PlayerSkeleton";

const PlayerClientWrapper = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { findBookById, loading } = useBookDataContext();
  const book = findBookById(id || "");

  if (loading || !book) {
    return <PlayerSkeleton />;
  }

  return (
    <div>
      <PlayerContent book={book} />
      <PlayerAudio book={book} />
    </div>
  );
};

export default PlayerClientWrapper;
