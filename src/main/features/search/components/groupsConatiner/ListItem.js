import { Card } from "antd";
import React from "react";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle";
import PublicPrivateIcon from "../../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { ROUTES } from "../../../../../utils/routes";
import { useNavigate } from "react-router-dom";

function ListItem(data) {
  const navigate = useNavigate();
  const { Meta } = Card;
  const handleClickNavigation = (id) => {
    navigate(`${ROUTES.GROUP.DEFAULT}/${id}`);
  };
  return (
    // <div className="singleGroupItem">
    //   <img src="https://st.depositphotos.com/1062085/4008/v/600/depositphotos_40089703-stock-illustration-businessman-in-the-office-flat.jpg" />
    //   <p className="group-title">{data.data.name}</p>
    //   <p>{data.data.description}</p>
    // </div>
    <Card
      cover={
        <img
          alt="example"
          className="object-cover"
          src={
            data.image
              ? data.image
              : "https://st.depositphotos.com/1062085/4008/v/600/depositphotos_40089703-stock-illustration-businessman-in-the-office-flat.jpg"
          }
        />
      }
      className="Card2"
      hoverable
      onClick={() => {
        handleClickNavigation(data.data.id);
      }}
    >
      <Meta
        className="w-full"
        title={data.data.name}
        description={
          <div className="flex items-center gap-1 w-full">
            <PublicPrivateIcon id={data.privacyId} />{" "}
            <div className="flex items-center justify-between w-full">
              <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px]">
                {data.data.description}
              </span>
            </div>
          </div>
        }
      />
      <div className="flex justify-between items-center">
        {/* <div className="members">
            <Avatar
              isAvatarGroup={true}
              isTag={false}
              heading={"Members"}
              membersData={data.members}
            />
          </div> */}
        {/* <div className="flex">
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
          </div> */}
      </div>
    </Card>
  );
}

export default ListItem;
