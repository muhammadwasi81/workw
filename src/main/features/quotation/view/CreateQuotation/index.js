import React from "react";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import { ContBody, TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import CreateQuotationVoucher from "./createSalaryVoucher";
const Index = () => {
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: "Create Qoutation",
            to: ROUTES.QOUTATION.ROOT + "/create"
          }
        ]}
      />
      <ContBody>
        <CreateQuotationVoucher defaultRows={12} />
      </ContBody>
    </TabbableContainer>
  );
};
export default Index;
