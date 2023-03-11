import { Modal } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import Avatar from "../../../Avatar/avatarOLD";
import { getAllDefaultApproversAction } from "../../../../features/defaultApprovers/store/action";
import CustomSelect from "../../../AntdCustomSelects/SharedSelects/MemberSelect";
import { useSelector } from "react-redux";
import { addApproversAction } from "../action/action";
import ApproverListItem from "./approverList";
import DetailModal from "../../../../sharedComponents/ItemDetails";

const payloadData = {
  pageNo: 1,
  pageSize: 20,
  search: "",
};

function AddAprrovalModal({ data, module, reference }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState([]);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [currentType, setCurrentType] = useState("");

  let approverIdArray = data.map((item) => {
    return item.approverId;
  });
  let approverId = approverIdArray.toString();
  let approvalTypeArray = data.map((item) => {
    return item.approvalType;
  });
  let approvalType = approvalTypeArray.toString();

  let referenceIdArray = data.map((item) => {
    return item.referenceId;
  });
  let referenceId = referenceIdArray.toString();

  const employees = useSelector((state) => state.sharedSlice.employees);
  const { loader, approversData } = useSelector((state) => state.approverSlice);
  console.log(data, "lllll");

  const selectedData = (data) => {
    setValue(data);
  };

  //   const filterType = (type) => {
  //     return approversData.filter((item) => item.type === type);
  //   };

  useEffect(() => {
    dispatch(getAllDefaultApproversAction(payloadData));
  }, []);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const handleChange = (approverId) => {
    console.log(approverId)
    console.log(module);
    console.log(reference)
    const payload = {
      approverId: approverId[0],
      module: module,
      referenceId: reference
    }
    dispatch(addApproversAction(payload));
  
  };

  return (
    <>
      {/* <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modalWrapper"
      >
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Select Approval
            </label>
            <CustomSelect
              data={firstTimeEmpData}
              selectedData={selectedData}
              canFetchNow={isFirstTimeDataLoaded}
              fetchData={fetchEmployees}
              placeholder={"Select Member"}
              isObject={true}
              loadDefaultData={false}
              onChange={handleChange}
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
              name="approvers"
              showSearch={true}
              // direction={Direction}
            />
          </div>
        </div>
        <div className="defaultApprovalsListing">
          <ApproverListItem data={approversData} />
        </div>
      </Modal> */}
      <DetailModal
      //data daalo
        data={data} //Data of members will pass here in array
        isDeleteDisabled={true} //Pass true to hide delete icon
        addEnabled={true} //Pass false to hide select member
        addFunc={handleChange} // define and pass addMember action of particular members
        onDelete={false} // define and pass onDeletemember actions of particular members
        isSearch={false} //Pass true if you want to search the list
        openModal={true} // pass true if you want to open member details in modal other wise it display in listing
      />
    </>
  );
}

export default AddAprrovalModal;
