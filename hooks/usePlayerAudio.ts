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

  // Load audio when audioLink changes
  useEffect(() => {
    if (audioRef.current && audioLink) {
      audioRef.current.src = audioLink;
    }
  }, [audioLink]);

  // Handle play/pause
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

  // Handle seeking forward/backward
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

  // Update current time as audio plays (only when not dragging)
  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Set duration when audio metadata loads
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle when audio ends
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Calculate the new time based on mouse position
  const calculateNewTime = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || duration === 0) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    return Math.max(0, Math.min(newTime, duration));
  };

  // Handle mouse click on progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newTime = calculateNewTime(e);
    if (audioRef.current && newTime !== undefined) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle mouse down on progress bar (start dragging)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const newTime = calculateNewTime(e);
    if (audioRef.current && newTime !== undefined) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle mouse move while dragging
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

  // Handle mouse up (stop dragging)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add/remove global mouse event listeners for dragging
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

  // Format time in MM:SS format
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