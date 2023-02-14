import { Drawer } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupDetailById, handleComposer, addMember } from "../store/slice";

import MemberModal from "../view/Modal/MemberModal";

const ContentOptions = ({ handleClose, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { isComposerOpen, groupDetail, isEditComposer } = useSelector(
    (state) => state.groupSlice
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // getDetailById(data.id);
    dispatch(getGroupDetailById(data.id));
    dispatch(handleComposer({ isOpen: true, isEdit: true }));
    handleClose(false);
  };
  const handleOpenMembers = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(true);
    dispatch(addMember({ status: true }));
    handleClose(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <div
          className="flex gap-2 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
          onClick={(e) => handleUpdate(e)}
        >
          {/* <RiShareForwardLine className="text-xl text-[#5B626A]" /> */}
          <span>Update</span>
        </div>
        <div
          className="flex gap-3 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
          onClick={(e) => handleOpenMembers(e)}
        >
          {/* <BsChatSquareText className="text-md text-[#5B626A]" /> */}
          <span>Members</span>
        </div>
        {visible && <MemberModal data={data} />}
      </div>
    </>
  );
};
export default ContentOptions;
