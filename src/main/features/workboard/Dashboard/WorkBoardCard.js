import React, { useContext } from "react";
import { Card, Popover, Skeleton } from "antd";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import WorkBoardImg from "../../../../content/png/workboard.png";
import PublicPrivateIcon from "../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { DOMAIN_PREFIX, ROUTES } from "../../../../utils/routes";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import menuIcon from '../../../../content/NewContent/Documents/3dots.svg';
import { useSelector, useDispatch } from "react-redux";
// import { getWorkboardById } from "../store/action";
import {
  handleBoardComposer,
  updaateWorkboardById,
  addMember,
} from "../store/slice";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";
import MemberModal from "./MemberModal";
import "./style.css";
import { useState } from "react";
import QuickOptions from "../quickOptions";

function WorkBoardCard({ data }) {
  const { Meta } = Card;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMember, setIsMember] = useState(false);
  const [open, setOpen] = useState(false);
  const userId = useSelector((state) => state.userSlice.user.id);
  const loading = useSelector((state) => state.trelloSlice.loader);
  const {memberModal} = useSelector((state) => state.trelloSlice);
 
  const [visible, setVisible] = useState(false);
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

  const memberHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(true);
    setOpen(false);
    dispatch(addMember({ status: true }));
  };

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
  };

  const handleUpdate = () => {
    dispatch(updaateWorkboardById(data.id));
    dispatch(
      handleBoardComposer({
        isEdit: true,
        isVisible: true,
          })
      );
    // handleClose();
  }
  const handleOpenMembers = () => {
    dispatch(addMember({ status: true }));
    setVisible(true);
    // handleClose();
  }

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
          console.log("dsdsds");
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
            {/* <div className="addMemberBtn" onClick={(e) => memberHandler(e)}>
              +
            </div> */}
          </div>

          {userId === data.createBy && (
             <div className="docsPopover"  onClick={(e) => {e.preventDefault(); e.stopPropagation();}} >
             <Popover
                 content={
                      <div className="flex flex-col">
                        <div className="flex gap-2 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
                          onClick={handleUpdate}>
                          <span>Update</span>
                        </div>
                        <div className="flex gap-3 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
                          onClick={(e) => memberHandler(e)}>
                          <span>Members</span>
                        </div>
                      </div>
                 }
                 title={null}
                 trigger="click"
                 placement="rightTop"
                 open={open}
                
                 onOpenChange={handleOpenChange}
                 overlayClassName="docsPopover"
             >
                 <div className='menuIcon' >
                     <img src={menuIcon}
                     />
                 </div>
             </Popover>
         </div>
          )}
        </div>
      </Card>
      {visible && <MemberModal />}
    </>
  );
}

export default WorkBoardCard;
