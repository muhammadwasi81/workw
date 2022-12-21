import React, { useEffect, useState } from "react";
import "../../style.css";
import AppraisalForm from "./appraisalForm";
import TaskComp from "./taskComp";
import { Form } from "antd";

function SubmitAppraisalBody(props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");
  const [formDisabled, setComponentDisabled] = useState(true);

  useEffect(() => {
    console.log("useEffect props data send");
  }, [props.dataSend]);

  return (
    <>
      <div className="w-full flex gap-x-5 ">
        <div className="w-[50%]">
          <TaskComp
            startDate={(val) => setStartDate(val)}
            endDate={(val) => setEndDate(val)}
            userId={(val) => setUserId(val)}
            setDisable={(val) => setComponentDisabled(val)}
          />
        </div>
        <div className="w-[50%]">
          <AppraisalForm
            submit={props.submit}
            dataSend={(val) => props.dataSend(val, startDate, endDate, userId)}
            disabled={formDisabled}
            userId={userId}
          />
        </div>
      </div>
    </>
  );
}

export default SubmitAppraisalBody;
