import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import customApprovalIcon from "../../../../content/svg/menu/newNavBarIcon/Custom Approval.svg";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import { ItemContent, ItemHeader } from "../../../sharedComponents/Card/CardStyle";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[userLanguage];

  const { customApprovalDetail } = useSelector((state) => state.customApprovalSlice);

  const { creator, description, image = customApprovalIcon, approvers = [], status, referenceNo, category, value, createDate } = customApprovalDetail;

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{"Custom Approval"}</h1>}
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
          <div className="attachmentBox">
            <Image preview={false} width={50} src={image === "" ? customApprovalIcon : image} />
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Category"}</div>
            <div className="cardSection__body">{category}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Amount"}</div>
            <div className="cardSection__body">{value}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{customApprovalDictionary.approvers}</div>
            <div className="cardSection__body" >
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
      </div>
    </Drawer>
  );
}

export default DetailedView;
