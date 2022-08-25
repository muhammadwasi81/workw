import React from "react";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import { ContBody, TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import CreateSalaryVoucher from "./createSalaryVoucher";
const Index = () => {
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: "Create Salary",
            to: ROUTES.SALARY.ROOT
          }
        ]}
      />
      <ContBody>
        <CreateSalaryVoucher defaultRows={12} />
      </ContBody>
    </TabbableContainer>
  );
};
export default Index;
