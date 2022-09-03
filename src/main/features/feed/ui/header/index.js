import { Button } from "antd";
import React, { useContext } from "react";
import { STRINGS } from "../../../../../utils/base";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

import LayoutHeader from "../../../../layout/header";
import CheckIn from "../../../attendance/CheckIn_Out";
const Header = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const label = dictionaryList[userLanguage];
  const items = [
    {
      name: label.appHeader.newsFeed.posts,
      to: `${STRINGS.ROUTES.ROOT}`,
      renderButton: [1],
    },
    {
      name: label.appHeader.newsFeed.photos,
      to: `${STRINGS.ROUTES.ROOT}?f=photos`,
      renderButton: [1],
    },
    {
      name: label.appHeader.newsFeed.polls,
      to: `${STRINGS.ROUTES.ROOT}?f=polls`,
      renderButton: [1],
    },
    {
      name: label.appHeader.newsFeed.videos,
      to: `${STRINGS.ROUTES.ROOT}?f=videos`,
      renderButton: [1],
    },
    {
      name: label.appHeader.newsFeed.docs,
      to: `${STRINGS.ROUTES.ROOT}?f=docs`,
      renderButton: [1],
    },
    {
      name: label.appHeader.newsFeed.tagged,
      to: `${STRINGS.ROUTES.ROOT}?f=tagged`,
      renderButton: [1],
    },
  ];
  const buttons = [
    {
      buttonText: "aaa",
      render:<CheckIn />
    }
  ];
  return <LayoutHeader items={items} buttons={buttons}></LayoutHeader>;
};
export default Header;
