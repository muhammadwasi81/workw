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

function Warnings() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.WarningsTable;

  const {
    team: { warningdetails },
    success,
  } = useSelector((state) => state.teamSlice);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllWarningAction("D3202659-8910-410F-93D5-2C7D8B39A2D5"));
  }, []);
  const columns = [
    {
      title: labels.ReferenceNo,
      dataIndex: "referenceNo",
      key: "referenceNo",
    },
    {
      title: labels.Date,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      key: "createDate",
    },

    {
      title: labels.Category,
      dataIndex: "category",
      key: "category",
    },

    {
      title: labels.Status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      key: "status",
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
