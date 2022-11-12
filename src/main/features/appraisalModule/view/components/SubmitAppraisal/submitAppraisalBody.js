import React, { useState } from "react";
import "../../style.css";
import AppraisalForm from "./appraisalForm";
import TaskComp from "./taskComp";
import { Form } from "antd";

function SubmitAppraisalBody() {
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // console.log("props in create form", props);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form.Provider
        name="CreateForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <div className="w-full flex gap-x-5 ">
          <div className="w-5/12">
            <TaskComp
              startDate={(val) => setStartDate(val)}
              endDate={(val) => setEndDate(val)}
            />
          </div>
          <div className="w-7/12">
            <AppraisalForm />
          </div>
        </div>
      </Form.Provider>
    </>
  );
}

export default SubmitAppraisalBody;
