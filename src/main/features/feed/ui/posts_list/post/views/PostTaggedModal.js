import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmployees } from "../../../../../../../utils/Shared/store/actions";
import MemberSelect from "../../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Avatar from "../../../../../../sharedComponents/Avatar/avatarOLD";
import ItemDetailModal from "../../../../../../sharedComponents/ItemDetails";

const PostTaggedModal = ({ open = false, tags = [] }) => {
  // const employees = useSelector((state) => state.sharedSlice.employees);
  // const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  // const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  // const [value, setValue] = useState([]);

  // useEffect(() => {
  //   if (employees.length > 0 && !isFirstTimeDataLoaded) {
  //     setIsFirstTimeDataLoaded(true);
  //     setFirstTimeEmpData(employees);
  //   }
  // }, [employees]);

  // const selectedData = (data) => {
  //   console.log(data, "data");
  //   setValue(data);
  // };

  // const handleChange = () => {
  //   console.log("handleChange triggered!");
  // };

  // useEffect(() => {
  //   fetchEmployees("", 0);
  // }, []);

  // const fetchEmployees = (text, pgNo) => {
  //   dispatch(
  //     getAllEmployees({
  //       text,
  //       pgNo,
  //       pgSize: 20,
  //     })
  //   );
  // };

  return (
    <div className="tags-member">
      {open && (
        <ItemDetailModal
          data={tags} //Data of members will pass here in array
          isDeleteDisabled={true} //Pass true to hide delete icon
          addEnabled={false} //Pass false to hide select member
          addFunc={false} // define and pass addMember action of particular members
          onDelete={false} // define and pass onDeletemember actions of particular members
          isSearch={false} //Pass true if you want to search the list
          openModal={true} // pass true if you want to open member details in modal other wise it display in listing
        />
      )}
    </div>
    // <Modal
    //   open={open}
    //   onCancel={onCancel}
    //   onOk={onOk}
    //   footer={false}
    //   closeIcon={<div />}
    //   className="ApproverModal"
    //   width={"360px"}
    //   destroyOnClose={true}
    // >
    //   <MemberSelect
    //     style={{ marginBottom: "0px" }}
    //     data={firstTimeEmpData}
    //     onChange={handleChange}
    //     selectedData={selectedData}
    //     canFetchNow={isFirstTimeDataLoaded}
    //     fetchData={fetchEmployees}
    //     placeholder={"Select Employee"}
    //     isObject={true}
    //     loadDefaultData={false}
    //     optionComponent={(opt) => {
    //       return (
    //         <>
    //           <Avatar
    //             name={opt.name}
    //             src={opt.image}
    //             round={true}
    //             width={"30px"}
    //             height={"30px"}
    //           />
    //           {opt.name}
    //         </>
    //       );
    //     }}
    //     dataVal={value}
    //     name="readers"
    //     showSearch={true}
    //   />
    // </Modal>
  );
};

export default PostTaggedModal;
