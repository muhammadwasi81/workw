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
import { getAllAppraisalByIdAction } from "../../store/action";
import ShortCard from "./TeamAppraisal/shortAppraisalCardNew";

function DetailCard(props) {
  const dispatch = useDispatch();
  const { detailLoader, appraisalDetail } = useSelector(
    (state) => state.appraisalModuleSlice
  );

  console.log(detailLoader, appraisalDetail);

  useEffect(() => {
    props.id && dispatch(getAllAppraisalByIdAction(props.id));
  }, [props.id]);

  if (detailLoader) return <Skeleton />;

  return (
    <>
      {/* <ShortCard item={appraisalDetail && appraisalDetail} /> */}
      dasdsadas
    </>
  );
}

export default DetailCard;
