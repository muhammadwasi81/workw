import { useEffect } from "react";
import ProjectDefaultImage from "../../../../content/png/project_cover_img.png";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
import {
  updateProjectById,
  handleComposer,
  addMember,
  handleFavoriteProjects,
} from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { addProjectFavoriteAction } from "./../store/actions";
import "./style.css";
import QuickOptions from "../quickOptions";
import NotificationBadge from "../../../sharedComponents/Badge/NotificationBadge";
import { getAllNotification } from "./../../../../utils/Shared/store/actions";
const { Meta } = Card;

const ListItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notificationCounts } = useSelector((state) => state.sharedSlice);
  // later on we have a property in get all project for inner notification
  const {
    name,
    description,
    image,
    members = [],
    id,
    isPinnedPost,
  } = props.item;

  useEffect(() => {
    console.log("project count", notificationCounts);
    dispatch(getAllNotification());
  }, [notificationCounts]);

  const handlePinnedPost = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addProjectFavoriteAction({ id: id, isPinned: !isPinnedPost }));
    dispatch(handleFavoriteProjects({ id: id, isPinned: !isPinnedPost }));
  };
  const menuHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <Card
        className={`${`Card2`} ${`relative`}`}
        cover={
          <img
            alt="example"
            className="object-cover"
            src={image || ProjectDefaultImage}
            loading="lazy"
          />
        }
        hoverable
        onClick={() => {
          navigate(`${ROUTES.PROJECT.DEFAULT}/${props.id} `);
        }}
      >
        <NotificationBadge
          notificationCount={notificationCounts.projects}
          customClass="absolute top-0 right-0"
        />
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
            className="pinned-post ml-auto mr-2"
            onClick={(e) => handlePinnedPost(e)}
          >
            {isPinnedPost ? (
              <StarFilled className="!text-[18px] !text-yellow-400 cursor-pointer" />
            ) : (
              <StarOutlined className="!text-[18px] cursor-pointer !text-[#707070]" />
            )}
          </div>
          <div
            className="docsPopover"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <QuickOptions data={props.item} onClick={(e) => menuHandler(e)} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default ListItem;
