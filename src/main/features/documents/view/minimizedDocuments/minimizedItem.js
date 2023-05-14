import React from "react";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import { getIconByExtensionType } from "../../constant/helpers";
import closeMailIcon from '../../../../../content/NewContent/Messenger/closeMailIcon.svg';
import SharedButton from "../../../../sharedComponents/button";
import { useDispatch } from "react-redux";
import { handleRemoveMinimizeDocument, toggleMinimizeDocument } from "../../store/slice";
import PreviewModalResizable from "../components/modal/PreviewModalResizable";

function MinimizedItem({ item }) {
    let { document } = item;
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(toggleMinimizeDocument({
            id: document.id,
            status: true
        }))
    };
    const handleClose = () => {
        dispatch(handleRemoveMinimizeDocument({id: document.id}))
    };

    return (
        <>
            {!item.isOpen &&
                <div className="ChatBoxHead document-minimized-header">
                    <div className="ChatBoxName" onClick={handleOpen}>
                        <img
                            alt=""
                            className="minimized-icon"
                            src={getIconByExtensionType(document.documentType, document.extensionTypeId, document.path)}
                        />
                        <div className="chatName">{document.name}</div>
                    </div>
                    <div>
                        <div>
                            <SharedButton onClick={handleClose} icon={closeMailIcon} />
                        </div>
                    </div>
                </div>}

            <PreviewModalResizable
                isMinimizedModal={true}
                previewItem={item.isOpen ? document : null}
                handleClose={handleClose} />
        </>
    )
}
export default MinimizedItem;