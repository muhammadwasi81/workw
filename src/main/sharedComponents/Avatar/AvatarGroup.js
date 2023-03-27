import { useState } from 'react';
import { Avatar, Modal } from 'antd';
import { getNameForImage } from '../../../utils/base';
import './style.css';
import { useNavigate } from 'react-router-dom';
import ItemDetailModal from '../ItemDetails';
import { handleItemDetailModal } from '../../../utils/Shared/store/slice';
// import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { addLeadManagereMember } from '../../features/leadmanager/store/actions';
import { useEffect } from 'react';
import { getAllEmployees } from '../../../utils/Shared/store/actions';
import CustomSelect from '../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';

function AvatarGroup(props) {
  // console.log(props, 'props');
  const employees = useSelector((state) => state.sharedSlice.employees);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
    dispatch(handleItemDetailModal(true));
  };
  // const handleChange = () => {
  //   console.log('addFunc');
  //   const payloadData = props.membersData.map((member) => {
  //     return {
  //       id: member.leadManagerId,
  //       memberId: member.memberId,
  //     };
  //   });
  //   setValue(payloadData);
  //   console.log('membersData', payloadData);
  // };

  const handleChange = (memberId, leadManagerId) => {
    console.log('memberId', memberId);
    console.log('leadManagerId', leadManagerId);

    const payloadData = props.membersData.map((member) => {
      return {
        id: member.leadManagerId,
        memberId: member.memberId,
      };
    });
    console.log('membersData', payloadData);
  };

  const handleOk = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(false);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchEmployees('', 0);
  }, []);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  return (
    <div onClick={(e) => showModal(e)} className="inline-flex">
      <Avatar.Group
        maxCount={2}
        maxPopoverTrigger="click"
        size="small"
        maxStyle={{
          color: '#f56a00',
          backgroundColor: '#fde3cf',
          cursor: 'pointer',
        }}
      >
        {props.membersData?.map((members) => (
          // <Tooltip
          //   title={
          //     members[props.nestedObjProperty] !== null
          //       ? members[props.nestedObjProperty]?.name
          //       : "Unknown User"
          //   }
          //   placement="top"
          // >

          <Avatar
            className="cursor-pointer !bg-black"
            src={
              members[props.nestedObjProperty] !== null &&
              members[props.nestedObjProperty].image
                ? members[props.nestedObjProperty].image
                : props.dummyImage
            }
          >
            {getNameForImage(
              members[props.nestedObjProperty] !== null
                ? members[props.nestedObjProperty].name
                : 'Unknown User'
            )}
          </Avatar>
          // </Tooltip>
        ))}
      </Avatar.Group>
      {/* <ItemDetailModal
        data={props?.membersData} //Data
        isDeleteDisabled={false} //Pass true to hide delete icon
        addEnabled={true} //Pass false to hide select member
        addFunc={addFunc}
        onDelete={() => {}}
        openModal={true}
        onCancel={() => {
          console.log('modal close');
          setIsModalOpen(false);
          dispatch(handleItemDetailModal(false));
        }}
      /> */}
      <Modal
        open={isModalOpen}
        onOk={(e) => handleOk(e)}
        onCancel={(e) => handleCancel(e)}
        footer={false}
        closeIcon={<div />}
        className="ApproverModal"
        width={'360px'}
      >
        <CustomSelect
          style={{ marginBottom: '0px' }}
          data={firstTimeEmpData}
          selectedData={handleChange}
          canFetchNow={isFirstTimeDataLoaded}
          fetchData={fetchEmployees}
          placeholder={'Select Member'}
          isObject={true}
          loadDefaultData={false}
          optionComponent={(opt) => {
            return (
              <>
                <Avatar
                  name={opt?.name}
                  src={opt?.image || 'https://joeschmoe.io/api/v1/random'}
                  round={true}
                  width={'30px'}
                  height={'30px'}
                />
                {opt?.name}
              </>
            );
          }}
          dataVal={value}
          name="members"
          showSearch={true}
          // direction={Direction}
          rules={[
            {
              required: true,
              message: 'Please Select Member',
            },
          ]}
        />
        {props.membersData?.map((members) => {
          return (
            <div
              className="approverBox"
              onClick={() =>
                navigate(
                  `/user/${members.approver.id ||
                    members.user.id ||
                    members.user.id}`
                )
              }
            >
              <div className="imageBox">
                <Avatar
                  className="cursor-pointer !bg-black  imageAvatar"
                  src={
                    members[props.nestedObjProperty] !== null &&
                    members[props.nestedObjProperty].image
                      ? members[props.nestedObjProperty].image
                      : props.dummyImage
                  }
                >
                  {getNameForImage(
                    members[props.nestedObjProperty] !== null
                      ? members[props.nestedObjProperty].name
                      : 'Unknown User'
                  )}
                </Avatar>
              </div>
              <div className="contentBox">
                <p style={{ color: '#222222' }}>
                  {members.member && members.member.name}
                </p>
                <p style={{ color: 'rgb(117, 125, 134)' }}>
                  {members.member && members.member.email}
                </p>
              </div>
            </div>
          );
        })}
      </Modal>
    </div>
  );
}

export default AvatarGroup;
