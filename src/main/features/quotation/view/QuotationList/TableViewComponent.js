import React, { useState } from "react";
import { Modal } from "antd";
import { Table } from "../../../../sharedComponents/customTable";
import { quotationTableColumn } from "./tableColumns";
import QuotationDetail from "../CreateQuotation/components/quotationDetail";

const TableViewComponent = ({ data }) => {
  // const listData = useSelector((state) => state.quotationSlice.quotationList);
  const [openModal, setOpenModal] = useState(false);
  const [details, setDetails] = useState({});

  const handleCancel = () => {
    console.log("set cancel");
    setOpenModal(false);
  };

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        setOpenModal(true);
        setDetails(record);
      }, // click row
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };

  return (
    <>
      <Table
        columns={quotationTableColumn()}
        dragable={true}
        data={data ? data : []}
        onRow={onRow}
      />
      {openModal && (
        <Modal
          visible={openModal}
          onCancel={handleCancel}
          footer={null}
          width={"50%"}
        >
          <QuotationDetail details={details} />
        </Modal>
      )}
    </>
  );
};

export default TableViewComponent;
