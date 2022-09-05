import { Image, Tag } from "antd";
import React, { useContext } from "react";
//import { rewardDictionaryList } from "../localization/index";
//import { loanDictionaryList } from "./localization/index";
//import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../sharedComponents/Tag/StatusTag";
import RemarksApproval from "../../sharedComponents/AppComponents/Approvals/view";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../sharedComponents/Card/CardStyle";
import Avatar from "../../sharedComponents/Avatar/avatar";

function ListItem(props) {
  //const { userLanguage } = useContext(LanguageChangeContext);
  //const { Direction, rewardDictionary } = loanDictionaryList[userLanguage];
  console.log("props for list item", props.item);
  const { designation, name } = props.item.user;
  const { description, referenceNo, approvers } = props.item;

  return (
    <>
      <SingleItem onClick={() => props.getLoanById(props.id)}>
        {/* <div
          className="new"
          style={{ cursor: "pointer" }}
          id={props.id}
          onClick={() => {
            props.getLoanById(props.id);
          }}
        ></div> */}
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={""}
              name={name}
              Subline={
                <SublineDesigWithTime
                  designation={designation}
                  time={moment().format("DD/MM/YYYY")} //date to be set
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">{referenceNo}</Tag>
            <StatusTag status={1}></StatusTag>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          {/* <div className="description w-96">
            <p>
              {
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and "
              }
            </p>
          </div> */}
          <div className="description w-full pt-3 pb-5 h-[100px]">
            <p> {description ? description : "No description"} </p>
          </div>
        </ItemContent>
        {/* <div className="flex justify-between">
          <div className="innerCard w-full">
            <div className="innerCard__header">
              <div className="left block">
                Deduction Per Month :
                <div className="" style={{ color: "#757D86" }}>
                  {"category"}
                </div>
              </div>
              <div className="right">
                <div className="left block">
                  Deadline :
                  <div className="" style={{ color: "#757D86" }}>
                    {"Sun, "}
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="left">
                  Name :
                  <span className="" style={{ color: "#757D86" }}>
                    {"name"}
                  </span>
                </div>
              </div>
            </div>
            <div className="innerCard__footer">
              <div className="left">
                Reason :
                <span className="" style={{ color: "#757D86" }}>
                  {"reason"}
                </span>
              </div>
            </div>
          </div>
        </div> */}
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">Deduction per month</div>
            <div className="cardSection__body">dummy detection</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Deadline</div>
            <div className="cardSection__body">
              {/* {moment(effectiveDate).format("Do MMM YY")} */}
              {Date.now()}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Amount</div>
            <div className="cardSection__body">122222</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
            <div className="cardSection__body">
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
          </div>

          {/* <RemarksApproval data={approvers && approvers} title="Approvers" /> */}
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
