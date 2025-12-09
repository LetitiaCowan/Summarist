"use client";
import React from "react";
import { SkeletonBase } from "./SkeletonBase";

/**
 * Skeleton component for the selected book section on For You page
 * Matches the layout: title, content box with text and image
 */
const SelectedBookSkeleton = () => {
  return (
    <div>
      {/* Section title skeleton */}
      <SkeletonBase className="h-8 mb-3" width="250px" />
      
      {/* Content box skeleton */}
      <div className="flex gap-4 mt-3 bg-[#fbefd6] p-5 w-full max-w-[700px]">
        {/* Left side - text content */}
        <div className="flex-1 space-y-3">
          <SkeletonBase className="h-4" width="100%" />
          <SkeletonBase className="h-4" width="90%" />
          <SkeletonBase className="h-4" width="80%" />
        </div>
        
        {/* Right side - image and details */}
        <div className="flex gap-3">
          {/* Book cover skeleton */}
          <div className="w-[140px] aspect-[2/3] shrink-1 bg-gray-200 rounded animate-pulse" />
          
          {/* Book details skeleton */}
          <div className="flex flex-col gap-3">
            <SkeletonBase className="h-6" width="120px" />
            <SkeletonBase className="h-4" width="100px" />
            <div className="flex gap-2 items-center">
              <SkeletonBase className="h-8 w-8 rounded-full" />
              <SkeletonBase className="h-4" width="100px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedBookSkeleton;

