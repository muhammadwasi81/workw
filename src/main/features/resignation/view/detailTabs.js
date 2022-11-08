import React, { useContext, useEffect } from "react";
import Tab from "../../../sharedComponents/Tab";
const { TabPane } = Tab;
import "./style.css"
import Loan from "../../team/view/Loan";
import Warnings from "../../team/view/Warnings";

function DetailTabs({detailId}) {

  const panes = [
    {
      featureId: 0,
      featureName: "Loans",
      content: <Loan userId={detailId} />,
    },
    {
      featureId: 1,
      featureName: "Assets",
      content: "Assets",
    },
    {
      featureId: 2,
      featureName: "Warnings",
      content: <Warnings userId={detailId} />,
    },
    {
      featureId: 3,
      featureName: "Rewards",
      content: <div>Finalised div</div>,
    },
    {
        featureId: 4,
        featureName: "Courses",
        content: <div>Finalised div</div>,
      },
  ];
  return (
    <div className="detailTabs">
      <Tab panes={panes} />
    </div>
  );
}

export default DetailTabs;
