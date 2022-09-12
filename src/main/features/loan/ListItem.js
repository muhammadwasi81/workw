import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
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
import { GetLoanById } from "./store/actions";
import Avatar from "../../sharedComponents/Avatar/avatar";
import { useEffect } from "react";

function ListItem(props) {
  const { onListItem = () => {} } = props;
  //const { userLanguage } = useContext(LanguageChangeContext);
  //const { Direction, rewardDictionary } = loanDictionaryList[userLanguage];
  // console.log("props for list item", props.item);
  const dispatch = useDispatch();
  // const { designation, name, image } = props.item.user || [];
  const {
    description,
    referenceNo,
    approvers,
    createDate,
    userId,
    user,
    deductionPerMonth,
    deadline,
    status,
    amount,
  } = props.item || null;
  console.log(props);
  return (
    <>
      {/* <SingleItem onClick={() => props.onclick(userId)}> */}

      <SingleItem
        onClick={() => {
          onListItem(props.item.id);
        }}
      >
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
              avatarSrc={
                user.image ? user.image : "https://joeschmoe.io/api/v1/random"
              }
              // avatarSrc="https://joeschmoe.io/api/v1/random"
              name={user.name ? user.name : "Test User"}
              // name="Test user"
              Subline={
                <SublineDesigWithTime
                  designation={
                    user.designation ? user.designation : "Software Engineer"
                  }
                  // designation="software Engineer"
                  time={moment(createDate).fromNow()} //date to be set
                  // time={moment().fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">
              {referenceNo ? referenceNo : ""}
              {/* LOA-000005 */}
            </Tag>
            <StatusTag status={status ? status : 1}></StatusTag>
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
            {/* <p>no description</p> */}
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
            <div className="cardSection__body">
              {deductionPerMonth ? deductionPerMonth : ""}
              {/* 100 */}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Deadline</div>
            <div className="cardSection__body">
              {/* {moment(effectiveDate).format("Do MMM YY")} */}
              {deadline
                ? moment(deadline).format("ddd,MMM DD,YYYY")
                : moment().format("ddd,MMM DD,YYYY")}
              {/* {moment().format("dd,MM DD YYY")} */}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Amount</div>
            <div className="cardSection__body"> {amount ? amount : ""}</div>
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
