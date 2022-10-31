import React from "react";
import ApplyJob from "../../../careers/view/PublicRoute/ApplyJob";
import { useSelector } from "react-redux";

const DetailedView = () => {
  const careerDetail = useSelector((state) => {
    return state.careerSlice.careerDetail;
  });
  // var isCareer = Object.keys(careerDetail).length;
  // console.log(isCareer);
  return (
    <>
      <div className="w-full">
        <ApplyJob isShowCopyBtn={true} width="100%" />
      </div>
    </>
  );
};

export default DetailedView;
