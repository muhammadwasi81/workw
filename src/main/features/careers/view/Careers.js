import React from "react";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import TopBar from "./Header/filterBar";
import Header from "./Header/header";
import CareersListView from "./CareersListView";
import MyCareersListView from "./MyCareersListView";

function Careers() {
  return (
    <>
      <TabbableContainer>
        <Header />
        <TopBar />
        <ContBody>
          <MyCareersListView />
          {/* <CareersListView /> */}
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default Careers;
