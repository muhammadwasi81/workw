import React from "react";

import { useSelector } from "react-redux";

const TabElement = () => {
  const { careerApplicants } = useSelector((state) => state.careerSlice);

  return (
    <>
      {careerApplicants.map((item, index) => {
        return (
          <div
            className="bg-white flex justify-around rounded-lg h-9 items-center font-bold"
            key={index}
          >
            <div>{`${item.firstName} ${item.lastName}`}</div>
            <div>{item.email ? item.email : "-"}</div>
            <div>{item.phoneNumber ? item.phoneNumber : "-"}</div>
            <span>Offer Sent</span>
          </div>
        );
      })}
    </>
  );
};

export default TabElement;
