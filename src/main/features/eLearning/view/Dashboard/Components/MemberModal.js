import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Modal } from "antd";
import { useSelector } from "react-redux";
import CustomSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import ApproverListItem from "../../../../../sharedComponents/AppComponents/Approvals/components/approverList";
import {
  addBookMember,
  addCourseMember,
  getAllBookMember,
  getAllCourseMember,
  GetBookById,
  GetCourseById,
  RemoveCousrseMemberAction,
  RemoveBookMemberAction,
} from "../../../store/action";
import { useParams } from "react-router-dom";
import {
  addMember,
  removeCourseMember,
  removeBookMember,
} from "../../../store/slice";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import { MemberEnum } from "../../../constant";
import { NoDataFound } from "./index";

function MemberModal({ isOpen = false }) {
  const dispatch = useDispatch();
  const assignMemberId = useParams().id;
  const modalRequest = useSelector(
    (state) => state.eLearningSlice.addMemberModal
  );
  const { courseMembers, bookMembers, removeCourseMemberSuccess } = useSelector(
    (state) => state.eLearningSlice
  );
  const employees = useSelector((state) => state.sharedSlice.employees);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  let ModalOpen = modalRequest.status;
  let Type = modalRequest.type;

  useEffect(() => {
    if (Type === MemberEnum.courses) {
      ModalOpen && dispatch(getAllCourseMember(assignMemberId));
    }
    if (Type === MemberEnum.ebook) {
      ModalOpen && dispatch(getAllBookMember(assignMemberId));
    }
  }, [ModalOpen]);

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const handleClose = () => {
    dispatch(addMember(false));
  };

  const handleChange = (id) => {
    let b;
    let memberId = id.toString();
    const data = {
      id: assignMemberId,
      memberId: memberId,
    };
    if(Type === MemberEnum.courses)
    {
    let a = courseMembers.filter((item) => {
      return item.memberId === data.memberId
    });
     b = a[0] ? a[0].memberId : "";  
  }
  else if(Type === MemberEnum.ebook)
  {
    let a = bookMembers.filter((item) => {
    return item.memberId === data.memberId
  });
   b = a[0] ? a[0].memberId : "";  
  }
    
    if (data.memberId ===  b) {
      return message.error("Member Already Added")
    } else {
      if (Type === MemberEnum.courses) {
        dispatch(addCourseMember(data));
        dispatch(getAllCourseMember(assignMemberId));
      } else if (Type === MemberEnum.ebook) {
        dispatch(addBookMember(data));
        dispatch(getAllBookMember(assignMemberId));
      } else {
          message.error("Type is not defined");
      }
    }
  };

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const [newState, setNewState] = useState({
    members: [],
    memberType: null,
  });
  const handleMemberDelete = (id) => {
    let memberId = id.toString();
    const data = {
      id: assignMemberId,
      memberId: memberId,
    };
    if (Type === MemberEnum.courses) {
      dispatch(RemoveCousrseMemberAction(data));

      dispatch(removeCourseMember(memberId));
    } else if (Type === MemberEnum.ebook) {
      dispatch(RemoveBookMemberAction(data));
      dispatch(removeBookMember(memberId));
    }
  };

  // useEffect(() => {
  //   if (removeCourseMemberSuccess) {
  //     let memberId = id.toString();
  //     dispatch(removeCourseMember(memberId));
  //   }
  // }, [removeCourseMemberSuccess]);
  return (
    <Modal
      open={ModalOpen}
      onOk={(e) => {}}
      onCancel={handleClose}
      footer={false}
      closeIcon={<div />}
      className="ApproverModal"
      width={"360px"}
      destroyOnClose={true}
    >
      <CustomSelect
        style={{ marginBottom: "0px" }}
        data={firstTimeEmpData}
        selectedData={handleChange}
        canFetchNow={isFirstTimeDataLoaded}
        fetchData={fetchEmployees}
        placeholder={"Select Member"}
        isObject={true}
        loadDefaultData={false}
        optionComponent={(opt) => {
          return (
            <>
              <Avatar
                name={opt.name}
                src={opt.image}
                round={true}
                width={"30px"}
                height={"30px"}
              />
              {opt.name}
            </>
          );
        }}
        dataVal={value}
        name="members"
        showSearch={true}
        // direction={Direction}
        rules={[
          {
            required: true,
            message: "Please Select Member",
          },
        ]}
      />
      {courseMembers?.length > 0 || bookMembers.length > 0 ? (
        <ApproverListItem
          className="AddMemberModal"
          handleDelete={handleMemberDelete}
          data={
            Type === MemberEnum.ebook
              ? bookMembers
              : Type === MemberEnum.courses
              ? courseMembers
              : ""
          }
        />
      ) : (
        <NoDataFound />
      )}
    </Modal>
  );
}

export default MemberModal;
