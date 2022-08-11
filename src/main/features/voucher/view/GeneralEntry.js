import React from "react";
import { ROUTES } from "../../../../utils/routes";
import Header from "../../../layout/header";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import CreateEntryTable from "./createEntryTable";
const GeneralEntry = () => {
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: "Create Voucher",
            to: ROUTES.FINANCE.VOUCHER.ROOT,
          }
        ]}
      />
      <ContBody>
        <CreateEntryTable defaultRows={12} />
      </ContBody>
    </TabbableContainer>
  );
};
export default GeneralEntry;
