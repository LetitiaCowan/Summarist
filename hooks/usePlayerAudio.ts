/**
 * Custom hook managing audio playback state and controls.
 * Handles play/pause, seeking, progress tracking, and drag interactions.
 */
import { useRef, useState, useEffect } from "react";

interface UseAudioPlayerProps {
  audioLink?: string;
}

export const useAudioPlayer = ({ audioLink }: UseAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (audioRef.current && audioLink) {
      audioRef.current.src = audioLink;
    }
  }, [audioLink]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const seekBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  // Prevent time updates during drag to avoid jittery UI
  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const calculateNewTime = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || duration === 0) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    return Math.max(0, Math.min(newTime, duration));
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newTime = calculateNewTime(e);
    if (audioRef.current && newTime !== undefined) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const newTime = calculateNewTime(e);
    if (audioRef.current && newTime !== undefined) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !progressBarRef.current || !audioRef.current || duration === 0) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percentage = mouseX / rect.width;
    const newTime = percentage * duration;
    const clampedTime = Math.max(0, Math.min(newTime, duration));
    
    audioRef.current.currentTime = clampedTime;
    setCurrentTime(clampedTime);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Global mouse listeners for drag interactions beyond progress bar boundaries
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, duration]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    // Refs
    audioRef,
    progressBarRef,
    
    // State
    isPlaying,
    currentTime,
    duration,
    isDragging,
    
    // Actions
    togglePlayPause,
    seekForward,
    seekBackward,
    handleProgressClick,
    handleMouseDown,
    
    // Utilities
    formatTime,
    
    // Event handlers
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
  };
};