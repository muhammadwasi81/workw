// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { Table } from "antd";
// import "./style.css";
// import { useDispatch } from "react-redux";
// import { getUserLeave } from "../userLeave/store/actions";
// import { Button, DatePicker, Divider, Form, Input, Select } from "antd";
// import { EditOutlined } from "@ant-design/icons";
// import EditableTable from "./EditableTable";
// const columns = [
//   {
//     title: "Leave Type",
//     dataIndex: "leaveType",
//     ellipsis: true,
//     key: "leaveTypeName",
//   },
//   {
//     title: "Alloted",
//     dataIndex: "allocatedLeaves",
//     ellipsis: true,
//     key: "alloted",
//     editable: true, // make this column editable
//   },
//   {
//     title: "Availed",
//     dataIndex: "availed",
//     ellipsis: true,
//     key: "availed",
//     editable: true, // make this column editable
//   },
// ];

// const handleSave = (row) => {
//   console.log(row, "updated row");
// };

// function UserLeave({ mode }) {
//   const isEdit = mode === "edit";
//   const [form] = Form.useForm();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     //TODO: dispatch get leaveUserById
//     dispatch(getUserLeave(id));
//   }, []);
//   const {
//     employee: { basicdetails },
//   } = useSelector((state) => state.employeeSlice);

//   // const handleSubmit = async () => {
//   //   form.submit();
//   //   let data;
//   //   console.log(...form.getFieldsValue(), "fields value");

//   //   // data = {
//   //   //   ...form.getFieldsValue(),

//   //   //   userId: id,
//   //   // };
//   // };
//   const [dataSource, setDataSource] = useState(allLeaves ? allLeaves : []);

//   // Define a function to handle the value change
//   const handleValueChange = (record, dataIndex, value) => {
//     // Find the index of the record in the data source
//     const index = dataSource.findIndex((item) => item.key === record.key);

//     // Create a new copy of the record and update the value
//     const updatedRecord = {
//       ...record,
//       [dataIndex]: value,
//     };

//     console.log(updatedRecord, "updatedRecord");

//     // Create a new copy of the data source and update the record
//     const updatedDataSource = [...dataSource];
//     updatedDataSource.splice(index, 1, updatedRecord);

//     // Update the state with the new data source
//     setDataSource(updatedDataSource);

//     const EditableCell = ({
//       editing,
//       dataIndex,
//       title,
//       inputType,
//       record,
//       index,
//       handleValueChange,
//       children,
//       ...restProps
//     }) => {
//       // ...
//       const onChange = (e) => {
//         const value = e.target.value;
//         handleValueChange(record, dataIndex, value);
//         console.log(value, "valueeeeee");
//       };
//       // ...
//     };
//   };
//   return (
//     <div>
//       {/* <div className="employeeForm">
//         <Divider orientation="left">Leaves Info</Divider>
//         <Form name="familyInfo" layout={"vertical"}>
//           <Form.Item
//             name="Leave Type"
//             label={"Leave Type"}
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Leave Type" type="text" />
//           </Form.Item>

//           <Form.Item
//             name="Alloted"
//             label={"Alloted"}
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Availed" type="number" />
//           </Form.Item>
//           <Form.Item
//             name="Availed"
//             label={"Availed"}
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Availed" type="number" />
//           </Form.Item>
//         </Form>
//         {/* <div className={isEdit ? "editButtons " : "buttons"}> */}
//       {/* <Button
//           type="dashed"
//           style={{ marginLeft: "auto" }}
//           icon={<EditOutlined />}
//           onClick={handleSubmit} */}
//       {/* // disabled= */}
//       {/* {disableAdd ? true : false} */}
//       {/* > */}
//       {/* Add Rebate */}
//       {/* </Button> */}
//       {/* {isEdit && (
//             <Buttons
//               className="btn ThemeBtn"
//               icon={<EditOutlined />}
//               // onClick={handleUpdate}
//               // disabled={!disableAdd ? true : false}
//             >
//               Update Rebate
//             </Button>
//           )} */}
//       {/* </div> */}
//       {/* <div className="rebateTable" style={{ marginTop: "1rem" }}></div>
//       </div>  */}
//       {/* <div className="userLeavesTable">
//         <Table
//           columns={columns}
//           dragable={true}
//           dataSource={allLeaves ? allLeaves : []}
//         />
//       </div> */}
//       <EditableTable
//         columns={columns}
//         dragable={true}
//         dataSource={dataSource}
//         handleValueChange={handleSave}
//       />
//     </div>
//   );
// }

// export default UserLeave;
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUserLeave } from "../userLeave/store/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserLeave = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserLeave(id));
  }, []);

  const handelAllocated = (e, item, name) => {
    allLeaves.map((x) => {
      if (x.id === item.id) {
        return setInitialState([
          {
            ...x,
            allocatedLeaves: e.target.value,
          },
          { ...x, availed: e.target.value },
        ]);
      }
      // if (x.id === item.id) {
      //   return setInputValues({ ...x, availed: e.target.value });
      // }
      console.log(x);
    });
  };

  const { allLeaves } = useSelector((state) => state.userLeaveSlice);

  const [initialState, setInitialState] = useState(allLeaves);

  const columns = [
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Allocated",
      dataIndex: "allocatedLeaves",
      key: "allocatedLeaves",
    },
    {
      title: "Availed",
      dataIndex: "availed",
      key: "availed",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={allLeaves} />
      <button>Update</button>
    </div>
  );
};

export default UserLeave;
