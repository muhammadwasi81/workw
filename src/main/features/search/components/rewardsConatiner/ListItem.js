import { Image, Tag } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import { rewardDictionaryList } from "../../../reward/localization";

function ListItem(data) {
  console.log(data, "rewarddd");
  const { userLanguage } = useContext(LanguageChangeContext);
  const { rewardDictionary } = rewardDictionaryList[userLanguage];
  const detailHandler = () => {};
  const localTime = moment
    .utc(data.data.createDate)
    .local()
    .format();
  return (
    // <div className='singleGroupItem'>
    //     <img src='https://st.depositphotos.com/1062085/4008/v/600/depositphotos_40089703-stock-illustration-businessman-in-the-office-flat.jpg' />
    //     <h3>
    //         Reward One
    //     </h3>
    // </div>

    <>
      <SingleItem onClick={detailHandler}>
        <div className="" id={data.data.id}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={data.data.creator?.image}
              name={data.data.creator?.name}
              Subline={
                <SublineDesigWithTime
                  designation={
                    data.data.creator?.designation
                      ? data.data.creator?.designation
                      : ""
                  }
                  time={moment(localTime).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">
              {data.data.referenceNo && data.data.referenceNo}
            </Tag>
            <StatusTag
              status={data.data.status && data.data.status}
            ></StatusTag>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description">
            <p>{data.data.description}</p>
          </div>
          <div
            className=" ml-auto attachmentBox"
            style={{ width: "65px", height: "60px" }}
          >
            <Image
              preview={false}
              // width={60}
              // height={60}
              src={data.data.image === "" ? "" : data.data.image}
            />
            {/* <Attachments
              data={[image]}
              key={{ data: image }}
              toShow={1}
              onClick={() => {}}
            /> */}
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {rewardDictionary.category}
            </div>
            <div className="cardSection__body">{data.data.category}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{rewardDictionary.name}</div>
            <div className="cardSection__body layout">{data.data.name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{rewardDictionary.reason}</div>
            <div className="cardSection__body layout">{data.data.reason}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {rewardDictionary.rewardTo}
            </div>
            {/* <div className="cardSection__body">
              {console.log(members, "ggegegeg") && members && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"members"}
                  membersData={data.members}
                  text={"Members"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div> */}
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {rewardDictionary.approvers}
            </div>
            {/* <div className="cardSection__body">
              {approvers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={data.approvers}
                  text={"Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div> */}
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
