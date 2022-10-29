import React, { useContext, useEffect } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCheckInAction } from "../store/action";
import face01 from "../../../../content/NewContent/checkIn/angry.svg";
import face02 from "../../../../content/NewContent/checkIn/feeling-not-good.svg";
import face03 from "../../../../content/NewContent/checkIn/Neutral.svg";
import face04 from "../../../../content/NewContent/checkIn/feeling-good.svg";
import face05 from "../../../../content/NewContent/checkIn/happy.svg";
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
  console.log("moodId", checkIndetails);

  useEffect(() => {
    dispatch(getAllCheckInAction("D3202659-8910-410F-93D5-2C7D8B39A2D5"));
  }, []);
  const columns = [
    {
      title: labels.Date,
      dataIndex: "attendanceDate",
      key: "attendanceDate",
      render: (createDate) => moment(createDate).format("MMM DD YYYY"),
    },

    {
      title: labels.Time,
      dataIndex: "attendanceDate",
      key: "attendanceDate",
      // render: (attendanceDate) => moment(attendanceDate).format("LLLL"),
      // render: () => moment().format("LLLL"),
      render: (attendanceDate) => moment(attendanceDate).format("LT"),
    },
    {
      title: labels.Status,
      dataIndex: "type",
      key: "type",
      render: (type) => {
        let value = TeamStatusEnum.filter((item) => item.value === type)[0];
        return <div>{value.label}</div>;
      },
    },

    {
      title: labels.Comments,
      dataIndex: "comment",
      key: "comment",
      className: "longDsc",
    },
    {
      title: labels.Mood,
      dataIndex: "moodId",
      key: "moodId",
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
      title: labels.Location,
      dataIndex: "location",
      key: "location",
      className: "longDsc",
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
