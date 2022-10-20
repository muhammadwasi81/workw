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

function Warnings() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.WarningsTable;

  const {
    team: { warningdetails },
    success,
  } = useSelector((state) => state.teamSlice);

  useEffect(() => {
    dispatch(getAllWarningAction({}));
  }, []);
  const columns = [
    {
      title: labels.ReferenceNo,
      dataIndex: "referenceNo",
      key: "referenceNo",
    },

    {
      title: labels.Status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      key: "status",
    },
    {
      title: labels.Category,
      dataIndex: "category",
      key: "category",
    },
    {
      title: labels.Date,
      dataIndex: "date",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      key: "date",
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
