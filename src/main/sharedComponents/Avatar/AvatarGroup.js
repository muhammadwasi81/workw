import React, { useState } from "react";
import { Avatar, Tooltip, Modal } from "antd";
import { getNameForImage } from "../../../utils/base";
import "./style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemDetailModal from "../ItemDetails";
import { handleItemDetailModal } from "../../../utils/Shared/store/slice";
// import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
// import PropTypes from "prop-types";

function AvatarGroup(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsModalOpen(!isModalOpen);
  //   dispatch(handleItemDetailModal(true));
  // };

  return (
    <div className="inline-flex">
      <Avatar.Group
        maxCount={2}
        maxPopoverTrigger="click"
        size="small"
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
          cursor: "pointer",
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
                : "Unknown User"
            )}
          </Avatar>
          // </Tooltip>
        ))}
      </Avatar.Group>
      {/* {isModalOpen && (
        <ItemDetailModal
          data={props?.membersData} //Data of members will pass here in array
          isDeleteDisabled={true} //Pass true to hide delete icon
          addEnabled={false} //Pass false to hide select member
          addFunc={false} // define and pass addMember action of particular members
          onDelete={false} // define and pass onDeletemember actions of particular members
          isSearch={false} //Pass true if you want to search the list
          openModal={true} // pass true if you want to open member details in modal other wise it display in listing
        />
      )} */}
    </div>
  );
}

export default AvatarGroup;
