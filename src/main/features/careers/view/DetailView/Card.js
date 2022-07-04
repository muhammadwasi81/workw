import { Image, Tag } from "antd";
import React, { useContext } from "react";
// import { customApprovalDictionaryList } from "../localization/index";
// import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../../utils/base";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../../content/svg/menu/rewardIcon.svg";
import { PieChartOutlined, GlobalOutlined } from "@ant-design/icons";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import ProImage from "../../../../../content/NewContent/careers/proImage.svg";
import { LinkOutlined } from "@ant-design/icons";
import "../styles/style.css";

const members = [
  {
    id: "2c2791d2-761d-49b7-9843-a5b81a3bd506",
    departmentId: "df958c83-dd30-4aea-8a43-7bcd67b6eedc",
    memberId: "93bc9001-a9d1-4c92-9226-3fd25d50959f",
    member: {
      id: "93bc9001-a9d1-4c92-9226-3fd25d50959f",
      businessId: "cfe50d8d-7c47-4abb-9154-661daf129cec",
      name: "Syed Danish",
      email: "syeddanish1997@gmail.com",
      image: "https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\bc09282c-0173-449e-b633-f6e13a24819f.jpg",
      type: 1,
      userTypeId: 2,
      designation: "",
    },
    memberType: 2,
  },
  {
    id: "2c2791d2-761d-49b7-9843-a5b81a3bd506",
    departmentId: "df958c83-dd30-4aea-8a43-7bcd67b6eedc",
    memberId: "93bc9001-a9d1-4c92-9226-3fd25d50959f",
    member: {
      id: "93bc9001-a9d1-4c92-9226-3fd25d50959f",
      businessId: "cfe50d8d-7c47-4abb-9154-661daf129cec",
      name: "Syed Danish",
      email: "syeddanish1997@gmail.com",
      image: "https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\bc09282c-0173-449e-b633-f6e13a24819f.jpg",
      type: 1,
      userTypeId: 2,
      designation: "",
    },
    memberType: 2,
  },
];

const Approvers = [
  {
    id: "2c2791d2-761d-49b7-9843-a5b81a3bd506",
    departmentId: "df958c83-dd30-4aea-8a43-7bcd67b6eedc",
    memberId: "93bc9001-a9d1-4c92-9226-3fd25d50959f",
    approver: {
      id: "93bc9001-a9d1-4c92-9226-3fd25d50959f",
      businessId: "cfe50d8d-7c47-4abb-9154-661daf129cec",
      name: "Syed Danish",
      email: "syeddanish1997@gmail.com",
      image: "https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\bc09282c-0173-449e-b633-f6e13a24819f.jpg",
      type: 1,
      userTypeId: 2,
      designation: "",
    },
    memberType: 2,
  },
];

function Card(props) {
  //   const { userLanguage } = useContext(LanguageChangeContext);
  //   const { Direction, customApprovalDictionary } = customApprovalDictionaryList[userLanguage];

  //   const {
  //     creator,
  //     description,
  //     image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
  //     category,
  //     subject,
  //     approvers = [],
  //     status,
  //     referenceNo,
  //     createDate,
  //   } = props.item;

  // console.log(props.item, "imagessss")
  return (
    <>
      <SingleItem className="DetailCard">
        <div
          className="new"
          id={props.id}
          onClick={() => {
            props.getRewardId(props.id);
          }}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={ProImage}
              name={"Name"}
              Subline={<SublineDesigWithTime designation={"CEO"} time={moment("2022-06-25T17:04:45.43").fromNow()} />}
            />
          </div>
          <div className="right">
            <div>
              <Tag className="IdTag">{"990099"}</Tag>
            </div>
            <div className="linkDiv">
              <StatusTag status={1}></StatusTag>
              <Tag className="LinkTag ThemeBtn">
                <LinkOutlined /> {"Copy Link"}
              </Tag>
            </div>
          </div>
        </ItemHeader>
        <ItemContent style={{ marginTop: 0 }}>
          <h2>.NET Core Developer</h2>
          <h6>Karachi, Pakistan</h6>
          <h4>Job Description</h4>
          <p>
            Bachelor’s degree in Computer Science, Experience with .NET technologies including C#, ASP.NET, .NET Core, Web Services, APIs, SQL. Proven
            analytical and problem-solving skills, highly motivated, passionate, team-player Good written and oral communications skills and ability
            to work with others in a fast-paced environment in order to meet the deadlines Strong understanding of software development methodologies
            and principles to perform assigned development tasks using established standards and procedures without any supervision Excellent written
            and verbal communication skills and be able to successfully communicate and present ideas to colleagues, business team, and senior
            management Experience working in Agile Scrum Project Management teams Responsibilities: Design, develop, test, and deploy custom web and
            mobile applications in .NET Core environment. Develop software code in accordance with business requirements
          </p>
        </ItemContent>
        <div className="flex justify-between gap-4">
          <div className="innerCard w-full">
            <div className="ItemDetails">
              <div className="innerDiv">
                <span className="text-black font-extrabold smallHeading text-center">{"Applicants"}</span>
                <p className="text-center">{"50"}</p>
              </div>
              <div className="innerDiv">
                <span className="text-black font-extrabold smallHeading">{"Job Expires"}</span>
                <p>Thu, Jan 6, 2022</p>
              </div>
              <div className="innerDiv">
                <span className="text-black font-extrabold smallHeading">{"Manager"}</span>
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Approvers"}
                  membersData={Approvers}
                  text={"Danish"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              </div>
              <div className="innerDiv">
                <span className="text-black font-extrabold smallHeading">{"Members"}</span>
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Members"}
                  membersData={members}
                  text={"Danish"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ListItemInner"></div>
      </SingleItem>
    </>
  );
}

export default Card;
