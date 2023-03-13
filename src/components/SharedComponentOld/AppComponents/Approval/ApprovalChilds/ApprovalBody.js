import { Avatar, Col, Divider, Row } from 'antd';
import React from 'react';
import RemarksComposer from './RemarksComposer';
import RemarksDisplay from './RemarksDisplay';

function ApprovalBody() {
  return (
    <div className="approval-body">
      <Divider className="top-divider" />

      <Row>
        <Col
          xs={4}
          sm={3}
          md={3}
          lg={2}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Avatar size={40} src="https://joeschmoe.io/api/v1/random" />
        </Col>
        <Col xs={20} sm={21} md={21} lg={21}>
          <RemarksDisplay />
        </Col>
      </Row>

      <Divider />

      <RemarksComposer />
    </div>
  );
}

export default ApprovalBody;
