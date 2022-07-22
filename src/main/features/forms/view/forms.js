import React from "react";
import Header from "./header";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import FilterBar from "./filterBar";
import DocumentDetailCards from "./documentDetailCards";

const Forms = () => {

  return (
    <TabbableContainer>
      <Header />
      <FilterBar />
      <ContBody>
        <DocumentDetailCards />
      </ContBody>
    </TabbableContainer>
  );
};

export default Forms;
