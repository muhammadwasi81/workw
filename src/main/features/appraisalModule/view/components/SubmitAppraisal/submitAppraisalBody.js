import React from "react";
import "../../style.css";
import AppraisalForm from "./appraisalForm";
import TaskComp from "./taskComp";

function SubmitAppraisalBody() {
  return (
    <>
      <div className="w-full flex gap-x-5 ">
        <div className="w-5/12">
          <TaskComp />
        </div>
        <div className="w-7/12">
          <AppraisalForm />
        </div>
      </div>
    </>
  );
}

export default SubmitAppraisalBody;
