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
      content: <div>Information div</div>,
    },
    {
      featureId: 2,
      featureName: `Rejected`,
      content: <div>Information div</div>,
    },
    {
      featureId: 3,
      featureName: `Completed`,
      content: <div>Information div</div>,
    },
    {
      featureId: 4,
      featureName: `Finalist`,
      content: <div>Information div</div>,
    },
    {
      featureId: 5,
      featureName: `May be`,
      content: <div>Information div</div>,
    },
  ];
  return (
    <div className="_candidateList">
      <Tab panes={panes} />
    </div>
  );
}

export default CandidateListView;
