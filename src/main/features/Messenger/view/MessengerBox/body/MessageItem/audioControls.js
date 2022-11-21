import React from "react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import "./style.css";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  duration,
  trackProgress,
  onScrub,
}) => {
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;

  return (
    <>
      <div className="audio-controls">
        {isPlaying ? (
          <button
            type="button"
            className="pause text-[24px]"
            onClick={() => onPlayPauseClick(false)}
            aria-label="Pause"
          >
            <BsPauseFill />
          </button>
        ) : (
          <button
            type="button"
            className="play text-[24px] "
            onClick={() => onPlayPauseClick(true)}
            aria-label="Play"
          >
            <BsFillPlayFill />
          </button>
        )}
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          style={{ background: trackStyling }}
          //   onMouseUp={onScrubEnd}
          //   onKeyUp={onScrubEnd}
        />
      </div>
    </>
  );
};

export default AudioControls;
