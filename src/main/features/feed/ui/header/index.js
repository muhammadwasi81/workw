import React, { useContext } from "react";
import { STRINGS } from "../../../../../utils/base";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

import LayoutHeader from "../../../../layout/header";
const Header = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const label = dictionaryList[userLanguage];
  const items = [
    {
      name: label.appHeader.newsFeed.posts,
      to: `${STRINGS.ROUTES.ROOT}`,
    },
    {
      name: label.appHeader.newsFeed.photos,
      to: `${STRINGS.ROUTES.ROOT}?f=photos`,
    },
    {
      name: label.appHeader.newsFeed.polls,
      to: `${STRINGS.ROUTES.ROOT}?f=polls`,
    },
    {
      name: label.appHeader.newsFeed.videos,
      to: `${STRINGS.ROUTES.ROOT}?f=videos`,
    },
    {
      name: label.appHeader.newsFeed.docs,
      to: `${STRINGS.ROUTES.ROOT}?f=docs`,
    },
    {
      name: label.appHeader.newsFeed.tagged,
      to: `${STRINGS.ROUTES.ROOT}?f=tagged`,
    },
  ];
  return <LayoutHeader items={items}></LayoutHeader>;
};
export default Header;
