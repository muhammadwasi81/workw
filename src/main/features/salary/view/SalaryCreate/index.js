import React, { useContext } from "react";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import CreateSalaryVoucher from "./createSalaryVoucher";
import { salaryDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { salaryDictionary } = salaryDictionaryList[userLanguage];
  const { createSalary } = salaryDictionary;
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: createSalary,
            to: ROUTES.SALARY.ROOT + "/create",
          },
        ]}
      />
      <ContBody>
        <CreateSalaryVoucher defaultRows={12} />
      </ContBody>
    </TabbableContainer>
  );
};
export default Index;
