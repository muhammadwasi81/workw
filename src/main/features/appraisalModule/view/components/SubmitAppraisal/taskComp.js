import React from "react";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { DatePicker, Form } from "antd";

const TaskComp = () => {
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
        <div className="mt-4">
          <Form.Item name="startDate">
            <DatePicker
              size="large"
              className="w-full"
              placeholder="Start Date"
            />
          </Form.Item>
        </div>
        <div className="mt-4">
          <Form.Item name="endDate">
            <DatePicker
              size="large"
              className="w-full"
              placeholder="End Date"
            />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default TaskComp;
