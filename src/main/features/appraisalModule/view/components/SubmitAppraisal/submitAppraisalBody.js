import React, { useState } from "react";
import "../../style.css";
import AppraisalForm from "./appraisalForm";
import TaskComp from "./taskComp";
import { Form } from "antd";

function SubmitAppraisalBody(props) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <>
      <div className="w-full flex gap-x-5 ">
        <div className="w-[50%]">
          <TaskComp
            startDate={(val) => setStartDate(val)}
            endDate={(val) => setEndDate(val)}
          />
        </div>
        <div className="w-[50%]">
          <AppraisalForm
            submit={props.submit}
            dataSend={(val) => props.dataSend(val)}
          />
        </div>
      </div>
    </>
  );
}

export default SubmitAppraisalBody;
