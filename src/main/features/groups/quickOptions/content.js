import { Drawer } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleItemDetailModal } from "../../../../utils/Shared/store/slice";
import DetailModal from "../../../sharedComponents/ItemDetails";
import {
  addGroupMemberAction,
  deleteGroupMemberAction,
} from "../store/actions";
import { getGroupDetailById, handleComposer, addMember } from "../store/slice";
import MemberModal from "../view/Modal/MemberModal";

const ContentOptions = ({ handleClose, data }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { groupDetailid } = params;

  const handleUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(getGroupDetailById(data.id));
    dispatch(handleComposer({ isOpen: true, isEdit: true }));
    handleClose(false);
  };

  const handleOpenMembers = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(true);
    dispatch(handleItemDetailModal(true));
    handleClose(false);
  };

  const addFunc = (id) => {
    let memberId = id.toString();
    const members = {
      id: data.id,
      memberId: memberId,
    };
    dispatch(addGroupMemberAction(members));
  };

  const onDelete = (id) => {
    const memberId = id.toString();
    const delmembers = {
      id: data.id || groupDetailid,
      memberId: memberId,
    };

    dispatch(deleteGroupMemberAction(delmembers));
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
        {/* {visible && <MemberModal data={data} />} */}
        {
          //props will be passed for all functions that will be used
          <DetailModal
            data={data?.members} //Data of members will pass here in array
            isDeleteDisabled={false} //Pass true to hide delete icon
            addEnabled={true} //Pass false to hide select member
            addFunc={addFunc} // define and pass addMember action of particular members
            onDelete={onDelete} // define and pass onDeletemember actions of particular members
            isSearch={false} //Pass true if you want to search the list
            openModal={true} // pass true if you want to open member details in modal other wise it display in listing
            visible={visible}
            setVisible={(da) => setVisible(da)}
          />
        }
      </div>
    </>
  );
};
export default ContentOptions;
