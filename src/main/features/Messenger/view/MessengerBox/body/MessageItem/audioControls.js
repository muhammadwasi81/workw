import React from "react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getMessageByMe } from "../../../../utils/Functions";
import "./style.css";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  duration,
  trackProgress,
  onScrub,
  creator,
}) => {
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";

  const { user } = useSelector((state) => state.userSlice);
  const messageByMe = getMessageByMe(creator, user);

  const trackStyling = `
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;
  const trackStylingfrom = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #777), color-stop(${currentPercentage}, #fff))
`;

  // #526bb1

  return (
    <>
      <div className="audio-controls flex items-center">
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
          style={{ background: messageByMe ? trackStyling : trackStylingfrom }}
          //   onMouseUp={onScrubEnd}
          //   onKeyUp={onScrubEnd}
        />
      </div>
    </>
  );
};

export default AudioControls;
