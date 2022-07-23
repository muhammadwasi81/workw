import { Input } from "antd";
import React, { useState, useId, useRef, useEffect } from "react";
import Avatar from "../../../Avatar/avatarOLD";
import { SmileOutlined, PictureOutlined } from "@ant-design/icons";
import FilePreview from "../../../FilePreview";
import EmojiPicker from "../../../../features/Messenger/view/MessengerBox/helpers/emojiPicker";
import { useSelector } from "react-redux";
import CommentWrapper from "../../../Comment/CommentWrapper";

function RemarkFooter({ files, onFile, onDelete, referenceId }) {
  const { user } = useSelector((state) => state.userSlice);
  const { name, userImage } = user;
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
          <Avatar
            name={name}
            src={userImage}
            size={40}
            round
            width={"30px"}
            height={"30px"}
          />
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
