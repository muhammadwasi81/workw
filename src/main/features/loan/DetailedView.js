import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { LoanDictionary } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
//import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../sharedComponents/Tag/StatusTag";
import DefaultAttachment from "../../../content/NewContent/complain/DefaultAttachment.svg";
import RemarksApproval from "../../sharedComponents/AppComponents/Approvals/view";
import Avatar from "../../sharedComponents/Avatar/avatar";
import moment from "moment";

import Approval from "../../sharedComponents/AppComponents/Approvals/view";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../sharedComponents/AppComponents/Approvals/enums";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../sharedComponents/Card/CardStyle";
import ListItem from "./ListItem";
import { useDispatch } from "react-redux";
import { GetLoanById } from "./store/actions";

function DetailedView(props) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { loanDictionaryList, Direction } = LoanDictionary[userLanguage];
  const [loanStatus, setLoanStatus] = useState({});
  const [status, setStatus] = useState();
  const { loanDetail } = useSelector((state) => state.loanSlice);
  const {
    referenceNo,
    user,
    description,
    deductionPerMonth,
    amount,
    deadline,
    approvers,
  } = loanDetail || {};

  useEffect(() => {
    if (props.id) {
      dispatch(GetLoanById(props.id));
    }
  }, [props.id]);

  const isTablet = useMediaQuery({ maxWidth: 800 });

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

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          {/* {complainDictionary.complain} */}
          {"Loan"}
        </h1>
      }
      width="768"
      placement={
        (Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")
      }
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer drawerSecondary"
      style={{
        cursor: "pointer",
      }}
    >
      {!Object.keys(loanDetail).length ? (
        <Skeleton avatar paragraph={{ rows: 6 }} />
      ) : (
        <div className="loanDetail">
          <ListItem item={loanDetail} />
          <Approval
            title={loanDictionaryList.approvers}
            module={ApprovalsModule.ExpenseApproval}
            data={loanDetail.approvers}
            onStatusChanged={(status) => {
              setLoanStatus((prev) => {
                return { ...prev, ...status };
              });
            }}
            status={loanDetail.approverStatus}
          />
        </div>
      )}
    </Drawer>
  );
}

export default DetailedView;
