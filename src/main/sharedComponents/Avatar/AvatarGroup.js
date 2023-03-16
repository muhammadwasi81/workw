import React, { useState } from 'react';
import { Avatar, Tooltip, Modal } from 'antd';
import { getNameForImage } from '../../../utils/base';
import './style.css';
import { useNavigate } from 'react-router-dom';
import ItemDetailModal from '../ItemDetails';
// import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
// import PropTypes from "prop-types";

function AvatarGroup(props) {
  // console.log(props, "propssse");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
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
        data={props?.membersData} //Data of members will pass here in array
        isDeleteDisabled={false} //Pass true to hide delete icon
        addEnabled={false} //Pass false to hide select member
        addFunc={false} // define and pass addMember action of particular members
        onDelete={false} // define and pass onDeletemember actions of particular members
        isSearch={false} //Pass true if you want to search the list
        openModal={true} // pass true if you want to open member details in modal other wise it display in listing
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
