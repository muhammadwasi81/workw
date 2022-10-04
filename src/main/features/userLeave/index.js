import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import './style.css'

const columns = [
  {
    title: "Leave Type",
    dataIndex: "leaveType",
    ellipsis: true,
    key: "leaveType",
  },
  {
    title: "Alloted",
    dataIndex: "alloted",
    ellipsis: true,
    key: "alloted",
  },
  {
    title: "Availed",
    dataIndex: "availed",
    ellipsis: true,
    key: "availed",
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

function UserLeave() {
  const { id } = useParams();
  const {
    employee: { basicdetails },
  } = useSelector((state) => state.employeeSlice);
  console.log(id, "ID")
  console.log(basicdetails, "dataa employee kaa yahan aa raha hay")

  return (
    <div className="userLeavesTable">
        <Table columns={columns} dragable={true} dataSource={basicdetails.leaves} />
    </div>
  );
}

export default UserLeave;
