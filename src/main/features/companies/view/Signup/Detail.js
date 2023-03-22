import React, { useEffect, useState } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import {
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { FeaturesEnumList } from "../../../../../utils/Shared/enums/featuresEnums";
import { useDispatch } from "react-redux";
import { GetSignupById, ResendSignupEmailAction } from "../../companies/store/action";
import { useSelector } from "react-redux";
import '../../styles/dashboard.css'


function SignupDetail({onClick, id}) {
  const dispatch = useDispatch()
  const { signupDetail } = useSelector((state) => state.companySlice)
  const {
    firstName,
    lastName,
    email,
    title,
    features,
  } = signupDetail ? signupDetail : "";


  useEffect(() => {
    dispatch(GetSignupById(id))
  },[])

  let splited = features && features.split(',')
  var nums = splited && splited.map(function(str) {
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
                onClick={() => dispatch(ResendSignupEmailAction(id))}
                >
                  Resend
            </button>
          </div>
        </ItemHeader>
        <div className="tagsContainer">
              {
                signupDetail && FeaturesEnumList.map((item) => {
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

export default SignupDetail;
