import React,{useContext} from "react";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import { ContBody, TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import CreateSalaryVoucher from "./createSalaryVoucher";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import {salaryDictionary} from "../../../salary/localization/index";

const Index = () => {

  const { userLanguage } = useContext(LanguageChangeContext);
  const { salary_Dictionary } = salaryDictionary[userLanguage];

  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: salary_Dictionary.CreateSalary,
            to: ROUTES.SALARY.ROOT + "/create"
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