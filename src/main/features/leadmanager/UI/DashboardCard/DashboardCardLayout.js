import React, { useState, useEffect } from "react";
import { Card, Skeleton } from "antd";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import PublicPrivateIcon from "../../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import QuickOptions from "../../quickOptions/index";
import { getAllLeadManagerMember } from "../../store/actions";
import ItemDetailModal from "../../../../sharedComponents/ItemDetails";

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
  const { Meta } = Card;

  const menuHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleModalOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setVisible(true);
  };

  return (
    <>
      {
        <ItemDetailModal
          data={data.members} //Data of members will pass here in array
          isDeleteDisabled={true} //Pass true to hide delete icon
          addEnabled={false} //Pass false to hide select member
          addFunc={false} // define and pass addMember action of particular members
          onDelete={false} // define and pass onDeletemember actions of particular members
          isSearch={false} //Pass true if you want to search the list
          openModal={true} // pass true if you want to open member details in modal other wise it display in listing
          visible={visible}
          setVisible={(da) => setVisible(da)}
        />
      }
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
            src={data.image ? data.image : defaultImg}
            alt="example"
            className="object-cover"
          />
        }
        className="Card2"
        style={{ padding: "7px" }}
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
          <div className="members" onClick={(e) => handleModalOpen(e)}>
            <Avatar
              isAvatarGroup={true}
              isTag={false}
              heading={"Members"}
              membersData={data.members}
              text={"Danish"}
              image={"https://joeschmoe.io/api/v1/random"}
            />
          </div>

          <QuickOptions data={data} onClick={(e) => menuHandler(e)} />
        </div>
      </Card>
    </>
  );
}

export default DashboardCardLayout;
