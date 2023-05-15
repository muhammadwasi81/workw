import React from "react";
import mailMinimizeIcon from '.././../../../../../content/NewContent/Messenger/mailMinimizeIcon.svg';
import closeMailIcon from '.././../../../../../content/NewContent/Messenger/closeMailIcon.svg';
import mailResizeIcon from '.././../../../../../content/NewContent/Messenger/mailResizeIcon.svg';
import SharedButton from "../../../../../sharedComponents/button";
import { callingWindowOptions } from "../../../../../../utils/base";
import { useDispatch } from "react-redux";
import { handleAddMinimizeDocument, toggleMinimizeDocument } from "../../../store/slice";

function MadalHeader({
  title,
  handleClose,
  document,
  isMinimizedModal,
}) {
  const dispatch = useDispatch();

  const handleMaximize = () => {
    window.open(document?.path, "_blank", "location=yes,height=1000,width=1200,scrollbars=yes,status=yes")
  }
  const handleMinimize = () => {
    if (isMinimizedModal) {
      dispatch(toggleMinimizeDocument({
        id: document.id,
        status: false
      }))
    } else {
      dispatch(handleAddMinimizeDocument({ document, status: false }));
      handleClose()
    }
  }

  return (
    <div className={`doc-modal-header`} >
      <div className="doc-modal-title" >
        {title}
      </div>
      <div className="doc-modal-actions" >
        <div>
          <SharedButton onClick={handleMinimize} buttonClass="mb-[7px]" icon={mailMinimizeIcon} />
        </div>
        <div>
          <SharedButton onClick={handleMaximize} icon={mailResizeIcon} />
        </div>
        <div>
          <SharedButton onClick={handleClose} icon={closeMailIcon} />
        </div>
      </div>
    </div>
  );
}

export default MadalHeader;