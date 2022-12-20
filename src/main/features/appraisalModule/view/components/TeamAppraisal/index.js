import React from "react";
import { Skeleton } from "antd";
import { useSelector } from "react-redux";
import { CardWrapper } from "../../../../../sharedComponents/Card/CardStyle";
import { NoDataFound } from "../../../../../sharedComponents/NoDataIcon/index.js";
// import ShortAppraisalCard from "./shortAppraisalCard";
import ShortCard from "./shortAppraisalCardNew";

const Index = () => {
  const { appraisals, loader } = useSelector(
    (state) => state.appraisalModuleSlice
  );
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
      {appraisals ? (
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
