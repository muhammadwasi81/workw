import React, { useContext } from "react";
import { Drawer, Tag } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import DefaultAttachment from "../../../../content/NewContent/warning/warningsDefaultAttachment.svg";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import { ItemContent, ItemHeader } from "../../../sharedComponents/Card/CardStyle";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction, complainDictionary, warningDictionary } = warningDictionaryList[userLanguage];

  const { warningDetail } = useSelector((state) => state.warningSlice);

  const { creator, description, image = DefaultAttachment, category, status, createDate, members = [], approvers, referenceNo } = warningDetail;

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{warningDictionary.warning}</h1>}
      width="768"
      placement={(Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")}
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer drawerSecondary">
      <div className="detailedCard ">
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={<SublineDesigWithTime designation={creator.designation ? creator.designation : ""} time={moment(createDate).fromNow()} />}
            />
          </div>
          <div className="right">
            <Tag className="IdTag">{referenceNo}</Tag>
            <StatusTag status={status}></StatusTag>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description w-full">
            <p>{description}</p>
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">{warningDictionary.category}</div>
            <div className="cardSection__body"><Tag className="IdTag">{category ? category : "Default Category"}</Tag></div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{warningDictionary.warningTo}</div>
            <div className="cardSection__body">
              {members &&
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Members"}
                  membersData={members}
                  text={"Members"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              }
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{warningDictionary.approvers}</div>
            <div className="cardSection__body">
              {approvers &&
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Approvers"}
                  membersData={approvers}
                  text={"Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              }
            </div>
          </div>
        
        </div>
      <RemarksApproval data={approvers} title="Approvals" />
    </div>
    </Drawer >
  );
}

export default DetailedView;
