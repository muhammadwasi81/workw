import React from "react";
import "../../style.css";
import AppraisalForm from "./appraisalForm";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { DatePicker, Form } from "antd";

function SubmitAppraisalBody() {
  return (
    <>
      <div className="w-full flex gap-x-5 ">
        <div className="w-5/12">
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
        </div>
        <div className="w-7/12">
          <AppraisalForm />
        </div>
      </div>
    </>
  );
}

export default SubmitAppraisalBody;
