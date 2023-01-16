import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEmployees } from '../../../../../../../utils/Shared/store/actions';
import MemberSelect from '../../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import Avatar from '../../../../../../sharedComponents/Avatar/avatarOLD';

const PostTaggedModal = ({ open = false, onCancel, onOk }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.sharedSlice.employees);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const selectedData = (data) => {
    console.log(data, 'data');
    setValue(data);
  };

  const handleChange = () => {
    console.log('handleChange triggered!');
  };

  useEffect(() => {
    fetchEmployees('', 0);
  }, []);

  const fetchEmployees = (text, pgNo) => {
    dispatch(
      getAllEmployees({
        text,
        pgNo,
        pgSize: 20,
      })
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      footer={false}
      closeIcon={<div />}
      className="ApproverModal"
      width={'360px'}
      destroyOnClose={true}
    >
      <MemberSelect
        style={{ marginBottom: '0px' }}
        data={firstTimeEmpData}
        onChange={handleChange}
        selectedData={selectedData}
        canFetchNow={isFirstTimeDataLoaded}
        fetchData={fetchEmployees}
        placeholder={'Select Employee'}
        isObject={true}
        loadDefaultData={false}
        optionComponent={(opt) => {
          return (
            <>
              <Avatar
                name={opt.name}
                src={opt.image}
                round={true}
                width={'30px'}
                height={'30px'}
              />
              {opt.name}
            </>
          );
        }}
        dataVal={value}
        name="readers"
        showSearch={true}
      />
    </Modal>
  );
};

export default PostTaggedModal;
