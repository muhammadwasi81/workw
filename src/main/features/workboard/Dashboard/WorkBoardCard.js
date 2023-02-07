import React, { useContext } from "react";
import { Card, Popover, Skeleton } from "antd";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import WorkBoardImg from "../../../../content/png/workboard.png";
import PublicPrivateIcon from "../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { DOMAIN_PREFIX, ROUTES } from "../../../../utils/routes";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getWorkboardById } from "../store/action";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";
import "./style.css";
import QuickOptions from "../quickOptions";

function WorkBoardCard({ data }) {
  const { Meta } = Card;
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userSlice.user.id);
  const loading = useSelector((state) => state.trelloSlice.loader);

  const path = useLocation().pathname;

  let workboardPath = ROUTES.WORKBOARD.BOARD;
  if (path.includes("groups") || path.includes("projects")) {
    workboardPath = DOMAIN_PREFIX + path + "/workboard/board/";
  }
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, placeholder } = WorkBoardDictionaryList;

  const menuHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <>
      <Card
        cover={
          !loading ? (
            <img
              alt="example"
              className="object-cover"
              src={data.image ? data.image : WorkBoardImg}
            />
          ) : (
            <Skeleton.Image className="ant-skeleton-active" />
          )
        }
        className="Card2"
        hoverable
        onClick={(e) => {
          navigate(`${workboardPath.trim()}${data.id}`);
        }}
        loading={loading}
      >
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
              image={"https://joeschmoe.io/api/v1/random"}
            />
          </div>

          {userId === data.createBy && (
            <div className="flex justify-end">
              <QuickOptions data={data} onClick={(e) => menuHandler(e)} />
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export default WorkBoardCard;
