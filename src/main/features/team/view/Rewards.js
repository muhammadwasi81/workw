import React, { useEffect, useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { getRewardsAction } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";

import moment from "moment";

function Rewards({ userId = null }) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.RewardsTable;
  const { id } = useParams();

  const {
    team: { rewardsdetails },
    success,
  } = useSelector((state) => state.teamSlice);

  let myId = userId ? userId : id;

  useEffect(() => {
    dispatch(getRewardsAction(myId));
  }, []);

  const columns = [
    {
      title: labels.ReferenceNo,
      dataIndex: "referenceNo",
      key: "referenceNo",
      className: "referenceNo",
    },
    {
      title: labels.Date,
      dataIndex: "date",
      key: "date",
      className: "dateTime",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
    },
    {
      title: labels.Name,
      dataIndex: "name",
      key: "name",
      className: "name",
    },
    {
      title: labels.Category,
      dataIndex: "category",
      key: "category",
      className: "category",
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
        className="custom_table"
        dataSource={rewardsdetails}
      />
    </>
  );
}
export default Rewards;
