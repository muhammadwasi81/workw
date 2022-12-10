import React, { useContext } from "react";
import { Card, Skeleton } from "antd";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import WorkBoardImg from "../../../../content/png/workboard.png";
import PublicPrivateIcon from "../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { DOMAIN_PREFIX, ROUTES } from "../../../../utils/routes";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { getWorkboardById } from "../store/action";
import { useDispatch } from "react-redux";
import { handleBoardComposer, updaateWorkboardById } from "../store/slice";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";
function WorkBoardCard({ data }) {
  const { Meta } = Card;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userSlice.user.id);
  const loading = useSelector((state) => state.trelloSlice.loader);
  const path = useLocation().pathname;
  // const params = useParams();
  // console.log("location: ", path);
  // console.log("params: ", params);
  let workboardPath = ROUTES.WORKBOARD.BOARD;
  if (path.includes("groups") || path.includes("projects")) {
    workboardPath = DOMAIN_PREFIX + path + "/workboard/board/";
    // console.log("workboardPath: ", workboardPath);
  }
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, placeholder } = WorkBoardDictionaryList;
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
          <Avatar
            isAvatarGroup={true}
            isTag={false}
            heading={"Members"}
            membersData={data.members}
            image={"https://joeschmoe.io/api/v1/random"}
          />
          {userId === data.createBy && (
            <div
              className="flex items-center gap-1 p-1 rounded-sm bg-neutral-100 !text-primary-color hover:bg-neutral-200 transition"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(updaateWorkboardById(data.id));
                dispatch(
                  handleBoardComposer({
                    isEdit: true,
                    isVisible: true,
                  })
                );
              }}
            >
              {labels.Update}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export default WorkBoardCard;
