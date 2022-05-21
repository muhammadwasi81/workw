import React from "react";
import "./PollInput.css";
import { Input } from "antd";

const PollInput = ({ value, placeholder, removePollOption, index, onChange }) => {
  return (
    <div className="poll-input">
      {(index >= 2) && <button className="remove-poll" onClick={removePollOption}>x</button>}
      <Input
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        bordered={false}
        maxLength={25}
      />
      {/*<div className="uploader">
        <input
            type="file"
            accept=".jpg, .jpeg, .gif, .bmp, .png"
            onChange={({target: {files}}) => onPollAttachmentChange(files)}
        />
        <img
          src="https://konnect.im/static/media/picture.97cdc6a9.svg"
          alt=""
        />
      </div>*/}
    </div>
  );
};

export default PollInput;
