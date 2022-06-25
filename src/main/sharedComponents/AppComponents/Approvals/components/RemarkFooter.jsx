import { Input } from "antd";
import React, { useState, useId, useRef, useEffect } from "react";
import Avatar from "../../../Avatar/avatarOLD";
import { SmileOutlined, PictureOutlined } from "@ant-design/icons";
import FilePreview from "../../../FilePreview";
import EmojiPicker from "../../../../features/Messenger/view/MessengerBox/helpers/emojiPicker";

function RemarkFooter({ files, onFile, onDelete }) {
  const index = useId();

  const [isEmoji, setisEmoji] = useState(false);
  const [text, setText] = useState("");
  const msgInpRef = useRef();

  const onSelectEmoji = (emoji) => {
    setText((prevValue) => prevValue + emoji.native);
    msgInpRef.current.focus();
  };

  return (
    <div className="remarkFooter">
      <div className="remarkFooter__top">
        <div className="left">
          <Avatar size={40} round width={"30px"} height={"30px"} />
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
            <div className="list__item">In Process</div>
            <div className="list__item">Approve</div>
            <div className="list__item">Decline</div>
            <div className="list__item">Hold</div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RemarkFooter;
