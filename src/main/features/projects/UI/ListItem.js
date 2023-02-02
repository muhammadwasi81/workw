import React, { useState } from "react";
import ProjectDefaultImage from "../../../../content/png/project_cover_img.png";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { Card, Popover, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
import menuIcon from "../../../../content/NewContent/Documents/3dots.svg";
import MemberModal from "./MemberModal";
import { updateProjectById, handleComposer, addMember } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import QuickOptions from "../quickOptions";
const { Meta } = Card;

function ListItem(props) {
  const dispatch = useDispatch();
  const { name, description, image, members = [], id } = props.item;
  const navigate = useNavigate();

  const menuHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

          <div className="flex justify-end justify-between">
            <QuickOptions data={props.item} onClick={(e) => menuHandler(e)} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default ListItem;
