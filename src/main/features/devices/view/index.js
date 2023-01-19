import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import './style.css'

const columns = [
    {
        title: "Date",
        //dataIndex: "leaveType",
        ellipsis: true,
        key: "Date",
    },
  {
    title: "Device type",
    //dataIndex: "leaveType",
    ellipsis: true,
    key: "Device type",
  },
  {
    title: "Device token",
    //dataIndex: "alloted",
    ellipsis: true,
    key: "Device token",
  },
  {
    title: "OS Version",
    //dataIndex: "availed",
    ellipsis: true,
    key: "OS Version",
  },
  {
    title: "Device IP",
    //dataIndex: "availed",
    ellipsis: true,
    key: "Device IP",
  },

  // {
  //   title: sharedLabels.action,
  //   render: (value, __, rowIndex) => {
  //     return (
  //       <a
  //         href=" "
  //         onClick={(e) => {
  //           e.preventDefault();
  //           if (isEdit) {
  //             handleRowChange(rowIndex);
  //           } else {
  //             const filterArray = bankDetails.filter((value, i) => {
  //               if (rowIndex !== i) return value;
  //             });
  //             setBankDetails(filterArray);
  //           }
  //         }}
  //       >
  //         {isEdit ? sharedLabels.Edit : sharedLabels.Delete}
  //       </a>
  //     );
  //   },
  // },
];

function Devices() {
  const { id } = useParams();
  const {
    employee: { basicdetails },
  } = useSelector((state) => state.employeeSlice);

  return (
    <div className="deviceTable">
        <Table columns={columns} dragable={true} 
         //dataSource={basicdetails.leaves}
         />
    </div>
  );
}

export default Devices;
