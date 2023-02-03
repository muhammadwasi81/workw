import React, { useContext,useState,useEffect } from 'react';
import { TeamTable } from './TaskTable/TeamTable';
import ModalComponent from './modal';
import { Table } from 'antd';
import { useSelector,useDispatch} from "react-redux";
import {getDeviceInfoAction} from "../store/action";
import { ActivityLogTbale } from './ActivityLogTable';
import { useParams } from 'react-router-dom';
import "../Styles/table.css"

function ActivityLog() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const {
    team: { devicedetails },
  } = useSelector((state) => state.teamSlice);
  // const { deviceDetails } = useSelector((state) => state.teamSlice);

  console.log(devicedetails,"deviceDetailsdeviceDetails");

  const { id } = useParams();
  let myId = user.id ? user.id : id;

  useEffect(() => {
    dispatch(getDeviceInfoAction([user?.id]));
  }, []);
  
  console.log(user.id, 'userIdddd');


  const showModal = () => {
    setIsModalOpen(true);
  };
 
  return (
    <>
     <div className="deviceTable">
      <Table
        bordered
        columns={ActivityLogTbale}
        className="custom_table"
        onClick={showModal}
        dataSource={devicedetails?devicedetails:[]}
      />
      </div>
      <ModalComponent showModal={isModalOpen} />
    </>
  );
}
export default ActivityLog;
