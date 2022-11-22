import React from "react";
import ApplyJob from "../../../careers/view/PublicRoute/ApplyJob";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";

const DetailedView = () => {
  // const careerDetail = useSelector((state) => {
  //   return state.careerSlice.careerDetail;
  // });
  const { loader } = useSelector((state) => state.careerSlice);
  const careers = useSelector((state) => {
    return state.careerSlice.items;
  });

  // var isCareer = Object.keys(careerDetail).length;
  // console.log(isCareer);
  return (
    <>
      <div className="w-full" style={{ marginTop: "5px" }}>
        {loader ? (
          [...Array(1)].map((item) => (
            <Skeleton
              className="p-4"
              key={item}
              avatar
              paragraph={{ rows: 8 }}
            />
          ))
        ) : (
          <>
            {careers.length >= 1 ? (
              <ApplyJob isShowCopyBtn={true} width="100%" />
            ) : (
              <div className="p-20">
                <NoDataFound />
              </div>
            )}
          </>
        )}
        {/* <ApplyJob isShowCopyBtn={true} width="100%" /> */}
      </div>
    </>
  );
};

export default DetailedView;
