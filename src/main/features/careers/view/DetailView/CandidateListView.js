import React from "react";
import { useSelector } from "react-redux";
import Tab from "../../../../sharedComponents/Tab";
import TabElement from "./Tabelement";
const { TabPane } = Tab;

function CandidateListView(props) {
  const { careerApplicants } = useSelector((state) => state.careerSlice);
  console.log(careerApplicants);

  const panes = [
    {
      featureId: 0,
      featureName: `Applicants`,
      content: <TabElement />,
    },
    {
      featureId: 1,
      featureName: `Short Listed`,
      content: <TabElement />,
    },
    {
      featureId: 2,
      featureName: `Rejected`,
      content: <TabElement />,
    },
    {
      featureId: 3,
      featureName: `Completed`,
      content: <TabElement />,
    },
    {
      featureId: 4,
      featureName: `Finalist`,
      content: <TabElement />,
    },
    {
      featureId: 5,
      featureName: `May be`,
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
