import { Input } from "antd";
import React, { useState, useId, useRef, useEffect, useContext } from "react";
import Avatar from "../../../Avatar/avatarOLD";
import { SmileOutlined, PictureOutlined } from "@ant-design/icons";
import FilePreview from "../../../FilePreview";
import EmojiPicker from "../../../../features/Messenger/view/MessengerBox/components/emojiPicker";
import { useSelector } from "react-redux";
import { ApprovalStatus } from "../enums";
import RemarkStatus from "./RemarkStatus";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ApprovalDictionary } from "../localization";

function RemarksComposer({
  files,
  onFile,
  onDelete,
  onRemarksText,
  onCurrentStatus,
  createBy,
  approverId,
  status,

  value,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { placeHolder } = ApprovalDictionary[userLanguage];
  const { user } = useSelector((state) => state.userSlice);
  const [text, setText] = useState("");
  const { name, userImage, id } = user;
  const isRemarker = createBy === id;
  const isApprover = approverId === id;
  const isRemarkApproved = ApprovalStatus.Approved === status;
  const isRemarkDecline = ApprovalStatus.Declined === status;
  const isRemarkCancelled = ApprovalStatus.Cancelled === status;
  const index = useId();
  const [isEmoji, setisEmoji] = useState(false);
  const msgInpRef = useRef();

  // const onSelectEmoji = (emoji) => {
  //   setText((prevValue) => prevValue + emoji.native);
  // };

  // useEffect(() => {
  //   console.log("Enter Press");
  //   onRemarksText(text);
  // }, [text, onRemarksText]);
  const renderStatus = () => {
    if (!isRemarker && isApprover)
      return <RemarkStatus onCurrentStatus={onCurrentStatus} />;
  };
  const onSelectEmoji = (emoji) => {
    msgInpRef.current.value += emoji.native;
    msgInpRef.current.focus();
    onRemarksText(msgInpRef.current.value)
  };


  if (isRemarkApproved || isRemarkDecline || isRemarkCancelled) return null;
  return (
    <div className="remarkFooter">
      <div className="remarkFooter__top">
        <div className="left">
          <Avatar name={name} src={userImage} size={30} round />
        </div>
        <div className="right">
          {isEmoji && <EmojiPicker onSelect={onSelectEmoji} />}
          <div className="input">
            <input
              className="remarksInput"
              placeholder={placeHolder.writeYourRemarksHere}
              value={value}
              onChange={(e) => {
                onRemarksText(e.target.value, e);
              }}
              onKeyUp={(e) => {
                onRemarksText(e.target.value, e);
                setisEmoji(false)
              }}
              ref={msgInpRef}
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
        <div className="right">{renderStatus()}</div>
      </div>
    </div>
  );
}

export default RemarksComposer;
