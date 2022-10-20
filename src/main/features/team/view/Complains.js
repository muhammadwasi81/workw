import React, { useEffect, useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplainAction } from "../store/action";
import moment from "moment";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";

function Complains() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.ComplainsTable;

  const {
    team: { complaindetails },
    success,
  } = useSelector((state) => state.teamSlice);

  useEffect(() => {
    dispatch(getAllComplainAction({}));
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
        className="custom_table"
        dataSource={complaindetails}
      />
    </>
  );
}
export default Complains;
