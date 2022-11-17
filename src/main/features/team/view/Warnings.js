import React, { useEffect, useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import moment from "moment";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import { useDispatch, useSelector } from "react-redux";
import { getAllWarningAction } from "../store/action";
import "../Styles/table.css";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";
import { useParams } from "react-router-dom";

function Warnings({ userId = null }) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.WarningsTable;

  const {
    team: { warningdetails },
    success,
  } = useSelector((state) => state.teamSlice);
  const { id } = useParams();

  let myId = userId ? userId : id;

  useEffect(() => {
    dispatch(getAllWarningAction(myId));
  }, []);
  const columns = [
    {
      title: labels.ReferenceNo,
      dataIndex: "referenceNo",
      key: "referenceNo",
      sort: true,
      width: 200,
      // className: "referenceNo",
    },
    {
      title: labels.Date,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      key: "createDate",
      sort: true,
      width: 200,
      // className: "dateTime",
    },

    {
      title: labels.Category,
      dataIndex: "category",
      key: "category",
      sort: true,
      width: 200,
      // className: "category",
    },

    {
      title: labels.Status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      key: "status",
      sort: true,
      width: 200,
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
        dataSource={warningdetails}
        // dataSource={tableColumn()}
      />
    </>
  );
}
export default Warnings;
