import React, { useState } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import ApplicantDetail from "./ApplicantDetail";
import { tableColumn } from "./TableColumn";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import { Table } from "../../../../sharedComponents/customTable";

const TabElement = () => {
  const { careerApplicants } = useSelector((state) => state.careerSlice);
  const [applicantDetail, setApplicantDetail] = useState({});
  const [openDetail, setOpenDetail] = useState(false);

  console.log(careerApplicants, "career applicants");

  const getApplicant = (data) => {
    console.log(data, "data in function");
    setOpenDetail(true);
    setApplicantDetail(data);
  };

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        getApplicant(record);
      }, // click row
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };

  const handleOk = () => {
    setOpenDetail(false);
  };

  const handleCancel = () => {
    setOpenDetail(false);
  };

  return (
    <>
      {openDetail && (
        <Modal
          visible={openDetail}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={"50%"}
        >
          <ApplicantDetail data={applicantDetail} />
        </Modal>
      )}
      <Table
        columns={tableColumn()}
        dragable={true}
        data={careerApplicants ? careerApplicants : []}
        onRow={onRow}
      />
      {/* {careerApplicants.map((item, index) => {
        return (
          <div
            className="bg-white flex justify-around rounded-lg h-9 items-center font-bold cursor-pointer"
            key={index}
            onClick={() => getApplicant(item)}
          >
            <div>{`${item.firstName} ${item.lastName}`}</div>
            <div>{item.email ? item.email : "-"}</div>
            <div>{item.phoneNumber ? item.phoneNumber : "-"}</div>
            <StatusTag status={item.status} />
          </div>
        );
      })} */}
    </>
  );
};

export default TabElement;
