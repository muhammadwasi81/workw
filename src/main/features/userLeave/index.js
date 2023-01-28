import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import "./style.css";
import { useDispatch } from "react-redux";
import { GetLeaveUserById } from "../leave/store/actions";

const columns = [
  {
    title: "Leave Type",
    dataIndex: "leaveTypeName",
    ellipsis: true,
    key: "leaveTypeName",
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
  const dispatch = useDispatch();
  useEffect(() => {
    //TODO: dispatch get leaveUserById
    dispatch(GetLeaveUserById(id));
  }, []);
  const {
    employee: { basicdetails },
  } = useSelector((state) => state.employeeSlice);

  const { leaves } = useSelector((state) => state.leaveSlice);
  console.log(leaves, "leaves");

  return (
    <div className="userLeavesTable">
      <Table
        columns={columns}
        dragable={true}
        dataSource={leaves ? leaves : []}
      />
    </div>
  );
}

export default UserLeave;
