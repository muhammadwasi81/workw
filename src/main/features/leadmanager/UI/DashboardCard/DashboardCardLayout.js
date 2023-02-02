import React, { useState, useEffect } from "react";
import { Card, Skeleton } from "antd";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import PublicPrivateIcon from "../../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import QuickOptions from "../../quickOptions/index";
import { getAllLeadManagerMember } from "../../store/actions";

function DashboardCardLayout({
  data = {},
  defaultImg,
  loading = false,
  handleUpdate = () => {},
  getDetailById = () => {},
  onClick = () => {},
  dictionary = {},
}) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const userId = useSelector((state) => state.userSlice.user.id);
  const { Meta } = Card;
  const { memberData } = useSelector((state) => state.leadMangerSlice);
  console.log(memberData.member, "memberData in useselector");

  useEffect(() => {
    dispatch(getAllLeadManagerMember(userId));
  }, []);

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
          {memberData && (
            <div className="members">
              <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"Members"}
                membersData={memberData || []}
                text={"Danish"}
                image={"https://joeschmoe.io/api/v1/random"}
              />
            </div>
          )}

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
          <QuickOptions data={data} onClick={(e) => menuHandler(e)} />
        </div>
      </Card>
    </>
  );
}

export default DashboardCardLayout;