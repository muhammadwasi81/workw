import React, { useContext } from "react";
import DashboardOverview from "./UI/DashboardOverview";
import Tab from "../../../../sharedComponents/Tab";
import "../../styles/dashboard.css";
import Courses from "./Sections/Courses/Courses";
import Ebooks from "./Sections/Ebooks/Ebooks";
import Quizes from "./Sections/Quizes/Quizes";
import TedTalk from "./Sections/TedTalks/TedTalk";
import Article from "./Sections/Articles/Article";
import Videos from "./Sections/Videos/Videos";
import DashboardLayout from "./Layout/DashboardLayout";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import DocumentComposers from "../../composer";
function MainDashboard() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { elearningDictionary } = elearningDictionaryList[userLanguage];
  const panes = [
    {
      featureName: elearningDictionary.courses,
      featureId: 0,
      content: <Courses />,
    },
    {
      featureName: elearningDictionary.eBooks,
      featureId: 1,
      content: <Ebooks />,
    },
    {
      featureName: elearningDictionary.quizez,
      featureId: 2,
      content: <Quizes />,
    },
    {
      featureName: elearningDictionary.tedTalks,
      featureId: 3,
      content: <TedTalk />,
    },
    {
      featureName: elearningDictionary.articles,
      featureId: 4,
      content: <Article />,
    },
    {
      featureName: elearningDictionary.videos,
      featureId: 5,
      content: <Videos />,
    },
  ];
  return (
    <DashboardLayout>
      <div className="overflow-hidden flex flex-col gap-3 coursListing">
        <DashboardOverview />
        <Tab panes={panes} className={"elearning-dashboard__tab"} />
        <DocumentComposers /> 
      </div>
    </DashboardLayout>
  );
}

export default MainDashboard;
