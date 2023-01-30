import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import './style.css'
import {getAllSignupAction} from "../../companies/store/action";

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    ellipsis: true,
    key: "deviceType",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    ellipsis: true,
    key: "deviceToken",
  },
  {
    title: "Email",
    dataIndex: "email",
    ellipsis: true,
    key: "osVersion",
  },
  {
    title: "Phone",
    dataIndex: "phoneNo",
    ellipsis: true,
    key: "device",
  },
];

function Signup() {

  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const userId = user.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSignupAction());
  }, []);

  console.log("userIduserId",userId);  
  
  const { signup } = useSelector((state) => state.teamSlice);
  console.log(signup,"devicedetailss")
  return (
    <div className="deviceTable">
        <Table columns={columns} dragable={true} 
         dataSource={signup}
         />
    </div>
  );
}

export default Signup;
