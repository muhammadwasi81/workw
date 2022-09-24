import React from "react";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import TopBar from "./Header/filterBar";
import Header from "./Header/header";
import CareersListView from "./CareersListView";

function Careers() {
  return (
    <>
      <TabbableContainer>
        <Header />
        <TopBar />
        <ContBody>
          <CareersListView />
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default Careers;
