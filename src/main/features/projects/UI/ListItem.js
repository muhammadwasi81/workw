import React, { useState } from "react";
import ProjectDefaultImage from "../../../../content/png/project_cover_img.png";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { Card, Popover,Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
import menuIcon from "../../../../content/NewContent/Documents/3dots.svg";
import MemberModal from "./MemberModal";
import { updateProjectById, handleComposer, addMember } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";

import "./style.css"
const { Meta } = Card;

function ListItem(props) {
  const dispatch = useDispatch();
  const { name, description, image, members = [], id } = props.item;
  console.log(id,"iddd");

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  console.log(open,"opennn");
  const [visible, setVisible] = useState(false);

  const handleUpdate = () => {
    dispatch(updateProjectById(id));
      dispatch( handleComposer ({ isOpen: true, isEdit: true }))
  };
  const memberHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(true);
    // setOpen(true);
    dispatch(addMember({ status: true }));
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const hide = () => {
    setOpen(false);
  };
  
  
  return (
    <>
      <Card
        className={"Card2"}
        cover={
          <img
            alt="example"
            className="object-cover"
            src={image || ProjectDefaultImage}
          />
        }
        hoverable
        onClick={(e) => {
          navigate(`${ROUTES.PROJECT.DEFAULT}/${props.id} `);
        }}
      >
        <Meta
          title={name}
          description={
            <p className="overflow-hidden whitespace-nowrap text-ellipsis">
              {description}
            </p>
          }
          className="overflow-hidden whitespace-nowrap text-ellipsis"
        />
        <div className="flex justify-between items-center">
          <div className="members">
            <Avatar
              isAvatarGroup={true}
              isTag={false}
              heading={"Members"}
              membersData={members}
            />
          </div>
          <div
            className="docsPopover"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Popover
              content={
                <div className="flex flex-col">
                  <div
                    className="flex gap-2 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
                    onClick={handleUpdate}
                  >
                    <span>Update</span>
                  </div>
                  <div
                    className="flex gap-3 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
                    onClick={(e) => memberHandler(e)}
                  >
                    <span>Members</span>
                  </div>
                </div>
              }
              title={null}
              trigger="click"
              placement="rightTop"
              open={open}
              handleClose={hide}
              onOpenChange={handleOpenChange}
              overlayClassName="docsPopover"
            >
              <div className="menuIcon">
                <img src={menuIcon} />
              </div>
            </Popover>

          </div>
        </div>
      </Card>
      {visible && <MemberModal />}
      
    </>
  );
}

export default ListItem;
