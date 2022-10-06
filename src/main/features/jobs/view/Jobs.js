import React from "react";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
// import TopBar from "./Header/filterBar";
import Header from "./Header/index";
import CareersListView from "./CareersListView";

function Jobs() {
  return (
    <>
      <TabbableContainer>
        <Header />
        {/* <TopBar /> */}
        <ContBody>
          <CareersListView />
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default Jobs;
