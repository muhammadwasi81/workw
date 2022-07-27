import React from "react";
import { ROUTES } from "../../../../utils/routes";
import Header from "../../../layout/header";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import ReportReport from "./Filter";
const FinanceReport = () => {
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: "Reports",
            to: ROUTES.FINANCE.REPORT.ROOT,
          }
        ]}
      />
      <ReportReport />
      <ContBody>
        <h1>Reports</h1>
      </ContBody>
    </TabbableContainer>
  );
};
export default FinanceReport;
