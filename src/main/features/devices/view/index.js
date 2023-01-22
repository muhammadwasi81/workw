import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import './style.css'
import {getUserDeviceInfo} from "../store/action";

const columns = [
    {
        title: "Date",
        //dataIndex: "deviceType",
        ellipsis: true,
        key: "Date",
    },
  {
    title: "Device type",
    dataIndex: "deviceType",
    ellipsis: true,
    key: "deviceType",
  },
  {
    title: "Device token",
    dataIndex: "deviceToken",
    ellipsis: true,
    key: "deviceToken",
  },
  {
    title: "OS Version",
    dataIndex: "osVersion",
    ellipsis: true,
    key: "osVersion",
  },
  {
    title: "Device IP",
    dataIndex: "device",
    ellipsis: true,
    key: "device",
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

  //const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const userId = user.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDeviceInfo(userId));
  }, []);

  console.log("userIduserId",userId);
  
  const {employee: { devicedetails },} = useSelector((state) => state.employeeSlice);
console.log(devicedetails,"devicedetailss")
  return (
    <div className="deviceTable">
        <Table columns={columns} dragable={true} 
         dataSource={devicedetails}
         />
    </div>
  );
}

export default Devices;
