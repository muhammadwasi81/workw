import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { rewardDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import { Card } from "../../../layout/GridStyle";
import moment from "moment";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, rewardDictionary } = rewardDictionaryList[userLanguage];

  const {
    creator,
    name,
    description,
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    reason,
    category,
    members = [],
    approvers,
    status,
    referenceNo,
    createDate,
  } = props.item;

  // console.log(props.item, "imagessss")
  return (
    <>
      <Card>
        <div
          className="new"
          id={props.id}
          onClick={() => {
            props.getRewardId(props.id);
          }}></div>
        <div className={"item-header"}>
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
        </div>
        <div className="item-content">
          <p>{description}</p>
        </div>
        <div className="ListItemInner">
          <div className="ItemDetails">
            <div className="innerDiv">
              <h3>{rewardDictionary.name}</h3>
              <p>{name}</p>
            </div>
            <div className="innerDiv">
              <h3>{rewardDictionary.category}</h3>
              <Tag className="categoryTag">{category}</Tag>
            </div>
            <div className="innerDiv">
              <h3>{rewardDictionary.reason}</h3>
              <p>{reason}</p>
            </div>
            <div className="innerDiv">
              <h3>{rewardDictionary.rewardTo}</h3>
              {/* {props.members} */}
              <div className="mem">
                {members.map((val, i) => {
                  if (i > 2) return "";
                  let { member = { image: "", name: "" } } = val;
                  return member && member.image ? (
                    <div
                      key={`grpmem${i}`}
                      className="us-img"
                      style={{
                        backgroundImage: `url(${member.image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                      }}
                    />
                  ) : (
                    <div key={`grpmem${i}`} className="us-img">
                      {getNameForImage(member ? member.name : "")}
                    </div>
                  );
                })}
                {members ? members.length > 2 ? <div className="us-img">{members && members.length - 2}+</div> : "" : null}
              </div>
            </div>
            <div className="approversBox">
              <h3>{rewardDictionary.approvers}</h3>
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
      </Card>
    </>
  );
}

export default ListItem;
