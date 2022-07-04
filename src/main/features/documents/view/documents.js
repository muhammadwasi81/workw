import React from "react";
import Header from "./header";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import FilterBar from "./filterBar";
// import TypeBar from "./typeBar";
import DocumentComposers from "./composer";
import { useSelector } from "react-redux";
import DocumentDetailCards from "./documentDetailCards";
import DocumentShortCards from "./documentShortCards";

const Documents = () => {
  const CurrentTab = useSelector(state => state.documentSlice.currentTab);
  let RenderTab = {
    allDocuments: <DocumentShortCards />,
    myDocuments: <DocumentDetailCards />,
    forApprovals: <DocumentDetailCards />
  }
  return (
    <TabbableContainer>
      <Header />
      {/* <TypeBar /> */}
      <FilterBar />
      <ContBody>
        { RenderTab[CurrentTab] }
      </ContBody>
      <DocumentComposers />
    </TabbableContainer>
  );
};

export default Documents;
