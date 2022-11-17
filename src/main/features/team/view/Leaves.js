import React, { useContext, useEffect } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeaveAction } from "../store/action";
import { useParams } from "react-router-dom";
import moment from "moment";

function Leaves() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.LeavesTable;

  const {
    team: { leavedetails },
    success,
  } = useSelector((state) => state.teamSlice);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllLeaveAction(id));
  }, []);
  const columns = [
    {
      title: labels.leaveTypeName,
      dataIndex: "leaveTypeName",
      key: "leaveTypeName",
      sort: true,
      width: 200,
      // className: "leaveType",
    },

    {
      title: labels.startDate,
      dataIndex: "startDate",
      key: "startDate",
      sort: true,
      width: 200,
      // className: "dateTime",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
    },
    {
      title: labels.endDate,
      dataIndex: "endDate",
      key: "endDate",
      sort: true,
      width: 200,
      // className: "dateTime",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
    },
    {
      title: labels.description,
      dataIndex: "description",
      key: "description",
      sort: true,
      width: 200,
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
        dataSource={leavedetails}
      />
    </>
  );
}
export default Leaves;
