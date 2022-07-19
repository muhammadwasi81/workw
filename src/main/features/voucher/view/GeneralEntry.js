import React from "react";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import CreateEntryTable from "./createEntryTable";
const GeneralEntry = () => {
  return (
    <TabbableContainer>
      <ContBody>
        <CreateEntryTable defaultRows={16} />
      </ContBody>
    </TabbableContainer>
  );
};
export default GeneralEntry;
