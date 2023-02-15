import React from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import {
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { FeaturesEnumList } from "../../../../../utils/Shared/enums/featuresEnums";
import { useDispatch } from "react-redux";


function ListItem({item, onClick, id}) {
  const dispatch = useDispatch()

  const {
    firstName,
    lastName,
    email,
    title,
    features,
  } = item ? item : "";

  let splited = features.split(',')
  var nums = splited.map(function(str) {
  return parseInt(str); });

  return (
    <>
      <SingleItem onClick={onClick}>
        <div className="" id={id}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              // avatarSrc={creator?.image}
              name={title}
              Subline={
                <SublineDesigWithTime
                  designation={email}
              // time={moment(localTime).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <button 
              className="ThemeBtn" 
              style={{
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '5px',
                paddingBottom: '5px'
                }}
                // onClick={() => dispatch()}
                >
                  Resend
            </button>
          </div>
        </ItemHeader>
        <div className="tagsContainer">
              {
                FeaturesEnumList.map((item) => {
                  if (nums.includes(item.value)) {
                    return (
                      <span className="featureTag">{item.label}</span>
                    )
                  }
                })
            }
        </div>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {"First Name"}
            </div>
            <div className="cardSection__body">{firstName}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Last Name"}</div>
            <div className="cardSection__body layout">{lastName}</div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
