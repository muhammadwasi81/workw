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
import { PieChartOutlined } from "@ant-design/icons";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[userLanguage];

  const { customApprovalDetail } = useSelector((state) => state.customApprovalSlice);

  const { creator, description, image = customApprovalIcon, category, status, createDate, referenceNo, approvers } = customApprovalDetail;

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
        <div className="flex justify-between gap-4">
          <div className="innerCard w-full">
            <div className="innerCard__header">
              <div className="left">
                <span className="primaryTag">
                  <PieChartOutlined />
                  {"Subject"}
                </span>
                <span className="secondaryTag">{"In Process"}</span>
              </div>
              <div className="right">
                <p>Rs. 10000</p>
              </div>
            </div>
            <div className="innerCard__footer">
              <div className="left">
                <span>{"Date"}</span>
                <span> Thu,Oct 14 ,2021</span>
              </div>
              <div className="right">
                <span>{"Header"}:</span>
                <span> CEO Office</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default DetailedView;
