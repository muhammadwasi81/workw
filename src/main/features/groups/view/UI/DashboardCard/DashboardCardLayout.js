import React, { useState } from "react";
import { Card, Skeleton } from "antd";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
import PublicPrivateIcon from "../../../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { useSelector, useDispatch } from "react-redux";
// import { addMember } from "../../store/slice";
// import MemberModal from "../../view/Modal/MemberModal";
// import "./style.css";
import QuickOptions from "../../../quickOptions/index";

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
  const disptach = useDispatch();
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { Meta } = Card;
  const userId = useSelector((state) => state.userSlice.user.id);
  // console.log("dict", dictionary);
  //   console.log(dictionary, "dictionaryyyyy");

  const menuHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <>
      <Card
        // cover={
        // 	!loading ? (
        // 		<img
        // 			alt="example"
        // 			className="object-cover"
        // 			src={data.image ? data.image : defaultImg}
        // 		/>
        // 	) : (
        // 		<Skeleton.Image className="ant-skeleton-active" />
        // 	)
        // }
        cover={
          <img
            alt="example"
            className="object-cover"
            src={data.image ? data.image : defaultImg}
          />
        }
        className="Card2"
        hoverable
        onClick={onClick}
        // loading={loading}
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
              membersData={data.members ? data.members : []}
            />
          </div>
          {/* {userId === data.createBy && (
            <div
              className="flex items-center gap-1 p-1 rounded-sm bg-neutral-100 !text-primary-color hover:bg-neutral-200 transition"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                getDetailById(data.id);
                handleUpdate();
              }}
            >
              {dictionary?.labels?.update}
            </div>
          )} */}
          <div className="flex justify-end">
            <div className={`halfHeader `}>
              <img src={chatIcon} alt="" width={20} />
            </div>{" "}
            <QuickOptions data={data} onClick={(e) => menuHandler(e)} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default DashboardCardLayout;
