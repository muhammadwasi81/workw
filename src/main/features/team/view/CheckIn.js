import React, { useContext, useEffect } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCheckInAction } from "../store/action";
import { TeamStatusEnum, TeamsMoodEnum } from "../util/enums";
import moment from "moment";

function CheckIn() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.CheckInTable;

  const { id } = useParams();

  const {
    team: { checkIndetails },
  } = useSelector((state) => state.teamSlice);

  useEffect(() => {
    dispatch(getAllCheckInAction(id));
  }, []);
  const columns = [
    {
      title: labels.Date,
      dataIndex: "attendanceDate",
      key: "attendanceDate",
      className: "dateTime",
      render: (createDate) => moment(createDate).format("MMM DD YYYY"),
    },

    {
      title: labels.Time,
      dataIndex: "attendanceDate",
      key: "attendanceDate",
      className: "dateTime",
      render: (attendanceDate) => moment(attendanceDate).format("LT"),
    },
    {
      title: labels.Status,
      dataIndex: "type",
      key: "type",
      className: "status",
      render: (type) => {
        let value = TeamStatusEnum.filter((item) => item.value === type)[0];
        return <div>{value.label}</div>;
      },
    },

    {
      title: labels.Mood,
      dataIndex: "moodId",
      key: "moodId",
      className: "moodCls",
      render: (moodId) => {
        let value = TeamsMoodEnum.filter((item) => item.value === moodId)[0];
        return (
          <div className="mood">
            {value.Icon}
            {value.label}
          </div>
        );
      },
    },
    {
      title: labels.Comments,
      dataIndex: "comment",
      key: "comment",
      className: "longDsc",
    },
    // {
    //   title: labels.Location,
    //   dataIndex: "location",
    //   key: "location",
    // },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        className="custom_table"
        dataSource={checkIndetails}
      />
    </>
  );
}
export default CheckIn;
