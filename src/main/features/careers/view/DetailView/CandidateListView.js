import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import { useSelector } from "react-redux";
import Tab from "../../../../sharedComponents/Tab";
import TabElement from "./Tabelement";
const { TabPane } = Tab;

function CandidateListView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];
  const { careerApplicants } = useSelector((state) => state.careerSlice);
  console.log(careerApplicants);
  const { labels } = CareerDictionaryList;

  const panes = [
    {
      featureId: 0,
      featureName: `${labels.applicants}`,
      content: <TabElement />,
    },
    {
      featureId: 1,
      featureName: `${labels.shortListed}`,
      content: <TabElement />,
    },
    {
      featureId: 2,
      featureName: `${labels.rejected}`,
      content: <TabElement />,
    },
    {
      featureId: 3,
      featureName: `${labels.completed}`,
      content: <TabElement />,
    },
    {
      featureId: 4,
      featureName: `${labels.finalist}`,
      content: <TabElement />,
    },
    {
      featureId: 5,
      featureName: `${labels.maybe}`,
      content: <TabElement />,
    },
  ];
  return (
    <div className="_candidateList">
      <Tab panes={panes} />
    </div>
  );
}

export default CandidateListView;
