import React from "react";
import { Skeleton } from "antd";
import { useSelector } from "react-redux";
import { CardWrapper } from "../../sharedComponents/Card/CardStyle";
import { NoDataFound } from "../../sharedComponents/NoDataIcon/index.js";
// import ShortAppraisalCard from "./shortAppraisalCard";
import ShortCard from "./shortCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPreviousAppraisalAction } from "../appraisalModule/store/action";
import { useParams } from "react-router-dom";

const Index = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { previousAppraisals, loader } = useSelector(
    (state) => state.appraisalModuleSlice
  );
  useEffect(() => {
    //TODO: dispatch here
    dispatch(getAllPreviousAppraisalAction(id));
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
      {previousAppraisals.length ? (
        <CardWrapper>
          {previousAppraisals.map((item) => (
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
