import React, { useContext } from "react";
import { Drawer, Tag, Image } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { loanDictionaryList } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
//import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../sharedComponents/Tag/StatusTag";
import DefaultAttachment from "../../../content/NewContent/complain/DefaultAttachment.svg";
import RemarksApproval from "../../sharedComponents/AppComponents/Approvals/view";
import Avatar from "../../sharedComponents/Avatar/avatar";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../sharedComponents/Card/CardStyle";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, complainDictionary } = loanDictionaryList[userLanguage];

  const { loanDetail } = useSelector((state) => state.loanSlice);
  const {
    referenceNo,
    user,
    status,
    description,
    deductionPerMonth,
    amount,
    deadline,
    approvers,
  } = loanDetail || {};
  // const {
  //   creator,
  //   description,
  //   image = DefaultAttachment,
  //   category,
  //   createDate,
  //   status,
  //   members = [],
  //   approvers,
  // } = complainDetail;

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          {/* {complainDictionary.complain} */}
          {"Loan"}
        </h1>
      }
      width="768"
      placement={
        (Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")
      }
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer drawerSecondary"
      style={{
        cursor: "pointer",
      }}
    >
      <div className="detailedCard ">
        <ItemHeader>
          <div className={"item-header"}>
            <div className="left">
              <UserInfo
                avatarSrc={""}
                name={"Test User"}
                Subline={
                  <SublineDesigWithTime
                  //  designation={creator.designation ? creator.designation : ""}
                  //  time={moment(createDate).fromNow()}
                  />
                }
              />
            </div>
            <div className="right">
              <Tag className="IdTag">{referenceNo}</Tag>
              <StatusTag status={status}></StatusTag>
            </div>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description w-full">
            <p>{description}</p>
          </div>
          {/* <div className="attachmentBox">
          <Image preview={false} width={60} src={image === "" ? DefaultAttachment : image} />
        </div> */}
        </ItemContent>
        <div className="ListItemInner">
          <div className="ItemDetails">
            <div className="innerDiv">
              <span className="text-black font-extrabold smallHeading">
                {"Deduction per month"}
              </span>
              <Tag className="IdTag !bg-transparent !text-left">
                {deductionPerMonth}
              </Tag>
            </div>
            <div className="innerDiv">
              <span className="text-black font-extrabold smallHeading">
                {"Deadline"}
              </span>
              {/* {props.members} */}
              {/* <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"Members"}
                membersData={members}
                text={"Danish"}
                image={"https://joeschmoe.io/api/v1/random"}
              /> */}
              {
                <Tag className="IdTag !bg-transparent !text-left">
                  {moment(deadline).format("ddd,MMM DD,YYYY")}
                </Tag>
              }
            </div>
            <div className="innerDiv">
              <span className="text-black font-extrabold smallHeading">
                {amount}
              </span>
              {/* <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"Approvers"}
                membersData={approvers}
                text={"Danish"}
                image={"https://joeschmoe.io/api/v1/random"}
              /> */}
              <Tag className="IdTag !bg-transparent">{"200,000"}</Tag>
            </div>
          </div>
        </div>
        {approvers && (
          <Avatar
            isAvatarGroup={true}
            isTag={false}
            heading={"approvers"}
            membersData={approvers ? approvers : []}
            text={"Approvers"}
            image={"https://joeschmoe.io/api/v1/random"}
          />
        )}
      </div>
    </Drawer>
  );
}

export default DetailedView;
