import React from "react";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import { ContBody, TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import CreatePayrollTable from "./createSalaryVoucher";
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
        <CreatePayrollTable />
      </ContBody>
    </TabbableContainer>
  );
};
export default Index;
