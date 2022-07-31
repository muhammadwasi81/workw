import React from "react";
import Header from "./header";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import FilterBar from "./filterBar";
// import FormDetailCards from "./formDetailCards";
import FormShortCard from "./formShortCards";

const Forms = () => {
  return (
    <TabbableContainer>
      <Header />
      <FilterBar />
      <ContBody>
        <FormShortCard />
      </ContBody>
    </TabbableContainer>
  );
};

export default Forms;
