import React, { useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";

function Courses() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.CoursesTable;
  const columns = [
    {
      title: labels.CourseName,
      dataIndex: "courseName",
      key: "courseName",
    },

    {
      title: labels.Date,
      dataIndex: "date",
      key: "date",
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
            courseName: "Web Engineering",
            date: "Mon 2019",
          },
        ]}
      />
    </>
  );
}
export default Courses;
