import React, { useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";

function TeamTableView() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.teamTable;

  const { teams } = useSelector((state) => state.teamSlice);
  const columns = [
    {
      title: labels.name,
      dataIndex: "name",
      key: "name",
    },
    {
      title: labels.designation,
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: labels.email,
      dataIndex: "email",
      key: "email",
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
export default TeamTableView;
