import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./audioControls";

const AudioComponent = ({ audio }) => {
  console.log(audio);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElement = new Audio(audio);
  const audioRef = useRef(new Audio(audio));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        // toNextTrack();
        console.log("audio ended");
        setIsPlaying(false);
        setTrackProgress(0);
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  return (
    <>
      <AudioControls
        isPlaying={isPlaying}
        onPlayPauseClick={setIsPlaying}
        duration={duration}
        trackProgress={trackProgress}
        onScrub={onScrub}
        onScrubEnd={onScrubEnd}
      />
    </>
  );
};

export default AudioComponent;
