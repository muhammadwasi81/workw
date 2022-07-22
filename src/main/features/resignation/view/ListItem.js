import { Image, Tag } from "antd";
import React, { useContext } from "react";
//import { rewardDictionaryList } from "../localization/index";
//import { loanDictionaryList } from "./localization/index";
//import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../sharedComponents/Card/CardStyle";

function ListItem(props) {
  //const { userLanguage } = useContext(LanguageChangeContext);
  //const { Direction, rewardDictionary } = loanDictionaryList[userLanguage];

  return (
    <>
      <SingleItem>
        <div
          className="new"
          id={props.id}
          onClick={() => {
            // props.getRewardId(props.id);
          }}
        ></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={""}
              name={"Daniyal Khan"}
              Subline={
                <SublineDesigWithTime
                  designation={"Default Designation"}
                  time={moment().format("DD/MM/YYYY")}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">{"RT-786565"}</Tag>
            <StatusTag status={1}></StatusTag>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description w-full">
            <p>{"Description Here "}</p>
          </div>
        </ItemContent>
        <div className="flex justify-between">
          <div className="innerCard w-full">
            <div className="innerCard__header">
              <div className="left">
                Category :
                <span className="" style={{ color: "#757D86" }}>
                  {"category"}
                </span>
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
        </div>
        <div className="ListItemInner">
          <div className="ItemDetails">
            <div className="innerDiv">
              <span className="text-black font-extrabold smallHeading">
                {/* {rewardDictionary.rewardTo} */}
                Avatar
              </span>
              {/* <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"Members"}
                membersData={members}
                text={"Danish"}
                image={"https://joeschmoe.io/api/v1/random"}
              /> */}
            </div>
            <div className="innerDiv">
              <span className="text-black font-extrabold smallHeading">
                {/* {rewardDictionary.approvers} */}
                Approvers
              </span>
              {/* <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"approvers"}
                membersData={approvers ? approvers : []}
                text={"Danish"}
                image={"https://joeschmoe.io/api/v1/random"}
              /> */}
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
