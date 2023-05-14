import React, { useState } from "react";
import faceIcon from './assests/face.svg';
import PictureIcon from './assests/picture.svg';
import attachmentIcon from './assests/attachment.svg';
import sendIcon from './assests/send.svg';
import SharedButton from "../../../sharedComponents/button";
import EmojiPicker from "../../Messenger/view/MessengerBox/components/emojiPicker";

const ChatBoxFoot = ({
    handleSend = () => { },
    FileUploader = <></>,
    handleClickAttachment = () => { },
    onSelectEmoji = () => { },
    onFocusTyping = () => { },
    onBlurTyping = () => { },
    msgInpRef = {},
    sendVoice = <></>,
}) => {
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    return (
        <div className="ChatBoxFoot fromSideBar" >
            <div className="ChatBoxInputHandler" >
                <div>
                    <SharedButton
                        onClick={() => setIsOpenEmoji(!isOpenEmoji)}
                        icon={faceIcon}
                        IconSize={15}
                    />

                </div>
                <div>
                    <SharedButton
                        onClick={handleClickAttachment}
                        icon={attachmentIcon}
                        className="mt-[2px]"
                        IconSize={9}
                    />
                </div>
            </div>
            <div className="ChatBoxInput" >
                <div>
                    <input
                        placeholder="Type a Message..."
                        ref={msgInpRef}
                        onFocus={onFocusTyping}
                        onBlur={onBlurTyping}
                        onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                                handleSend(e);
                                setIsOpenEmoji(false)
                                e.target.value = "";
                            }
                        }} />
                </div>
            </div>
            <div className="">{sendVoice}</div>
            <div className="" >
                <div>
                    <SharedButton
                        onClick={() => { }}
                        icon={sendIcon}
                        IconSize={15}
                    />
                </div>
            </div>
            {isOpenEmoji &&
                <EmojiPicker
                    onSelect={onSelectEmoji}
                    position={{ left: "0px", bottom: "45px" }}
                />}
            {FileUploader}
        </div>
    )
}
export default ChatBoxFoot;