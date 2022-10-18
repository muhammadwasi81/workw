import React from "react";
import mailMinimizeIcon from './assests/mailMinimizeIcon.svg';
import closeMailIcon from './assests/closeMailIcon.svg';
import mailResizeIcon from './assests/mailResizeIcon.svg';
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import SharedButton from "../../../sharedComponents/button";

const ChatBoxHead = (props) => {

  return(
    <div className="ChatBoxHead">
    <div className="ChatBoxName" >
        <Avatar src="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
            height={30} width={30} name="Abu Bakar" round />
        <div>Abu Bakar</div>
    </div>
    <div>
        <div>
            <SharedButton
                type="primary"
                shape="circle"
                size="small"
                onClick={() => {}}
                className="mb-[3px]"
                icon={mailMinimizeIcon}
                IconSize={12}
            />
        </div>
        <div>
            <SharedButton
                type="primary"
                shape="circle"
                size="small"
                onClick={() => {}}
                icon={mailResizeIcon}
                IconSize={12}
            />
        </div>
        <div>
            <SharedButton
                type="primary"
                shape="circle"
                size="small"
                onClick={() => {} }
                icon={closeMailIcon}
                IconSize={12}
            />
        </div>
    </div>
</div>
  )
}
export default ChatBoxHead;