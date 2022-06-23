// import { useContext } from "react";
// import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
// import { loanDictionaryList } from "../localization/index";

export const DepartmentTypeMemberEnum = {
  Employee: 1,
  Admin: 2,
  SubHeadOfDepartment: 3,
};

export function DepartmentMemberTypeList() {
  // const { userLanguage } = useContext(LanguageChangeContext);
  // const { loanDictionary } = loanDictionaryList[userLanguage];
  return [
    {
      id: DepartmentTypeMemberEnum.Employee,
      name: "Employee",
    },
    {
      id: DepartmentTypeMemberEnum.Admin,
      name: "admin",
    },
    {
      id: DepartmentTypeMemberEnum.SubHeadOfDepartment,
      name: "sub head of department",
    },
  ];
}
