import React from "react";
import closeMailIcon from '../../../../content/NewContent/Messenger/closeMailIcon.svg';
import recordIcon from "../../../../content/NewContent/Messenger/record.png";

import { useDispatch } from "react-redux";
import SharedButton from "../../../sharedComponents/button";
import PreviewModal from "../../documents/view/components/modal";
import { handleRemoveCallWindow, toggleCallWindow } from "../store/slice";
import CallPreviewModal from "./components/minimizedCall";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";

function CallWindow({ item }) {
    console.log(item, "ITEMSSS")
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(toggleCallWindow(true))
    };
    const handleClose = () => {
        dispatch(handleRemoveCallWindow())
    };
    return (
        <>
            {!item.isOpen &&
                <div className="ChatBoxHead document-minimized-header call-minimized">
                    <div className="ChatBoxName" onClick={handleOpen}>
                        {/* <Avatar
                            src={""}
                            height={30}
                            width={30}
                            name="Abu Bakar"
                            round
                        /> */}
                            <img className='recordBlink' style={{ height: "15px", margin: "0 0px 0 10px" }} src={recordIcon} />
                        <div className="chatName">{"Ongoing Call"}</div>
                    </div>
                    <div>
                        <div>
                            <SharedButton onClick={handleClose} icon={closeMailIcon} />
                        </div>
                    </div>
                </div>}

            <CallPreviewModal
                isMinimizedModal={true}
                previewItem={item.isOpen ? item : null}
                handleClose={handleClose} />
        </>
    )
}
export default CallWindow;