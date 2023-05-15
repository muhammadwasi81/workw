import React from "react";
import mailMinimizeIcon from '.././../../../../../content/NewContent/Messenger/mailMinimizeIcon.svg';
import closeMailIcon from '.././../../../../../content/NewContent/Messenger/closeMailIcon.svg';
import mailResizeIcon from '.././../../../../../content/NewContent/Messenger/mailResizeIcon.svg';
import SharedButton from "../../../../../sharedComponents/button";
import { useDispatch } from "react-redux";
import { toggleCallWindow } from "../../../store/slice";

function MadalHeader({
  title,
  handleClose,
  document,
  isMinimizedModal
}) {
  const dispatch = useDispatch();

  const handleMaximize = () => {
    handleClose()
    window.open(document?.callUrl, "_blank", "location=yes,height=1000,width=1200,scrollbars=yes,status=yes")
  }
  const handleMinimize = () => {
    dispatch(toggleCallWindow(false))
  }

  return (
    <div className="doc-modal-header call-modal-header" >
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