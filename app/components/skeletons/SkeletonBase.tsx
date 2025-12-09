"use client";
import React from "react";

interface SkeletonBaseProps {
  className?: string;
  width?: string;
  height?: string;
}

/**
 * Base skeleton component with shimmer animation
 * Used as a building block for all skeleton components
 */
export const SkeletonBase: React.FC<SkeletonBaseProps> = ({
  className = "",
  width = "100%",
  height = "1rem",
}) => {
  const style: React.CSSProperties = { width };
  if (height !== "auto") {
    style.height = height;
  }
  
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      style={style}
    />
  );
};

export default SkeletonBase;

