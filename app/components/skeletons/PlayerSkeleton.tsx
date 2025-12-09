"use client";
import React from "react";
import { SkeletonBase } from "./SkeletonBase";

/**
 * Skeleton component for player page
 * Matches the layout: title, divider, summary text lines
 */
const PlayerSkeleton = () => {
  return (
    <div className="px-[150px] flex flex-col gap-4 mb-[80px]">
      {/* Title skeleton */}
      <SkeletonBase className="h-8" width="60%" />
      
      {/* Divider skeleton */}
      <SkeletonBase className="w-full h-[1px]" />
      
      {/* Summary text lines skeleton */}
      <div className="space-y-3">
        <SkeletonBase className="h-4" width="100%" />
        <SkeletonBase className="h-4" width="100%" />
        <SkeletonBase className="h-4" width="98%" />
        <SkeletonBase className="h-4" width="100%" />
        <SkeletonBase className="h-4" width="95%" />
        <SkeletonBase className="h-4" width="100%" />
        <SkeletonBase className="h-4" width="97%" />
        <SkeletonBase className="h-4" width="100%" />
        <SkeletonBase className="h-4" width="92%" />
        <SkeletonBase className="h-4" width="100%" />
      </div>
    </div>
  );
};

export default PlayerSkeleton;

