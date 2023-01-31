import React, { useEffect } from "react";
import GroupDefaultImage from "../../../../content/NewContent/groups/GroupDefaultImage.svg";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
import Messenger from "../../../../../content/svg/topMenu/mobileMsgIcon.svg";
import { getAllGroupMemberAction } from "../../store/actions";
const { Meta } = Card;

function ListItem(props) {
  const navigate = useNavigate();
  const { name, description, image, members = [] } = props.item;
  const { memberData, success, deleteSucess } = useSelector(
    (state) => state.groupSlice
  );
  const userId = useSelector((state) => state.userSlice.user.id);

  useEffect(() => {
    dispatch(getAllGroupMemberAction(userId));
  });

  return (
    <>
      <Card
        className={"Card2"}
        cover={
          <img
            alt="example"
            className="object-cover"
            src={image || GroupDefaultImage}
          />
        }
        actions={[]}
        hoverable
        onClick={(e) => {
          navigate(`${ROUTES.GROUP.DEFAULT}/${props.id}`);
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
        <div className="members">
          {memberData && (
            <Avatar
              isAvatarGroup={true}
              isTag={false}
              heading={"Members"}
              membersData={memberData}
            />
          )}
        </div>
      </Card>
    </>
  );
}

export default ListItem;
