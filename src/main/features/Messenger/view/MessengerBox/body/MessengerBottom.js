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
import { createGuid, STRINGS } from "../../../../../../utils/base";
import FileUploader from "../components/fileUploader";
import ChatBoxFooter from "../../../../SideChatbar/chatBox/ChatBoxFoot";

const MessengerBottom = ({ isOpenProfile, isChatBoxView, messengerDetail }) => {
  const dispatch = useDispatch();
  const msgInpRef = useRef();
  let fileInputRef = useRef();
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  // const [voiceNoteFile, setVoiceNoteFile] = useState(null);
  const [attchmentFiles, setAttchmentFiles] = useState([]);

  const createPayload = (text, voiceNoteFile = null) => {
    const { chatId, chatType, members } = messengerDetail;
    const attachments = voiceNoteFile ? [voiceNoteFile] : attchmentFiles;

    const payload = {
      chatId: chatId,
      members: members.map((mem) => {
        return {
          memberId: mem.id,
        };
      }),
      message: text,
      id: createGuid(),
      messageType: !!voiceNoteFile ? 2 : 1,
      attachments: attachments.map(file => ({
        file,
        id: STRINGS.DEFAULTS.guid
      }))
    };
    console.log(payload, "payload")
    return payload
  }

  const handleMsgSend = (e) => {
    let payload = createPayload(e.target.value);
    console.log(messengerDetail, "messengerDetail")
    if (!payload.message && payload.attachments.length === 0)
      return null;

    setIsOpenEmoji(false);
    dispatch(sendChatMessage(payload));
    e.target.value = "";
    setAttchmentFiles([])
  };
  const handleClickEmoji = () => setIsOpenEmoji(!isOpenEmoji);

  const handleClickAttachment = () => {
    fileInputRef.current.upload.uploader.onClick()
  }

  const handleUpload = (files) => {
    setAttchmentFiles(files)
  }

  const handleVoiceSend = (file) => {
    // setVoiceNoteFile(file);
    let payload = createPayload("", file);
    dispatch(sendChatMessage(payload))
  }

  const onSelectEmoji = (emoji) => {
    msgInpRef.current.value += emoji.native;
    msgInpRef.current.focus();
  };

  if (isChatBoxView) {
    return (
      <ChatBoxFooter
        handleSend={handleMsgSend}
        onSelectEmoji={onSelectEmoji}
        handleClickAttachment={handleClickAttachment}
        msgInpRef={msgInpRef}
        FileUploader={
          <FileUploader
            inputRef={fileInputRef}
            handleUpload={handleUpload}
            fileList={attchmentFiles} />
        }
      />
    )
  }
  return (
    <>
      {/* <VoiceNotes /> */}
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
            <VoiceNotes handleVoiceSend={handleVoiceSend} />
          </div>
        </div>
      </div>
      <FileUploader
        inputRef={fileInputRef}
        handleUpload={handleUpload}
        fileList={attchmentFiles} />
      {isOpenEmoji &&
        <EmojiPicker
          onSelect={onSelectEmoji} />}

    </>
  );
};
export default MessengerBottom;