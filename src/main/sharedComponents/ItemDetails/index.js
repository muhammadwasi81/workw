import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Input, List } from 'antd';
import { useSelector } from 'react-redux';
import CustomSelect from '../AntdCustomSelects/SharedSelects/MemberSelect';
import ApproverListItem from '../AppComponents/Approvals/components/approverList';
import { DeleteFilled } from '@ant-design/icons';
// import {
//   getAllGroupMemberAction,
//   addGroupMemberAction,
// } from "../../store/actions";
// import { addMember, deleteGroupMember } from "../../store/slice";
import { handleItemDetailModal } from '../../../utils/Shared/store/slice';
import Avatar from '../Avatar/avatarOLD';
import { getAllEmployees } from '../../../utils/Shared/store/actions';
// import { deleteGroupMemberAction } from "../../store/actions";
import { useParams } from 'react-router-dom';
import ListItem from './itemListing';

const { Search } = Input;
function ItemDetailModal({
  openModal = false,
  isSearch = false,
  data,
  isDeleteDisabled = false,
  addEnabled = false,
  addFunc = () => {},
  onDelete = () => {},
  children,
}) {
  const dispatch = useDispatch();
  // const modalRequest = useSelector((state) => state.groupSlice.addMemberModal);
  // const {}
  const { employees, itemDetailModal } = useSelector(
    (state) => state.sharedSlice
  );
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const params = useParams();
  const [myData, setMyData] = useState([]);
  const { groupDetailid } = params;
  // let ModalOpen = modalRequest.status;

  useEffect(() => {
    fetchEmployees('', 0);
    setMyData(data);
  }, []);

  useEffect(() => {
    setMyData(data);
  }, [data]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const handleClose = () => {
    dispatch(handleItemDetailModal(false));
    // setMyData([]);
  };

  // useEffect(() => {
  //   return () => {
  //     console.log("unmounting");
  //     setMyData([]);
  //   };
  // }, []);

  // const handleChange = (myid) => {
  //   let memberId = myid.toString();
  //   const members = {
  //     id: data.id,
  //     memberId: memberId,
  //   };
  //   dispatch(addGroupMemberAction(members));
  // };

  // useEffect(() => {
  //   if (data.length > 0) {
  //     setMyData(data);
  //     console.log("data change", data);
  //   }
  // }, [data]);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const onSearch = (e) => {
    const filteredData = data.filter((item) =>
      item.member?.name.includes(e.target.value)
    );
    setMyData(filteredData);
  };

  // const handleDeleteMember = (myid) => {
  //   const memberId = myid.toString();
  //   const delmembers = {
  //     id: data.id || groupDetailid,
  //     memberId: memberId,
  //   };

  //   dispatch(deleteGroupMemberAction(delmembers));

  const DeleteInItemDetail = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };
  // };
  if (openModal) {
    return (
      <Modal
        open={itemDetailModal}
        onOk={(e) => {}}
        onCancel={handleClose}
        footer={false}
        closeIcon={<div />}
        className="ApproverModal"
        width={'360px'}
        destroyOnClose={true}
        // afterClose={afterClose}
        forceRender={true}
      >
        {addEnabled && (
          <CustomSelect
            style={{ marginBottom: '0px' }}
            data={firstTimeEmpData}
            selectedData={addFunc}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={'Select Member'}
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
            name="members"
            showSearch={true}
            resetField={true}
            // direction={Direction}
            rules={[
              {
                required: true,
                message: 'Please Select Member',
              },
            ]}
          />
        )}

        {isSearch && (
          <Input
            placeholder="input search text"
            allowClear
            onChange={onSearch}
            // style={{
            //   width: 200,
            // }}
            size={'medium'}
            style={{ marginBottom: '1rem' }}
          />
        )}

        <ListItem
          ListData={myData}
          deleteDisabled={isDeleteDisabled}
          onDelete={onDelete}
        />

        {/* <ApproverListItem
        className="AddMemberModal"
        data={data?.members}
        handleDelete={handleDeleteMember}
      /> */}
        {children}
      </Modal>
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      className={'max-h-[300px] overflow-y-auto'}
      renderItem={(item) => {
        return (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  name={item.member?.name}
                  src={item.member?.image}
                  round={true}
                  width={'30px'}
                  height={'30px'}
                  isZoom={true}
                />
              }
              title={
                <span className=" text-black font-bold">
                  {item?.member?.name}
                </span>
              }
              description={
                <span className="text-gray-500 text-xs ">
                  {item.member?.designation
                    ? item.member?.designation
                    : 'No designation'}
                </span>
              }
            />
            {!isDeleteDisabled && (
              <DeleteFilled
                className=""
                style={{ color: '#000000' }}
                onClick={(e) => DeleteInItemDetail(e, item.member.id)}
              />
            )}
          </List.Item>
        );
      }}
    />
  );
}

export default ItemDetailModal;
