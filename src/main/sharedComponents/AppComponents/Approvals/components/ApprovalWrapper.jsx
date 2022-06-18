import { Collapse } from "antd";
import React from "react";
import Header from "../components/Header";
import ApprovalBody from "../components/ApprovalBody";
import { PlusSquareOutlined, ReloadOutlined } from "@ant-design/icons";
import RemarkFooter from "./RemarkFooter";
const { Panel } = Collapse;
function ApprovalWrapper({ title }) {
  return (
    <div className="approvalWrapper">
      <div className="approvalWrapper__header">
        <h6>{title}</h6>
        <ul className="list">
          <li className="list__item">
            <ReloadOutlined />
          </li>
          <li className="list__item">
            <PlusSquareOutlined />
          </li>
        </ul>
      </div>
      <Collapse
        className="approvalCollapse"
        expandIconPosition={"right"}
        onChange={() => {}}
      >
        <Panel
          extra={null}
          header={
            <Header
              type={"Approvers"}
              status={1}
              user={{
                name: "name",
                designation: "designation",
              }}
            ></Header>
          }
        >
          <ApprovalBody />
          <RemarkFooter />
        </Panel>
      </Collapse>
      <Collapse
        className="approvalCollapse"
        expandIconPosition={"right"}
        onChange={() => {}}
      >
        <Panel
          extra={null}
          header={
            <Header
              type={"Approvers"}
              status={1}
              user={{
                name: "name",
                designation: "designation",
              }}
            ></Header>
          }
        >
          <ApprovalBody />
          <RemarkFooter />
        </Panel>
      </Collapse>
    </div>
  );
}

export default ApprovalWrapper;
