import React from "react";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "./Header/index";
import CareersListView from "./CareersListView";

function PublicJobs() {
  return (
    <>
      <TabbableContainer>
        {/* <Header /> */}
        <ContBody>
          <CareersListView />
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default PublicJobs;
