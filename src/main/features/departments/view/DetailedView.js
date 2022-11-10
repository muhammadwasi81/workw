import React, { useContext } from "react";
import { Drawer, Tag, Image } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import Approval from "../../../sharedComponents/AppComponents/Approval/Approval";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, departmentDictionary } = departmentDictionaryList[
    userLanguage
  ];

  const { departmentDetail } = useSelector((state) => state.departmentSlice);

  const {
    creator,
    name,
    description,
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    reason,
    category,
    status,
    members = [],
    approvers,
    createDate,
  } = departmentDetail;

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={departmentDictionary.reward}
      width="768"
      placement={
        (Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")
      }
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer"
    >
      <div className="detailedCard ">
        <div className="item-header">
          <div className="left">
            <UserInfo
              avatarSrc="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
              name={creator.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator?.designation}
                  time={createDate}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">TRA-000085</Tag>
            <StatusTag status={status}></StatusTag>
          </div>
        </div>
        <div className="item-content">
          <p>{description}</p>
        </div>
        <div className="ListItemInner">
          <div className="ItemDetails">
            <div className="innerDiv">
              <h3>{departmentDictionary.name}</h3>
              <p>{name}</p>
            </div>
            <div className="innerDiv">
              <h3>{departmentDictionary.category}</h3>
              <Tag className="IdTag">{category}</Tag>
            </div>
            <div className="innerDiv">
              <h3>{departmentDictionary.reason}</h3>
              <p>{reason}</p>
            </div>
            <div className="innerDiv">
              <h3>{departmentDictionary.rewardTo}</h3>
              <div className="mem">
                {members &&
                  members.map((val, i) => {
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
                {approvers ? (
                  approvers.length > 2 ? (
                    <div className="us-img">
                      {approvers && props.approvers - 2}+
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </div>
            </div>
            <div className="approversBox">
              <h3>{departmentDictionary.approvers}</h3>
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
                {approvers ? (
                  approvers.length > 2 ? (
                    <div className="us-img">
                      {approvers && props.approvers - 2}+
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </div>
            </div>
          </div>
          <div className="attachmentBox">
            <Image
              preview={false}
              width={100}
              src={image === "" ? RewardDefaultIcon : image}
            />
          </div>
        </div>
        <div className="warning-approvers">
          {approvers &&
            approvers.map((val, i) => {
              if (val.approver) {
                let {
                  name,
                  designation = "Default Designation",
                } = val.approver;
                return (
                  <>
                    <Approval
                      username={name}
                      userdesignation={
                        designation === "" ? "Default Designation" : designation
                      }
                      status={status}
                    />
                  </>
                );
              }
            })}
        </div>
      </div>
    </Drawer>
  );
}

export default DetailedView;
