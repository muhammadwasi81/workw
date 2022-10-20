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

function Rewards() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.RewardsTable;

  const {
    team: { rewardsdetails },
    success,
  } = useSelector((state) => state.teamSlice);

  useEffect(() => {
    dispatch(getRewardsAction({}));
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
      title: labels.Name,
      dataIndex: "name",
      key: "name",
    },
    {
      title: labels.Date,
      dataIndex: "date",
      key: "date",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
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
