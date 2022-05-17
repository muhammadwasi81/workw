import React, { useContext } from "react";
import { Drawer, Tag, Image } from 'antd'
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Approval from "../../../../components/SharedComponent/AppComponents/Approval/Approval";
import UserInfo from "../../../../components/SharedComponent/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../components/SharedComponent/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";

const dummyMember = [
	{
		profile_picture:
			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
		name: "Abu Bakar",
	},
	{
		profile_picture:
			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
		name: "Abu Bakar",
	},
	{
		profile_picture:
			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
		name: "Abu Bakar",
	},
	{
		profile_picture:
			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
		name: "Abu Bakar",
	},
	{
		profile_picture:
			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
		name: "Abu Bakar",
	},
];

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, rewardsDictionary, direction } = dictionaryList[userLanguage];

  const { rewardDetail } = useSelector(state => state.rewardSlice);

  const x = rewardDetail.data;

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <>
      <Drawer 
        title={sharedLabels.rewards}
        width="768"
        placement={ isTablet ? "bottom" : "right"} 
        onClose={props.onClose} 
        visible={props.visible}
        className="detailedViewComposer"
      >
        <div className="list-item">
          <div className="item-header">
            <div className="left">
              <UserInfo
                avatarSrc="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
                name={x.creator.name}
                Subline={
                  <SublineDesigWithTime
                    designation={"ReactJs Developer"}
                    time="7 days ago"
                  />
                }
              />
            </div>
            <div className="right">
              <Tag className="IdTag">TRA-000085</Tag>
              <StatusTag status={x.status}></StatusTag>
            </div>
          </div>
          <div className="item-content">
            <p>{x.description}</p>
          </div>
          <div className="ListItemInner">
            <div className="ItemDetails">
              <div className="innerDiv">
                <h3>{sharedLabels.name}</h3>
                <p>{x.name}</p>
              </div>
              <div className="innerDiv">
                <h3>{sharedLabels.category}</h3>
                <Tag className="IdTag">{x.category}</Tag>
              </div>
              <div className="innerDiv">
                <h3>{sharedLabels.Reason}</h3>
                <p>{props.reason}</p>
              </div>
              <div className="innerDiv">
                <h3>{sharedLabels.RewardTo}</h3>
                {props.members}
                <div className="mem">
                  {dummyMember.map((val, i) => {
                    if (i > 2) return "";
                    return val.profile_picture ? (
                      <div
                        key={`grpmem${i}`}
                        className="us-img"
                        style={{
                          backgroundImage: `url(${val.profile_picture})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                        }}
                      />
                    ) : (
                      <div key={`grpmem${i}`} className="us-img">
                        {getNameForImage(val.name)}
                      </div>
                    );
                  })}
                  {dummyMember ? (
                    dummyMember.length > 2 ? (
                      <div className="us-img">
                        {dummyMember && dummyMember.length - 2}+
                      </div>
                    ) : (
                      ""
                    )
                  ) : null}
                </div>
              </div>
              <div className="approversBox">
                <h3>{sharedLabels.approvers}</h3>
                <div className="mem">
                  {dummyMember.map((val, i) => {
                    if (i > 2) return "";
                    return val.profile_picture ? (
                      <div
                        key={`grpmem${i}`}
                        className="us-img"
                        style={{
                          backgroundImage: `url(${val.profile_picture})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                        }}
                      />
                    ) : (
                      <div key={`grpmem${i}`} className="us-img">
                        {getNameForImage(val.name)}
                      </div>
                    );
                  })}
                  {dummyMember ? (
                    dummyMember.length > 2 ? (
                      <div className="us-img">
                        {dummyMember && dummyMember.length - 2}+
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
                width={100}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
          </div>
          <div className="warning-approvers">
            {x.approvers.map((a, i) => {
                return (
                  <>
                    <Approval 
                      username={a.approver.name}
                      userdesignation={"React JS Developer"}
                      status={2}   
                    />
                  </>
                )
            })}
          </div>
        </div>
			</Drawer>
    </>
  )
}

export default DetailedView