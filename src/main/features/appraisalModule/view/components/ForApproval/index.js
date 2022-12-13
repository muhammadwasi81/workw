import React, { useState, useContext } from "react";
import {
  CardWrapperAppraisal,
  SingleItem,
} from "../../../../../sharedComponents/Card/CardStyle";
import { CaretRightOutlined } from "@ant-design/icons";
import { Avatar, Rate, Collapse } from "antd";
import Approval from "../../../../../sharedComponents/AppComponents/Approvals/view";
import { ApprovalsModule } from "../../../../../sharedComponents/AppComponents/Approvals/enums";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { appraisalDictionaryList } from "../../../localization/index";

const { Panel } = Collapse;
const ForApproval = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appraisalDictionary } = appraisalDictionaryList[userLanguage];
  const {
    appraisedBy,
    createdDate,
    STARTDATE,
    ENDDATE,
    PROMOTION,
    BONUS,
    INCREMENT,
    COMMENT,
    question,
    approvals,
  } = appraisalDictionary;
  const [loanStatus, setLoanStatus] = useState({});

  return (
    <>
      <CardWrapperAppraisal>
        <SingleItem>
          <div className="flex" style={{ gridColumnGap: "14px" }}>
            <Avatar size={64} src="https://joeschmoe.io/api/v1/random" />
            <span className="flex flex-col justify-center">
              <span className="font-bold " style={{ color: "#40a9ff" }}>
                Humayoun Shah
              </span>
              <span className="text-xs font-thin" style={{ color: "#757D86" }}>
                Software Engineer
              </span>
            </span>
            <div className="flex items-center">
              <Rate disabled defaultValue={2} style={{ fontSize: "12px" }} />
            </div>
          </div>
          <div className="flex justify-around mt-8">
            <div className="flex flex-col text-center">
              <span className="font-bold" style={{ color: "#707070" }}>
                {appraisedBy}
              </span>
              <span className="font-medium">Syed Bilal</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="font-bold" style={{ color: "#707070" }}>
                {createdDate}
              </span>
              <span className="font-medium">Oct 19, 2022</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="font-bold" style={{ color: "#707070" }}>
                {STARTDATE}
              </span>
              <span className="font-medium">Oct 19, 2022</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="font-bold" style={{ color: "#707070" }}>
                {ENDDATE}
              </span>
              <span className="font-medium">Oct 19, 2022</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="font-bold" style={{ color: "#707070" }}>
                {PROMOTION}
              </span>
              <span className="font-medium">Manager</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="font-bold" style={{ color: "#707070" }}>
                {BONUS}
              </span>
              <span className="font-medium">05%</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="font-bold" style={{ color: "#707070" }}>
                {INCREMENT}
              </span>
              <span className="font-medium">07%</span>
            </div>
          </div>
          <div className="mt-8">
            <span className="font-bold" style={{ color: "#40a9ff" }}>
              {COMMENT}
            </span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="mt-8">
            <Collapse
              bordered={false}
              // defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
              accordion={false}
            >
              <Panel
                header={question}
                key="1"
                className="site-collapse-custom-panel"
              >
                <p>Question 1</p>
              </Panel>
            </Collapse>
            <Collapse
              bordered={false}
              // defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
              accordion={false}
              style={{ marginTop: "1rem" }}
            >
              <Panel
                header="Task"
                key="2"
                className="site-collapse-custom-panel"
              >
                <p>Task 1</p>
              </Panel>
            </Collapse>
          </div>
          <div className="mt-8 mb-8 w-ful">
            <Approval
              title={approvals}
              module={ApprovalsModule.LoanApproval}
              data={[]}
              onStatusChanged={(status) => {
                setLoanStatus((prev) => {
                  return { ...prev, ...status };
                });
              }}
              status={1}
            />
          </div>
        </SingleItem>
      </CardWrapperAppraisal>
    </>
  );
};

export default ForApproval;
