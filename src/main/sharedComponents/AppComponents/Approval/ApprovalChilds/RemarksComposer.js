import { Button, Col, Row } from "antd";
import React from "react";
import Avatar from "../../../Avatar/avatarOLD";
import { Input } from "antd";
import { SmileOutlined, FileImageOutlined } from "@ant-design/icons";

function RemarksComposer() {
  return (
    <Row>
      <Col xs={4} sm={3} md={3} lg={2} style={{ textAlign: "center" }}>
        <Avatar size={40} round width={"30px"} height={"30px"} />
      </Col>
      <Col xs={20} sm={21} md={21} lg={21}>
        <div className="remarks-composer-input">
          <Input placeholder="Write Your Remarks Here ..." bordered={false} />
          <div>
            <Button type="link">
              <SmileOutlined />
            </Button>
            <Button type="link">
              <FileImageOutlined />
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default RemarksComposer;
