import { memo } from "react";
import { Card } from "antd";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
import PublicPrivateIcon from "../../../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { useDispatch } from "react-redux";
import QuickOptions from "../../../quickOptions/index";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { handleFavoriteMark } from "../../../store/slice";
import { addGroupFavoriteMarkAction } from "../../../store/actions";
import PropTypes from "prop-types";
import { CommentOutlined } from "@ant-design/icons";
import NotificationBadge from "../../../../../sharedComponents/Badge/NotificationBadge";
import "../style.css";
function DashboardCardLayout({
  data = {},
  defaultImg,
  loading = false,
  handleUpdate = () => {},
  getDetailById = () => {},
  onClick = () => {},
  dictionary = {},
  chatIcon,
}) {
  // const { groupMembers } = useSelector((state) => state.groupSlice);
  // console.log(groupMembers, "group members");
  // console.log(data, "Dataaa");
  const dispatch = useDispatch();
  const { Meta } = Card;
  const menuHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(handleFavoriteMark({ id: data.id, isPinned: !data.isPinnedPost }));
    dispatch(
      addGroupFavoriteMarkAction({ id: data.id, isPinned: !data.isPinnedPost })
    );
  };

  return (
    <>
      <Card
        cover={
          <img
            alt="example"
            className="object-cover"
            src={data.image ? data.image : defaultImg}
          />
        }
        className="Card2 relative"
        hoverable
        onClick={onClick}
      >
        <NotificationBadge
          notificationCount={data.notificationCount}
          customClass="absolute top-0 right-0"
        />
        <Meta
          className="w-full"
          title={data.name}
          description={
            <div className="flex items-center gap-1 w-full">
              <PublicPrivateIcon id={data.privacyId} />{" "}
              <div className="flex items-center justify-between w-full">
                <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px]">
                  {data.description}
                </span>
              </div>
            </div>
          }
        />
        <div className="flex justify-between items-center">
          <div className="members">
            <Avatar
              isAvatarGroup={true}
              isTag={false}
              heading={"Members"}
              membersData={data.members}
            />
          </div>
          <div className="flex">
            <div className="relative bottom-1 right-1 mr-1 mt-1">
              <CommentOutlined className="!text-[18px] cursor-pointer !text-[#707070]" />
            </div>
            <div
              onClick={(e) => handleFavorite(e)}
              className="relative bottom-1 mr-1 mt-1"
            >
              {data.isPinnedPost ? (
                <StarFilled className="!text-[18px] !text-yellow-400 cursor-pointer" />
              ) : (
                <StarOutlined className="!text-[18px] cursor-pointer !text-[#707070]" />
              )}
            </div>
            <QuickOptions data={data} onClick={(e) => menuHandler(e)} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default memo(DashboardCardLayout);
DashboardCardLayout.propTypes = {
  data: PropTypes.object,
  defaultImg: PropTypes.string,
  loading: PropTypes.bool,
  handleUpdate: PropTypes.func,
  getDetailById: PropTypes.func,
  onClick: PropTypes.func,
  dictionary: PropTypes.object,
  chatIcon: PropTypes.string,
};
