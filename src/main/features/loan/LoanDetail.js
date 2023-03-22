import React, { useContext, useEffect, useState } from "react";
import { Skeleton } from "antd";
import { useSelector } from "react-redux";
import { LoanDictionary } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import Approval from "../../sharedComponents/AppComponents/Approvals/view";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../sharedComponents/AppComponents/Approvals/enums";
import ListItem from "./ListItem";
import { useDispatch } from "react-redux";
import { GetLoanById } from "./store/actions";

function LoanDetail(props) {
  const { id } = props;
  const { loanDetail, loadingData } = useSelector((state) => state.loanSlice);
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { loanDictionaryList, Direction } = LoanDictionary[userLanguage];
  const [loanStatus, setLoanStatus] = useState({});
  const [status, setStatus] = useState();
  useEffect(() => {
    if (id) {
      dispatch(GetLoanById(id));
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(loanStatus).length !== 0) {
      const loanStatusArr = Object.keys(loanStatus).map((k) => {
        return { [k]: loanStatus[k] };
      });

      const updateList = [...loanStatusArr].reduce((acc, val, index) => {
        const ac = Object?.values(acc)?.toString();
        const va = Object?.values(val)?.toString();
        if (ac === va) return va;
        else return ApprovalStatus.InProcess;
      });
      setStatus(updateList);
    }
  }, [loanStatus]);

  if (loadingData) return <Skeleton />;

  return (
    <div>
      {!Object.keys(loanDetail).length ? (
        <Skeleton avatar paragraph={{ rows: 6 }} />
      ) : (
        <div className="loanDetail">
          <ListItem item={loanDetail} />
          <Approval
            title={loanDictionaryList.approvers}
            module={ApprovalsModule.LoanApproval}
            data={loanDetail.approvers}
            reference={loanDetail.id}
            onStatusChanged={(status) => {
              setLoanStatus((prev) => {
                return { ...prev, ...status };
              });
            }}
            status={loanDetail.approverStatus}
          />
        </div>
      )}
    </div>
  );
}

export default LoanDetail;
