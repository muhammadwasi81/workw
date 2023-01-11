import React, { useState } from 'react';
// import { DocsComposerEnums, DOCUMENT_ENUM } from '../../../constant';
import { useDispatch } from 'react-redux';
import { addMember, handleBoardComposer, updaateWorkboardById } from '../store/slice';
// import { handleOpenDocComposer, handleUpdateFolder, handleUpdateFolderMemberId } from '../../../store/slice';

const ContentOptions = ({ handleClose, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const handleUpdate = () => {
    dispatch(updaateWorkboardById(data.id));
    dispatch(
      handleBoardComposer({
        isEdit: true,
        isVisible: true,
          })
      );
        // dispatch(handleUpdateFolder(data));
        // dispatch(handleUpdateFolder(data));
    handleClose();
  }
  const handleOpenMembers = () => {
    dispatch(addMember({ status: true }));
    setVisible(true);
    // dispatch(handleOpenDocComposer(DocsComposerEnums.updateMember));
    // dispatch(handleUpdateFolderMemberId(data))
    
    handleClose();
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
        onClick={handleUpdate}>
        {/* <RiShareForwardLine className="text-xl text-[#5B626A]" /> */}
        <span>Update</span>
      </div>
      <div className="flex gap-3 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
        onClick={handleOpenMembers}>
        {/* <BsChatSquareText className="text-md text-[#5B626A]" /> */}
        <span>Members</span>
      </div>
    </div>
  );
};
export default ContentOptions;