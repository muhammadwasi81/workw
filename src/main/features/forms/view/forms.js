import React from "react";
import Header from "./header";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import FilterBar from "./filterBar";
import DocumentComposers from "./composer";
import DocumentDetailCards from "./documentDetailCards";

const Forms = () => {

  return (
    <TabbableContainer>
      <Header />
      <FilterBar />
      <ContBody>
        <DocumentShortCards />
      </ContBody>
      <DocumentComposers />
    </TabbableContainer>
  );
};

export default Forms;
