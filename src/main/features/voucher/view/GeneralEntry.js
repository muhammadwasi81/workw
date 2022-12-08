import React, { useContext } from "react";
import { ROUTES } from "../../../../utils/routes";
import Header from "../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import CreateEntryTable from "./createEntryTable";
import { voucherDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const GeneralEntry = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { vouncherDictionary, Direction } = voucherDictionaryList[userLanguage];
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: vouncherDictionary.createVoucher,
            to: ROUTES.FINANCE.VOUCHER.ROOT,
          },
        ]}
      />
      <ContBody>
        <CreateEntryTable defaultRows={12} />
      </ContBody>
    </TabbableContainer>
  );
};
export default GeneralEntry;
