import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { requisitionDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import Tab from "../../../../sharedComponents/Tab";
import TabElement from "./Tabelement";
const { TabPane } = Tab;

function OfferList(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { requisitionDictionary } = requisitionDictionaryList[userLanguage];
  const { offers } = useSelector((state) => state.requisitionSlice);

  const panes = [
    {
      featureId: 0,
      featureName: requisitionDictionary.Offers,
      content: <TabElement />,
    },
    {
      featureId: 1,
      featureName: requisitionDictionary.ShortList,
      content: <TabElement />,
    },
    {
      featureId: 2,
      featureName: requisitionDictionary.Declined,
      content: <TabElement />,
    },
    {
      featureId: 3,
      featureName: requisitionDictionary.Finalised,
      content: <TabElement />,
    },
  ];
  return (
    <div className="_candidateList">
      <Tab panes={panes} />
    </div>
  );
}

export default OfferList;
