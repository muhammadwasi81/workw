<<<<<<< HEAD
import React, { useState } from 'react';
// import { DocsComposerEnums, DOCUMENT_ENUM } from '../../../constant';
import { useDispatch } from 'react-redux';
import { AssignMemEnum, MemberEnum } from '../../eLearning/constant';
=======
import { message } from "antd";
import React, { useState } from "react";
// import { DocsComposerEnums, DOCUMENT_ENUM } from '../../../constant';
import { useDispatch } from "react-redux";
import { handleItemDetailModal } from "../../../../utils/Shared/store/slice";
import DetailModal from "../../../sharedComponents/ItemDetails";
import { AssignMemEnum, MemberEnum } from "../../eLearning/constant";

import { addLeadManagereMember, deleteLeadManagerById } from "../store/actions";
>>>>>>> 0541c1790ac6d80403defa54b21a8eeabbba0ffd
// import { handleOpenDocComposer, handleUpdateFolder, handleUpdateFolderMemberId } from '../../../store/slice';
import {
  getLeadManagerGroupDetailById,
  handleComposer,
  addMember,
} from '../store/slice';
import MemberModal from '../view/Modal/MemberModal';

const ContentOptions = ({ handleClose, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
<<<<<<< HEAD
  console.log(data, 'ContentOptions');
=======
  console.log(data, "dataaaaaaaaa");
>>>>>>> 0541c1790ac6d80403defa54b21a8eeabbba0ffd

  const handleUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // getDetailById(data.id);
    dispatch(getLeadManagerGroupDetailById(data.id));
    dispatch(handleComposer({ isOpen: true, isEdit: true }));
    handleClose(false);
  };
  const handleOpenMembers = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(true);
    // dispatch(addMember({ status: true }));
    dispatch(handleItemDetailModal(true));

    handleClose(false);
  };
  const addFunc = (myid) => {
    let memberId = myid.toString();
    const membersData = {
      id: data.id,
      memberId: memberId,
    };
    let a = data.members.filter((item) => {
      return item.member.id === membersData.memberId;
    });
    let b = a[0] ? a[0].memberId : "";
    if (membersData.memberId === b) {
      return message.error("Member Already Added");
    } else {
      dispatch(addLeadManagereMember(membersData));
    }
  };

  const onDelete = (myid) => {
    const memberId = myid.toString();
    const delmembers = {
      id: data.id,
      memberId: memberId,
    };

    dispatch(deleteLeadManagerById(delmembers));
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
        <DetailModal
          data={data?.members} //Data of members will pass here in array
          isDeleteDisabled={false} //Pass true to hide delete icon
          addEnabled={true} //Pass false to hide select member
          addFunc={addFunc} // define and pass addMember action of particular members
          onDelete={onDelete} // define and pass onDeletemember actions of particular members
          isSearch={false} //Pass true if you want to search the list
          openModal={true} // pass true if you want to open member details in modal other wise it display in listing
        />
      </div>
    </>
  );
};
export default ContentOptions;
