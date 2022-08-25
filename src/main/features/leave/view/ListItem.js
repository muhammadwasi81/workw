import { Image, Tag } from "antd";
import React, { useContext, useEffect } from "react";
import { leaveDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, leaveDictionary } = leaveDictionaryList[userLanguage];

  const {
    creator,
    startDate,
    endDate,
    description,
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    members = [],
    approvers,
    status,
    referenceNo,
    createDate,
  } = props.item;

  var a = moment(startDate);
  var b = moment(endDate);
  const days = a.diff(b, "days");

  return (
    <SingleItem>
      <div
        className="new"
        id={props.id}
        onClick={() => {
          props.getLeaveId(props.id);
        }}></div>
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={creator.image}
            name={creator.name}
            Subline={<SublineDesigWithTime designation={creator.designation} time={moment(createDate).format("DD/MM/YYYY")} />}
          />
        </div>
        <div className="right">
          <Tag className="IdTag">{referenceNo}</Tag>
          <StatusTag status={status}></StatusTag>
        </div>
      </ItemHeader>
      <ItemContent>
        <p>{description}</p>
      </ItemContent>
      <div className="ListItemInner">
        <div className="ItemDetails">
          <div className="innerDiv">
            <h3>{leaveDictionary.startDate}</h3>
            <p>{moment(startDate).format("ddd,MMM DD,YYYY")}</p>
          </div>
          <div className="innerDiv">
            <h3>{leaveDictionary.endDate}</h3>
            <p>{moment(endDate).format("ddd,MMM DD,YYYY")}</p>
          </div>
          <div className="innerDiv">
            <h3>{leaveDictionary.days}</h3>
            <p>{days}</p>
          </div>
          <div className="approversBox">
            <h3>{leaveDictionary.approvers}</h3>
            <div className="mem">
              {approvers &&
                approvers.map((val, i) => {
                  if (i > 2) return "";
                  let { approver } = val;
                  return (
                    approver &&
                    (approver.image ? (
                      <div
                        key={`grpmem${i}`}
                        className="us-img"
                        style={{
                          backgroundImage: `url(${approver.image})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                        }}
                      />
                    ) : (
                      <div key={`grpmem${i}`} className="us-img">
                        {getNameForImage(approver.name)}
                      </div>
                    ))
                  );
                })}
              {approvers ? approvers.length > 2 ? <div className="us-img">{approvers && props.approvers - 2}+</div> : "" : null}
            </div>
          </div>
        </div>
        <div className="attachmentBox">
          <Image preview={false} width={100} src={image === "" ? RewardDefaultIcon : image} />
        </div>
      </div>
    </SingleItem>
  );
}

export default ListItem;
