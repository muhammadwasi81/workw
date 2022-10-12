import React, { useId, useRef, useState } from "react";
import faceIcon from "../../../../../../content/NewContent/Messenger/face.svg";
import pictureIcon from "../../../../../../content/NewContent/Messenger/picture.svg";
import attachmentIcon from "../../../../../../content/NewContent/Messenger/attachment.svg";
import sendIcon from "../../../../../../content/NewContent/Messenger/send.svg";
// import { sendMessage } from '../../store/messengerSlice';
import { useDispatch, useSelector } from "react-redux";
import { sendChatMessage } from "../../../store/actions";
import EmojiPicker from "../components/emojiPicker";
import VoiceNotes from "../components/voiceNotes";
import { createGuid } from "../../../../../../utils/base";
import FileUploader from "../components/fileUploader";

const MessengerBottom = ({ isOpenProfile }) => {
  const dispatch = useDispatch();
  const msgInpRef = useRef();
  let fileInputRef = useRef();
  const messengerDetail = useSelector(
    (state) => state.MessengerSlice.currentMessenger
  );
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const handleMsgSend = (e) => {
    setIsOpenEmoji(false);
    const { chatId, chatType, members } = messengerDetail;
    const payload = {
      chatId: chatId,
      members: members.map((mem) => {
        return {
          memberId: mem.id,
        };
      }),
      message: e.target.value,
      messageId: createGuid(),
    };
    dispatch(sendChatMessage(payload));
    e.target.value = "";
  };
  const handleClickEmoji = () => setIsOpenEmoji(!isOpenEmoji);
  const handleClickAttachment = () => {
    fileInputRef.current.upload.uploader.onClick()
  }
  const onSelectEmoji = (emoji) => {
    msgInpRef.current.value += emoji.native;
    msgInpRef.current.focus();
  };
  return (
    <>
      {/* <VoiceNotes /> */}
    <FileUploader inputRef={fileInputRef}/>
      {isOpenEmoji && <EmojiPicker onSelect={onSelectEmoji} />}
      <div className={"MessengerBottom " + (isOpenProfile ? "blur-bg" : "")}>
        <div className="MessengerInputHandler">
          <div>
            <img
              className="actionBtn"
              src={faceIcon}
              alt=""
              onClick={handleClickEmoji}
            />
            <img 
            className="actionBtn" 
            src={attachmentIcon} 
            alt=""
            onClick={handleClickAttachment}
            />
          </div>
        </div>
        <div className="MessengerInputCont">
          <div className="MessengerInput">
            <div>
              <input
                placeholder="Type a Message..."
                ref={msgInpRef}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) handleMsgSend(e);
                }}
              />
            </div>
          </div>
        </div>
        <div className="MessengerInputHandler">
          <div>
            <VoiceNotes />
          </div>
        </div>
      </div>
    </>
  );
};
export default MessengerBottom;
