import React, { useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";

function Appraisals() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.AppraisalsTable;

  const columns = [
    {
      title: labels.Position,
      dataIndex: "position",
      key: "position",
    },

    {
      title: labels.EmployeeType,
      dataIndex: "employmentTypeId",
      key: "employmentTypeId",
    },
    {
      title: labels.City,
      dataIndex: "cityId",
      key: "cityId",
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        className="custom_table"
        dataSource={[
          {
            position: "one",
            employmentTypeId: "test Employee",
            cityId: "test City",
          },
        ]}
      />
    </>
  );
}
export default Appraisals;
