import React, { useState, useEffect, useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";

function Attendence() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.AttendenceTable;
  const columns = [
    {
      title: labels.Date,
      dataIndex: "date",
      key: "date",
    },

    {
      title: labels.CheckIn,
      dataIndex: "checkIn",
      key: "checkIn",
    },
    {
      title: labels.CheckOut,
      dataIndex: "checkOut",
      key: "checkOut",
    },
    {
      title: labels.Late,
      dataIndex: "late",
      key: "late",
    },
    {
      title: labels.Duration,
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: labels.State,
      dataIndex: "state",
      key: "state",
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        className="custom_table"
        columns={columns}
        dataSource={[
          {
            date: "Mon May 2020",
            checkIn: "12:00AM",
            checkOut: "12:00 AM",
            late: "0",
            duration: "0",
            state: "0",
          },
        ]}
      />
    </>
  );
}
export default Attendence;
