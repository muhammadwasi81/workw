import { Input } from "antd";
import React, { useState, useId, useRef, useEffect } from "react";
import Avatar from "../../../Avatar/avatarOLD";
import { SmileOutlined, PictureOutlined } from "@ant-design/icons";
import FilePreview from "../../../FilePreview";
import EmojiPicker from "../../../../features/Messenger/view/MessengerBox/helpers/emojiPicker";
import { useSelector } from "react-redux";

function RemarksComposer({
  files,
  onFile,
  onDelete,
  onRemarksText,
  onCurrentStatus,
}) {
  const { user } = useSelector((state) => state.userSlice);
  const [text, setText] = useState("");
  const { name, userImage } = user;
  const index = useId();
  const [isEmoji, setisEmoji] = useState(false);

  const onSelectEmoji = (emoji) => {
    setText((prevValue) => prevValue + emoji.native);
  };

  useEffect(() => {
    onRemarksText(text);
  }, [text, onRemarksText]);

  return (
    <div className="remarkFooter">
      <div className="remarkFooter__top">
        <div className="left">
          <Avatar name={name} src={userImage} size={30} round />
        </div>
        <div className="right">
          {isEmoji && <EmojiPicker onSelect={onSelectEmoji} />}
          <div className="input">
            <Input
              placeholder="Write Your Remarks Here ..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <label
              htmlFor=""
              onClick={() => {
                setisEmoji(!isEmoji);
              }}
            >
              <SmileOutlined />
            </label>
            <label htmlFor={"imageUpload" + index}>
              <PictureOutlined />

              <input
                multiple
                type="file"
                id={"imageUpload" + index}
                style={{ display: "none" }}
                onChange={(e) => onFile(e)}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="remarkFooter__bottom">
        <div className="left">
          <FilePreview files={files} onDelete={onDelete} />
        </div>
        <div className="right">
          <ul className="list">
            <div
              className="list__item"
              onClick={() => onCurrentStatus("process")}
            >
              In Process
            </div>
            <div
              className="list__item"
              onClick={() => onCurrentStatus("process")}
            >
              Approve
            </div>
            <div
              className="list__item"
              onClick={() => onCurrentStatus("process")}
            >
              Decline
            </div>
            <div
              className="list__item"
              onClick={() => onCurrentStatus("process")}
            >
              Hold
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RemarksComposer;
