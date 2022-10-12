import React, { useContext, useEffect, useState } from "react";
import { Skeleton, Tag } from "antd";
import { useSelector } from "react-redux";
// import { LoanDictionary } from "./localization/index";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
// import Approval from "../../sharedComponents/AppComponents/Approvals/view";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";
import { getFormById } from "../store/actions";
import moment from "moment";

const FromDetail = (props) => {
  const { id } = props;
  const { formDetail } = useSelector((state) => state.formSlice);
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  // const { loanDictionaryList, Direction } = LoanDictionary[userLanguage];
  const [loanStatus, setLoanStatus] = useState({});
  // const [status, setStatus] = useState();
  useEffect(() => {
    if (id) {
      dispatch(getFormById(id));
    }
  }, [id]);
  console.log("formDetail", formDetail);
  const {
    creator,
    createDate,
    description,
    subject,
    referenceNo,
    status,
    approvers,
  } = formDetail;
  // useEffect(() => {
  //   if (Object.keys(loanStatus).length !== 0) {
  //     const loanStatusArr = Object.keys(loanStatus).map((k) => {
  //       return { [k]: loanStatus[k] };
  //     });

  //     const updateList = [...loanStatusArr].reduce((acc, val, index) => {
  //       const ac = Object?.values(acc)?.toString();
  //       const va = Object?.values(val)?.toString();
  //       if (ac === va) return va;
  //       else return ApprovalStatus.InProcess;
  //     });
  //     setStatus(updateList);
  //   }
  // }, [loanStatus]);

  return (
    <div>
      {!Object.keys(formDetail).length ? (
        <Skeleton avatar paragraph={{ rows: 6 }} />
      ) : (
        <SingleItem>
          <ItemHeader>
            <div className="left">
              <UserInfo
                avatarSrc={creator.image}
                name={creator.name}
                Subline={
                  <SublineDesigWithTime
                    designation={creator.designation ? creator.designation : ""}
                    time={moment(createDate).fromNow()}
                  />
                }
              />
            </div>
            <div className="right">
              <Tag className="IdTag">{referenceNo}</Tag>
              <StatusTag status={status}></StatusTag>
            </div>
          </ItemHeader>
          <div className="title">
            {subject.length > 0 ? <p>{subject}</p> : null}
          </div>
          <div className="description w-full pt-3 pb-5 h-[100px]">
            {description.length > 0 ? (
              <p>{description}</p>
            ) : (
              <p> No description </p>
            )}
          </div>
          <RemarksApproval
            data={approvers}
            title="Approvals"
            module={ApprovalsModule.FormApproval}
            onStatusChanged={() => {}}
          />
        </SingleItem>
      )}
    </div>
  );
};

export default FromDetail;
