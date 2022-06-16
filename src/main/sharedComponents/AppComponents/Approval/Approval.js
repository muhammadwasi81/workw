import React, { Fragment, useState, useContext } from "react";
import { Button, Collapse, Divider, Typography, Modal } from "antd";
import "./Approval.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Header from "./ApprovalChilds/Header";
import ApprovalBody from "./ApprovalChilds/ApprovalBody";

const { Panel } = Collapse;
const { Title } = Typography;

function Approval(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { warnings } = dictionaryList[userLanguage];

  const text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;

  function callback(key) {
    console.log(key);
  }

  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <Divider className="top-divider" style={{ marginBottom: "2px" }} />
      <div className="approval-top-bar">
        <Title level={5}>{warnings.approvers}</Title>
        <Button type="link" onClick={() => setVisible(true)}>
          <PlusCircleOutlined style={{ fontSize: "21px", color: "#1A5669" }} />
        </Button>
        <Modal
          title="Add New Approvar"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
        >
          <p>Add Approver From will come here</p>
        </Modal>
      </div>
      {[1, 2, 3].map((val) => {
        return (
          <Collapse
            defaultActiveKey={["val"]}
            className="approval-collapse ApprovalCollapse"
            style={{
              width: "100% !important",
              backgroundColor: "white",
              borderRadius: "4px",
              borderBottom: "1px solid #d9d9d9",
              padding: "0px !important",
            }}
            expandIconPosition={"right"}
            onChange={callback}
          >
            <Panel
              extra={null}
              header={
                <Header
                  username={props.username}
                  userdesignation={props.userdesignation}
                  status={props.status}
                />
              }
              key="1"
            >
              <ApprovalBody />
            </Panel>
          </Collapse>
        );
      })}
    </Fragment>
  );
}

export default Approval;
