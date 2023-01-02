import { Button, Radio } from "antd";
import React from "react";
import WhiteCard from "../../../UI/WhiteCard";
import "./style.css";

const QuestionWithoutImage = () => {
  return (
    <div className="question-box flex flex-col">
      <span className="text-xl">Question 9/10</span>
      <div className="flex self-center">
        <img
          src={
            "https://58.65.211.234:4436/Resources\\0ab5f9c0-f948-4c40-8dad-c58ba99fb765\\Images\\f41b2b3c-e18e-4d78-b594-74c3b01cbf25.png"
          }
          className="w-[300px] h-[300px] flex self-center"
        />
      </div>

      <span className=" text-base font-black mt-6">
        In 2017, which player became the leading run scorer of all tie in
        women's ODI cricket
      </span>
      {/**will map here options */}
      <Radio.Group>
        <div className="inputBox mt-4">
          <Radio value="pear">
            {" "}
            work closely with a supervisor to learn more aout a job{" "}
          </Radio>
        </div>
        <div className="inputBox mt-4">
          <Radio value="a">
            {" "}
            work closely with a supervisor to learn more aout a job{" "}
          </Radio>
        </div>
        <div className="inputBox mt-4">
          <Radio value="d">
            {" "}
            work closely with a supervisor to learn more aout a job{" "}
          </Radio>
        </div>
        <div className="inputBox mt-4">
          <Radio value="g">
            {" "}
            work closely with a supervisor to learn more aout a job{" "}
          </Radio>
        </div>
      </Radio.Group>
      <Button className="Formbtn w-[5rem] mt-4 flex justify-center self-end">
        Next
      </Button>
    </div>
  );
};

export default QuestionWithoutImage;
