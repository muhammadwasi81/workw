import React, { useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { companyDictionaryList } from "../localization/index";

function CompanyTableView() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { companyDictionary } = companyDictionaryList[userLanguage];
  const labels = companyDictionary.companyTable;

  const { teams } = useSelector((state) => state.teamSlice);
  const columns = [
    {
      title: labels.name,
      dataIndex: "name",
      key: "name",
      className: "name",
    },
    {
      title: labels.designation,
      dataIndex: "designation",
      key: "designation",
      className: "designationStyle",
    },
    {
      title: labels.email,
      dataIndex: "email",
      key: "email",
      className: "emailStyle",
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        className="custom_table"
        dataSource={teams}
      />
    </>
  );
}
export default CompanyTableView;
