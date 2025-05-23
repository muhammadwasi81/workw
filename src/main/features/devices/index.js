import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import './view/styles/style.css';
import { getUserDeviceInfoAction } from './store/action';
import { tableDevicesColumn } from './view/tableColumn';

const Devices = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const {
    employee: { devicedetails },
  } = useSelector((state) => state.employeeSlice);

  useEffect(() => {
    dispatch(getUserDeviceInfoAction([user?.id]));
  }, [dispatch, user?.id]);

  console.log(user.id, 'userId');
  console.log(devicedetails, 'deviceDetails');
  return (
    <div className="deviceTable">
      <Table
        columns={tableDevicesColumn}
        dragable={true}
        dataSource={devicedetails}
      />
    </div>
  );
};

export default Devices;
