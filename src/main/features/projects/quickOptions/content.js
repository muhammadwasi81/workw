import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleComposer, addMember, updateProjectById } from "../store/slice";
import {
  addProjectMemberAction,
  deleteProjectMemberAction,
} from "../store/actions";
import DetailModal from "../../../sharedComponents/ItemDetails";
import { useParams } from "react-router-dom";
import { handleItemDetailModal } from "../../../../utils/Shared/store/slice";
import MemberModal from "../UI/MemberModal";

const ContentOptions = ({ handleClose, data }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { projectDetailid } = params;

  const addFunc = (id) => {
    let memberId = id.toString();
    const members = {
      id: data.id,
      memberId: memberId,
    };
    dispatch(addProjectMemberAction(members));
  };

  const onDelete = (id) => {
    const memberId = id.toString();
    const delmembers = {
      id: data.id || projectDetailid,
      memberId: memberId,
    };

    dispatch(deleteProjectMemberAction(delmembers));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(updateProjectById(data.id));
    dispatch(handleComposer({ isOpen: true, isEdit: true }));
    handleClose(false);
  };
  const handleOpenMembers = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(true);
    dispatch(handleItemDetailModal({ status: true }));
    handleClose(false);
  };

  return (
    <>
      {visible && (
        <DetailModal
          data={data?.members} //Data of members will pass here in array
          isDeleteDisabled={false} //Pass true to hide delete icon
          addEnabled={true} //Pass false to hide select member
          addFunc={addFunc} // define and pass addMember action of particular members
          onDelete={onDelete} // define and pass onDeletemember actions of particular members
          isSearch={false} //Pass true if you want to search the list
          openModal={true} // pass true if you want to open member details in modal other wise it display in listing
        />
      )}
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
        {/* {visible && <MemberModal data={data} />} */}
      </div>
    </>
  );
};
export default ContentOptions;
