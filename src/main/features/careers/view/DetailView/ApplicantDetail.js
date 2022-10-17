import React from "react";

const ApplicantDetail = (props) => {
  console.log(props);
  const { firstName, lastName, email, expectedSalary, experience } = props.data;
  return (
    <>
      <div className="flex flex-col">
        <span>{firstName}</span>
        <span>{lastName}</span>
        <span>{email}</span>
        <span>Expected Salary: {expectedSalary} </span>
        <span>experience: {experience} </span>
      </div>
    </>
  );
};

export default ApplicantDetail;
