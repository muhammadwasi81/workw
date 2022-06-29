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
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

function ListItem(props) {
  //   const { userLanguage } = useContext(LanguageChangeContext);
  //   const { Direction, departmentDictionary } = departmentDictionaryList[userLanguage];

  const { creator, name, description, image = ProjectDefaultImage, members = [], approvers } = props.item;

  return (
    <>
      <Card className={"Card2"} cover={<img alt="example" className="object-cover" src={ProjectDefaultImage} />} actions={[]}>
        <Meta title={name} description={description} />
        <Avatar
          isAvatarGroup={true}
          isTag={false}
          heading={"Members"}
          membersData={members}
          text={"Danish"}
          image={"https://joeschmoe.io/api/v1/random"}
        />
      </Card>
    </>
  );
}

export default ListItem;
