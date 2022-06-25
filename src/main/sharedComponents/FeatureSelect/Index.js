import React from "react";
import { Form, Switch } from "antd";
import feedIcon from "../../../content/NewContent/featureSelect/feedIcon.svg";
import "./style.css";

function FeatureSelect() {
  const FeaturesEnum = [
    {
      Feed: 1,
      Mailbox: 2,
      Messenger: 3,
      Group: 4,
      Project: 5,
      Task: 6,
      WorkBoard: 7,
      Lead: 8,
      Expense: 9,
      Schedule: 10,
      Travel: 11,
      Document: 12,
      ELearning: 13,
      Asset: 14,
      CustomApproval: 15,
      Employee: 16,
      Administration: 17,
      Appraisal: 18,
      Department: 19,
      Leave: 20,
      Loan: 21,
      Holiday: 22,
      Career: 23,
      AudioCalling: 24,
      VideoCalling: 25,
      Attendance: 27,
      Requisition: 28,
      MileBoard: 29,
      MileGrid: 30,
      MilePad: 31,
      Payroll: 32,
      Rewards: 33,
      Complains: 34,
      Warnings: 35,
      Bonus: 36,
      Promotion: 37,
      OrganizationalChart: 38,
      MyTeam: 39,
      Grade: 40,
    },
  ];

  const data = [
    {
      name: "News Feed",
      icon: feedIcon,
      description: "Lorem Ipsum is simply dummy text of the printing and",
      isChecked: true,
    },
    {
      name: "Schedule",
      icon: feedIcon,
      description: "Lorem Ipsum is simply dummy text of the printing and",
    },
    {
      name: "Work Board",
      icon: feedIcon,
      description: "Lorem Ipsum is simply dummy text of the printing and",
    },
    {
      name: "Document",
      icon: feedIcon,
      description: "Lorem Ipsum is simply dummy text of the printing and",
    },
    {
      name: "Task",
      icon: feedIcon,
      description: "Lorem Ipsum is simply dummy text of the printing and",
    },
    {
      name: "Expenses",
      icon: feedIcon,
      description: "Lorem Ipsum is simply dummy text of the printing and",
    },
    {
      name: "Travel",
      icon: feedIcon,
      description: "Lorem Ipsum is simply dummy text of the printing and",
    },
  ];

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <>
      {data.map((item) => {
        return (
          <Form.Item>
            <div className="FeatureSelect flex justify-between radioSelected">
              <div>
                <div className="flex">
                  <div className="imageBox">
                    <img src={item.icon} />
                  </div>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
              <div className="radioBtn">
                <Switch defaultChecked checked={item.isChecked} onChange={onChange} />
              </div>
            </div>
          </Form.Item>
        );
      })}
    </>
  );
}

export default FeatureSelect;
