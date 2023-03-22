import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import LayoutHeader from "../../../../layout/header";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function DetailHeader({ dictionary, direction }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];
  // const items = [
  //   {
  //     name: "Detail",
  //     to: ``,
  //     renderButton: [1],
  //   },
  // ];

  return <LayoutHeader buttons={[]} />;
}

export default DetailHeader;
