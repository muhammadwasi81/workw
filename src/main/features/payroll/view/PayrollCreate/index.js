import React from "react";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import { ContBody, TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import CreatePayrollTable from "./createPayrollVoucher";
const Index = () => {
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: "Create Payroll",
            to: ROUTES.PAYROLL.ROOT + "/create"
          }
        ]}
      />
      <ContBody>
        <CreatePayrollTable defaultRows={15} />
      </ContBody>
    </TabbableContainer>
  );
};
export default Index;
