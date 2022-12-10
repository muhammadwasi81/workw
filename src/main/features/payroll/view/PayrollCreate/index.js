import React, { useContext } from "react";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import CreatePayrollTable from "./createPayrollVoucher";
import { payrollDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { payrollDictionary, Direction } = payrollDictionaryList[userLanguage];
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: payrollDictionary.createPayroll,
            to: ROUTES.PAYROLL.ROOT + "/create",
          },
        ]}
      />
      <ContBody>
        <CreatePayrollTable defaultRows={15} />
      </ContBody>
    </TabbableContainer>
  );
};
export default Index;
