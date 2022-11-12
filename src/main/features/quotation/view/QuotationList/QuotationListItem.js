import { Button, Image, Tag } from "antd";
import React, { useContext } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatar";

function QuotationListItem(props) {
  const disptach = useDispatch();
  const {
    creator,
    status = 1,
    referenceNo = "SAR-10001",
    createDate,
    id,
    name,
    phoneNumber,
    email,
    approvers,
  } = props.item;

  console.log(props.item, "***");

  return (
    <>
      <SingleItem
        className="Card3 formShortCard"
        onClick={() => props.onClick(id)}
      >
        <ItemHeader className="ItemHeader">
          <div className="flex justify-between">
            <UserInfo
              avatarSrc={creator?.image}
              name={creator?.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator?.designation}
                  time={moment(createDate).fromNow()}
                />
              }
            />

            <div>
              <StatusTag status={status} />
            </div>
          </div>
        </ItemHeader>

        <div className="cardSections mt-2">
          <div className="cardSectionItem">
            <div className="cardSection__title">Client's Name</div>
            <div className="cardSection__body">{name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Client's Email</div>
            <div className="cardSection__body">{email}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Phone Number</div>
            <div className="cardSection__body">{phoneNumber}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
            <div className="cardSection__body">
              {approvers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Approvers"}
                  membersData={approvers}
                  // image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default QuotationListItem;
