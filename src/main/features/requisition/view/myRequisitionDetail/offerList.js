import React from "react";
import { useSelector } from "react-redux";
import Tab from "../../../../sharedComponents/Tab";
import TabElement from "./Tabelement";
const { TabPane } = Tab;

function OfferList(props) {
  const { offers } = useSelector((state) => state.requisitionSlice);
  console.log(offers, "OFFER BY ID");

  const panes = [
    {
      featureId: 0,
      featureName: `Offers`,
      content: <TabElement />,
    },
    {
      featureId: 1,
      featureName: `Short List`,
      content: <div>Information div</div>,
    },
    {
      featureId: 2,
      featureName: `Declined`,
      content: <div>Declined div</div>,
    },
    {
      featureId: 3,
      featureName: `Finalised`,
      content: <div>Finalised div</div>,
    },
  ];
  return (
    <div className="_candidateList">
      <Tab panes={panes} />
    </div>
  );
}

export default OfferList;
