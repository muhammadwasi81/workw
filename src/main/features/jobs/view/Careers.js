import React from "react";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import CareersListView from "./CareersListView";

function Careers() {
  return (
    <>
      <TabbableContainer>
        <ContBody>
          <CareersListView />
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default Careers;
