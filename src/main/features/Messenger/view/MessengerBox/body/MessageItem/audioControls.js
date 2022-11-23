import React from "react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getMessageByMe } from "../../../../utils/Functions";
import Avatar from "../../../../../../sharedComponents/Avatar/avatarOLD";
import "./style.css";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  duration,
  trackProgress,
  onScrub,
  creator,
  messageByMe,
}) => {
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";

  const { user } = useSelector((state) => state.userSlice);
  //   const messageByMe = getMessageByMe(creator, user);

  const trackStyling = `
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;
  const trackStylingfrom = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #777), color-stop(${currentPercentage}, #fff))
`;

  const { name, userImage } = user;

  // #526bb1
  console.log(user, "sss");
  return (
    <>
      <div className="audio-controls flex items-center gap-x-[0.4rem]">
        {messageByMe && (
          <Avatar
            width={40}
            height={40}
            src={userImage}
            name={name}
            round
          ></Avatar>
        )}
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
        {!messageByMe && (
          <Avatar
            width={40}
            height={40}
            src={creator?.image}
            name={creator?.name}
            round
          ></Avatar>
        )}
      </div>
    </>
  );
};

export default AudioControls;
