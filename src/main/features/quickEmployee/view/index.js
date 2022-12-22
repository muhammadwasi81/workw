import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import Form from "./form";
import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./tableColumn";
import { addQuickEmployee } from "../store/action";
import "./style.css";
import { clearItem, editItem, quickAddClose } from "../store/slice";
import UpdateForm from "./updateForm";

const QuickAdd = (props) => {
  const dispatch = useDispatch();

  const { isOpen, items, success, editData, loader } = useSelector(
    (state) => state.quickAddSlice
  );

  const handleAddQuick = () => {
    console.log(items, "sdsa");
    dispatch(addQuickEmployee(items));
    if (success) dispatch(clearItem());
  };

  const handleClose = () => {
    dispatch(quickAddClose());
    dispatch(clearItem());
  };

  useEffect(() => {
    if (success) {
      dispatch(quickAddClose());
    }
  }, [success]);

  return (
    <>
      <Modal
        visible={isOpen}
        width={1150}
        destroyOnClose={true}
        className="QuickAddModal"
        footer={false}
      >
        {editData === null ? <Form /> : <UpdateForm />}
        {items && items.length > 0 ? (
          <Table
            bordered
            columns={tableColumn(dispatch, editData)}
            className="custom_table"
            data={items}
          />
        ) : (
          ""
        )}
        <Button
          onClick={handleAddQuick}
          className="addQuickEmployeeButton"
          loading={loader ? true : false}
        >
          Submit
        </Button>
        <Button
          onClick={handleClose}
          className="closeButton"
          style={{ marginLeft: "4px" }}
        >
          Close
        </Button>
      </Modal>
    </>
  );
};

export default QuickAdd;
