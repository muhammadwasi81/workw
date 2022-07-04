import { Image, Tag } from "antd";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";
import departmentDefaultImage from "../../../../content/NewContent/department/department.svg";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, departmentDictionary } = departmentDictionaryList[userLanguage];

  const {
    creator,
    name,
    description,
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    members = [],
    approvers,
  } = props.item;

  // console.log(props.item, "imagessss")
  return (
    <>
      <Card className={"Card2"} cover={<img alt="example" src={departmentDefaultImage} />} actions={[]}>
        <Meta title={name} description={description} />
        <div className="approversBox">
          <Avatar
            isAvatarGroup={true}
            isTag={false}
            heading={"Members"}
            membersData={members}
            text={"Danish"}
            image={"https://joeschmoe.io/api/v1/random"}
          />
        </div>
      </Card>

      {/* <SingleItem>
        <div
          className="new"
          id={props.id}
          onClick={() => {
            props.getRewardId(props.id);
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
      </SingleItem> */}
    </>
  );
}

export default ListItem;
