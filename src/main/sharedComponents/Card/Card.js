import { Button, Tag } from "antd";
import React, { useContext } from "react";
import Avatar from "../Avatar/avatar";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import UserInfo from "../UserShortInfo/UserInfo";
import SublineDesigWithTime from "../UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../utils/base";
import moment from "moment";
import StatusTag from "../Tag/StatusTag";
import {
  SingleItem,
  ItemHeader,
  ItemContent,
  ItemProfile,
  ItemInfo,
} from "../ShortCard/ShortCardStyle";
import { CardWrapper } from "./CardStyle";

const Card = () => {
  return (
    <>
      <CardWrapper></CardWrapper>
    </>
  );
};

export default Card;
