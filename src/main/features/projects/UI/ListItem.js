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
import ProjectDefaultImage from "../../../../content/png/project_cover_img.png";

import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;

function ListItem(props) {
  //   const { userLanguage } = useContext(LanguageChangeContext);
  //   const { Direction, departmentDictionary } = departmentDictionaryList[userLanguage];

  const { creator, name, description, image = ProjectDefaultImage, members = [], approvers } = props.item;

  return (
    <>
      <Card className={"Card2"} cover={<img alt="example" className="object-cover" src={ProjectDefaultImage} />} actions={[]}>
        <Meta title={name} description={description} />
        <div className="approversBox">
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
      </Card>
    </>
  );
}

export default ListItem;
