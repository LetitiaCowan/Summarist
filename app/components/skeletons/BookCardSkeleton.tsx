"use client";
import React from "react";
import { SkeletonBase } from "./SkeletonBase";

/**
 * Skeleton component for book cards used in BooksBar
 * Matches the layout: image, title, author, subtitle, rating/time
 */
const BookCardSkeleton = () => {
  return (
    <div className="flex flex-col flex-shrink-0 w-[160px] sm:w-[180px] md:w-[190px] lg:flex-1 lg:max-w-[198px] gap-2">
      {/* Book cover image skeleton */}
      <div className="w-full aspect-[2/3] bg-gray-200 rounded animate-pulse" />
      
      {/* Title skeleton */}
      <SkeletonBase className="h-4" width="90%" />
      
      {/* Author skeleton */}
      <SkeletonBase className="h-3" width="70%" />
      
      {/* Subtitle skeleton */}
      <SkeletonBase className="h-3" width="80%" />
      
      {/* Rating/time skeleton */}
      <div className="flex gap-2 items-center">
        <SkeletonBase className="h-4 w-4 rounded-full" />
        <SkeletonBase className="h-3 w-12" />
        <SkeletonBase className="h-4 w-4 rounded-full" />
        <SkeletonBase className="h-3 w-8" />
      </div>
    </div>
  );
};

export default BookCardSkeleton;

