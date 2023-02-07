import React, { useState } from "react";
// import { DocsComposerEnums, DOCUMENT_ENUM } from '../../../constant';
import { useDispatch } from "react-redux";
import {
  addMember,
  handleBoardComposer,
  updaateWorkboardById,
} from "../store/slice";
import MemberModal from "../Dashboard/MemberModal";

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

    handleClose();
  };
  const handleOpenMembers = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(true);
    dispatch(addMember({ status: true }));
    setVisible(true);

    handleClose();
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
      {visible && <MemberModal data={data} />}
    </div>
  );
};
export default ContentOptions;
