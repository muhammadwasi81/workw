import React, { useContext } from "react";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import CreateQuotationVoucher from "./createSalaryVoucher";
import { quotationDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { quotationDictionary, Direction } = quotationDictionaryList[
    userLanguage
  ];
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: quotationDictionary.createQuotation,
            to: ROUTES.QUOTATION.ROOT + "/create",
          },
        ]}
      />
      <ContBody>
        <CreateQuotationVoucher defaultRows={12} />
      </ContBody>
    </TabbableContainer>
  );
};
export default Index;
