import React, { useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";

function CheckIn() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.CheckInTable;
  const columns = [
    {
      title: labels.Date,
      dataIndex: "date",
      key: "date",
    },

    {
      title: labels.Time,
      dataIndex: "time",
      key: "time",
    },
    {
      title: labels.Status,
      dataIndex: "status",
      key: "status",
    },
    {
      title: labels.Comments,
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: labels.Mood,
      dataIndex: "mood",
      key: "mood",
    },
    {
      title: labels.Location,
      dataIndex: "location",
      key: "location",
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        // dragable={true}
        // scroll={{ x: true }}
        className="custom_table"
        dataSource={[
          {
            date: "0",
            time: "0",
            status: "0",
            comments: "kk",
            mood: "satisfied",
            location: "jjj",
          },
        ]}
        // dataSource={tableColumn()}
      />
    </>
  );
}
export default CheckIn;
