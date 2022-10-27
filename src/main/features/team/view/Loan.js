import React, { useEffect, useContext } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { getAllLoanAction } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { teamDictionaryList } from "../localization/index";
import moment from "moment";
import { useParams } from "react-router-dom";

function Loan() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.LoanTable;
  const {
    team: { loandetails },
    success,
  } = useSelector((state) => state.teamSlice);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllLoanAction("D3202659-8910-410F-93D5-2C7D8B39A2D5"));
  }, []);
  const columns = [
    {
      title: labels.ReferenceNo,
      dataIndex: "referenceNo",
      key: "referenceNo",
      sort: true,
    },

    {
      title: labels.Status,
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
    {
      title: labels.Amount,
      dataIndex: "amount",
      key: "amount",
      sort: true,
    },
    {
      title: labels.DeductionPerMonth,
      dataIndex: "deductionPerMonth",
      key: "deductionPerMonth",
      sort: true,
    },
    {
      title: labels.Deadline,
      dataIndex: "deadline",
      render: (deadline) => moment(deadline).format("DD MMM YYYY"),
      key: "deadline",
      sort: true,
    },
    {
      title: labels.Date,
      dataIndex: "date",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      key: "date",
      sort: true,
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        className="custom_table"
        dataSource={loandetails}
      />
    </>
  );
}
export default Loan;
