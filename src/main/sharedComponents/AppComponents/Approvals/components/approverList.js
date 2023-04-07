import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { getNameForImage } from "../../../../../utils/base";
import { DeleteFilled } from "@ant-design/icons";
import "./style.css";

function ApproverListItem({ data, handleDelete }) {
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
                  <p className="memberName">
                    {members.member && members.member.name}
                  </p>
                  <p className="member-email">
                    {members.member && members.member.email}
                  </p>
                </div>
                <DeleteFilled
                  className="deleteIcon"
                  onClick={() => handleDelete(members.member.id)}
                />
              </div>
            </div>
          );
        })}
    </>
  );
}

export default ApproverListItem;
