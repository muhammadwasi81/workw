import React from "react";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { DatePicker, Form } from "antd";

const TaskComp = (props) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values, "values of task comp");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="appraisalFormBody drop-shadow">
        <div className="box flex justify-between items-center">
          <UserInfo
            avatarSrc="https://joeschmoe.io/api/v1/random"
            name={"Humayoun Shah"}
            Subline={
              <SublineDesigWithTime designation={"Default Designation"} />
            }
          />
        </div>
        <div className="inputBox flex justify-between items-center mt-4">
          Task
        </div>
        <Form
          name="CreateForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <div className="mt-4">
            <Form.Item name="startDate">
              <DatePicker
                size="large"
                className="w-full"
                placeholder="Start Date"
                onChange={(val) => props.startDate(val._d)}
              />
            </Form.Item>
          </div>
          <div className="mt-4">
            <Form.Item name="endDate">
              <DatePicker
                size="large"
                className="w-full"
                placeholder="End Date"
                onChange={(val) => props.endDate(val._d)}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default TaskComp;
