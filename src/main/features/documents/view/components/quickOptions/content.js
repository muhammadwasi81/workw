import React from "react";
import { DocsComposerEnums, DOCUMENT_ENUM } from "../../../constant";
import { useDispatch } from "react-redux";
import {
  handleOpenDocComposer,
  handleUpdateFolder,
  handleUpdateFolderMemberId,
} from "../../../store/slice";

const ContentOptions = ({ handleClose, data }) => {
  const dispatch = useDispatch();
  const handleUpdate = () => {
    switch (data.documentType) {
      case DOCUMENT_ENUM.DUCOMENT_TYPE.folder:
        dispatch(handleUpdateFolder(data));
        break;

      default:
        dispatch(handleUpdateFolder(data));
    }
    handleClose(data.documentType);
    console.log(data.documentType, "doc typeeee");
  };
  const handleOpenMembers = () => {
    dispatch(handleOpenDocComposer(DocsComposerEnums.updateMember));
    dispatch(handleUpdateFolderMemberId(data));

    handleClose(data.documentType);
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex gap-2 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
        onClick={handleUpdate}
      >
        {/* <RiShareForwardLine className="text-xl text-[#5B626A]" /> */}
        <span>Update</span>
      </div>
      <div
        className="flex gap-3 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
        onClick={handleOpenMembers}
      >
        {/* <BsChatSquareText className="text-md text-[#5B626A]" /> */}
        <span>Members</span>
      </div>
    </div>
  );
};
export default ContentOptions;
