import { Avatar } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getNameForImage } from "../../../../../utils/base";
import { DeleteFilled } from "@ant-design/icons";

import "./style.css";

function ApproverListItem({ data, handleDelete }) {
  console.log(data, "dataa approval");
  const navigate = useNavigate();
  return (
    <>
      {data &&
        data.map((members) => {
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
                  // src={members.member.image ? members.member.image : ""}
                >
                  {members.member &&
                    getNameForImage(members.member.name && members.member.name)}
                </Avatar>
              </div>

              <div className="flex flex-auto justify-between">
                <div className="contentBox">
                  <p style={{ color: "#222222" }}>
                    {members.member && members.member.name}
                  </p>
                  <p style={{ color: "rgb(117, 125, 134)" }}>
                    {members.member && members.member.email}
                  </p>
                </div>
                <div className="">
                  <DeleteFilled
                    style={{ color: "#000000" }}
                    onClick={() => handleDelete(members.member.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default ApproverListItem;
