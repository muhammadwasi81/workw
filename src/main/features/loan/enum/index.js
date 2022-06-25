import { useContext } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { loanDictionaryList } from "../localization/index";

export const loanPurposeEnum = {
  Vehicle: 1,
  Personal: 2,
  Wedding: 3,
  Medical: 4,
  Education: 5,
  House: 6,
  Other: 7,
};

export function LoanPurposeList() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { loanDictionary } = loanDictionaryList[userLanguage];
  return [
    {
      id: loanPurposeEnum.Vehicle,
      name: loanDictionary.loanPurpose.vehicle,
    },
    {
      id: loanPurposeEnum.Personal,
      name: loanDictionary.loanPurpose.personal,
    },
    {
      id: loanPurposeEnum.Wedding,
      name: loanDictionary.loanPurpose.wedding,
    },
    {
      id: loanPurposeEnum.Medical,
      name: loanDictionary.loanPurpose.medical,
    },
    {
      id: loanPurposeEnum.Education,
      name: loanDictionary.loanPurpose.education,
    },
    { id: loanPurposeEnum.House, name: loanDictionary.loanPurpose.house },
    { id: loanPurposeEnum.Other, name: loanDictionary.loanPurpose.other },
  ];
}
