"use client";
import React from "react";
import { SkeletonBase } from "./SkeletonBase";

/**
 * Skeleton component for book info page
 * Matches the layout: header with book details and image, description section
 */
const BookInfoSkeleton = () => {
  return (
    <div className="max-w-6xl">
      {/* Main header section */}
      <div className="flex gap-12 items-start">
        {/* Left side - Book details */}
        <div className="flex-1 max-w-2xl">
          <div className="space-y-6">
            {/* Book title skeleton */}
            <SkeletonBase className="h-10" width="80%" />
            
            {/* Author skeleton */}
            <SkeletonBase className="h-6" width="60%" />
            
            {/* Subtitle skeleton */}
            <SkeletonBase className="h-5" width="90%" />
            <SkeletonBase className="h-5" width="75%" />
            
            {/* Feature tags skeleton */}
            <div className="flex flex-wrap gap-3 w-full max-w-[300px]">
              <SkeletonBase className="h-8 rounded-full" width="calc(50% - 6px)" />
              <SkeletonBase className="h-8 rounded-full" width="calc(50% - 6px)" />
              <SkeletonBase className="h-8 rounded-full" width="calc(50% - 6px)" />
              <SkeletonBase className="h-8 rounded-full" width="calc(50% - 6px)" />
            </div>
            
            {/* Action buttons skeleton */}
            <div className="flex gap-4">
              <SkeletonBase className="h-12 rounded-lg" width="120px" />
              <SkeletonBase className="h-12 rounded-lg" width="120px" />
            </div>
            
            {/* Add to library button skeleton */}
            <SkeletonBase className="h-6" width="200px" />
          </div>
        </div>
        
        {/* Right side - Book cover */}
        <div className="flex-shrink-0">
          <div className="w-80 aspect-[2/3] bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      
      {/* Description section skeleton */}
      <div className="mt-10 space-y-5">
        <SkeletonBase className="h-7" width="200px" />
        <div className="flex gap-4 items-center max-w-4xl py-5">
          <SkeletonBase className="h-12 rounded" width="100px" />
          <SkeletonBase className="h-12 rounded" width="120px" />
          <SkeletonBase className="h-12 rounded" width="90px" />
        </div>
        <div className="space-y-3">
          <SkeletonBase className="h-4" width="100%" />
          <SkeletonBase className="h-4" width="100%" />
          <SkeletonBase className="h-4" width="95%" />
          <SkeletonBase className="h-4" width="90%" />
        </div>
        <SkeletonBase className="h-7 mt-10" width="180px" />
        <div className="mt-5 space-y-3">
          <SkeletonBase className="h-4" width="100%" />
          <SkeletonBase className="h-4" width="100%" />
          <SkeletonBase className="h-4" width="85%" />
        </div>
      </div>
    </div>
  );
};

export default BookInfoSkeleton;

