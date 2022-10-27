import React, { useContext, useEffect } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCheckInAction } from "../store/action";

function CheckIn() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.CheckInTable;

  const { id } = useParams();

  const {
    team: { checkIndetails },
    success,
  } = useSelector((state) => state.teamSlice);

  useEffect(() => {
    dispatch(getAllCheckInAction(id));
  }, []);
  const columns = [
    {
      title: labels.Date,
      dataIndex: "attendanceDate",
      key: "attendanceDate",
    },

    {
      title: labels.Time,
      dataIndex: "attendanceDate",
      key: "attendanceDate",
    },
    {
      title: labels.Status,
      dataIndex: "type",
      key: "type",
    },
    {
      title: labels.Comments,
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: labels.Mood,
      dataIndex: "moodId",
      key: "moodId",
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
        dataSource={checkIndetails}
      />
    </>
  );
}
export default CheckIn;
