import React, { useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";

function ActivityLog() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.ActivityLogTbale;
  const columns = [
    {
      title: labels.Date,
      dataIndex: "date",
      key: "date",
    },

    {
      title: labels.LoginFrom,
      dataIndex: "loginFrom",
      key: "loginFrom",
    },
    {
      title: labels.LoginIp,
      dataIndex: "loginIP",
      key: "loginIP",
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
        className="custom_table"
        dataSource={[
          {
            date: "Mon 2019",
            loginFrom: "web app",
            loginIP: "99999",
            location: "miletap",
          },
        ]}
      />
    </>
  );
}
export default ActivityLog;
