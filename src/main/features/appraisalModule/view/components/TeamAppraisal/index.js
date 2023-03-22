import React from "react";
import { Skeleton } from "antd";
import { useSelector } from "react-redux";
import { CardWrapper } from "../../../../../sharedComponents/Card/CardStyle";
import { NoDataFound } from "../../../../../sharedComponents/NoDataIcon/index.js";
// import ShortAppraisalCard from "./shortAppraisalCard";
import ShortCard from "./shortAppraisalCardNew";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllAppraisalByMeAction } from "../../../store/action";

const Index = ({ userId }) => {
  const dispatch = useDispatch();
  const { appraisals, loader } = useSelector(
    (state) => state.appraisalModuleSlice
  );
  useEffect(() => {
    if (userId) {
      //TODO: dispatch here
      dispatch(getAllAppraisalByMeAction(userId));
    }
  }, []);
  if (loader)
    return (
      <CardWrapper>
        {[...Array(15)].map((item) => (
          <Skeleton avatar paragraph={{ rows: 6 }} />
        ))}
      </CardWrapper>
    );
  return (
    <>
      {appraisals.length ? (
        <CardWrapper>
          {appraisals.map((item) => (
            <ShortCard item={item} isList={true} />
          ))}
        </CardWrapper>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default Index;
