import React from "react";
import { Skeleton } from "antd";
import { CardWrapper } from "../../../../../sharedComponents/Card/CardStyle";
import ShortAppraisalCard from "./shortAppraisalCard";

const Index = () => {
  return (
    <>
      <CardWrapper>
        {/* {[...Array(15)].map((item) => (
          <Skeleton key={item} avatar paragraph={{ rows: 6 }} />
        ))} */}
        {[...Array(15)].map((item) => (
          <ShortAppraisalCard />
        ))}
      </CardWrapper>
    </>
  );
};

export default Index;
