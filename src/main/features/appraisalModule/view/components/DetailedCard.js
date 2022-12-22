import React, { useEffect, useState } from "react";
import { Tag, Image, Button, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
// import { cancelReward } from "../store/actions";
// import DetailTabs from "./detailTabs";
import {
  ItemContent,
  ItemContentCareers,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import CardProfileTopView from "../../../travel/view/ListView/CardProfileTopView";
import RemarksApproval from "../../../../sharedComponents/AppComponents/Approvals/view";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../../sharedComponents/AppComponents/Approvals/enums";
import { getAllAppraisalByIdAction } from "../../store/action";
import ShortCard from "./TeamAppraisal/shortAppraisalCardNew";
import DetailTabs from "./DetailedTabs";

function DetailCard(props) {
  const dispatch = useDispatch();
  const { detailLoader, appraisalDetail } = useSelector(
    (state) => state.appraisalModuleSlice
  );
  const [updatedStatus, setUpdatedStatus] = useState(null);

  useEffect(() => {
    props.id && dispatch(getAllAppraisalByIdAction(props.id));
  }, [props.id]);

  if (detailLoader || !appraisalDetail.id) return <Skeleton />;
  console.log(appraisalDetail);

  return (
    <>
      <ShortCard item={appraisalDetail && appraisalDetail} isList={false} />
      <DetailTabs
        questions={appraisalDetail.questions}
        tasks={appraisalDetail.tasks}
        RemarksApproval={
          <RemarksApproval
            module={ApprovalsModule.AppraisalApproval}
            status={appraisalDetail.status}
            onStatusChanged={(statusChanged) => {
              setUpdatedStatus(statusChanged);
              console.log(statusChanged);
            }}
            data={appraisalDetail.approvers}
            title={"Appraisal Approvers"}
          />
        }
      />
    </>
  );
}

export default DetailCard;
