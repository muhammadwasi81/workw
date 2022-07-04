import React, { useContext } from "react";
import { Drawer, Tag, Image } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import Approval from "../../../sharedComponents/AppComponents/Approvals/view";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, complainDictionary } = complainDictionaryList[userLanguage];

  const { rewardDetail } = useSelector((state) => state.rewardSlice);

  const {
    creator,
    description,
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    category,
    createDate,
    status,
    members = [],
    approvers,
  } = rewardDetail;

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{complainDictionary.complain}</h1>}
      width="768"
      placement={(Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")}
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer drawerSecondary">
      <div className="detailedCard ">
        <div className="item-header">
          <div className="left">
            <UserInfo
              avatarSrc="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
              name={creator.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator.designation ? creator.designation : "Default Designation"}
                  time={moment(createDate).format("DD/MM/YYYY")}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">TRA-000085</Tag>
            <StatusTag status={status}></StatusTag>
          </div>
        </div>
        <div className="item-content">
          <p>{description}</p>
        </div>
        <div className="ListItemInner">
          <div className="ItemDetails">
            <div className="innerDiv">
              <span className="text-black font-extrabold smallHeading">{complainDictionary.category}</span>
              <p>
                <Tag className="IdTag">{category}</Tag>
              </p>
            </div>
            <div className="innerDiv">
              <span className="text-black font-extrabold smallHeading">{complainDictionary.complainOf}</span>
              <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"Members"}
                membersData={members}
                text={"Danish"}
                image={"https://joeschmoe.io/api/v1/random"}
              />
            </div>
          </div>
          <div className="attachmentBox">
            <Image preview={false} width={100} src={image === "" ? RewardDefaultIcon : image} />
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default DetailedView;
