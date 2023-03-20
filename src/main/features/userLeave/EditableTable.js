import React from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import "./style.css";
import { useDispatch } from "react-redux";
import { getUserLeave } from "../userLeave/store/actions";
import { Button, DatePicker, Divider, Form, Input, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
const handleSave = (row) => {
  //TODO: dispatch updateLeave
  console.log(row, "updated row");
};
// Define the EditableCell component
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,

  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const [data, setData] = useState();
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      toggleEdit();
      handleSave({ ...record, [dataIndex]: inputRef.current.value });
    } else if (e.key === "Escape") {
      toggleEdit();
    }
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Input
          ref={inputRef}
          defaultValue={record[dataIndex]}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            toggleEdit();
            handleSave({ ...record, [dataIndex]: inputRef.current.value });
          }}
        />
      ) : (
        <div
          className="editable-cell-value-wrap"
          //   style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      )}
    </td>
  );
};

const columns = [
  {
    title: "Leave Type",
    dataIndex: "leaveType",
    ellipsis: true,
    key: "leaveTypeName",
    editable: true,
  },
  {
    title: "Alloted",
    dataIndex: "allocatedLeaves",
    ellipsis: true,
    key: "alloted",
    editable: true, // make this column editable
  },
  {
    title: "Availed",
    dataIndex: "availed",
    ellipsis: true,
    key: "availed",
    editable: true, // make this column editable
  },
];

const components = {
  body: {
    cell: EditableCell,
    bordered: false,
  },
};

const editableColumns = columns.map((col) => {
  if (!col.editable) {
    console.log(col, "col");

    return col;
  }

  return {
    ...col,
    onCell: (record) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave: handleSave,
    }),
  };
});

const EditableTable = ({ dataSource }) => {
  const { allLeaves } = useSelector((state) => state.userLeaveSlice);

  return (
    <Table
      components={components}
      columns={editableColumns}
      dataSource={allLeaves ? allLeaves : []}
    />
  );
};

export default EditableTable;
