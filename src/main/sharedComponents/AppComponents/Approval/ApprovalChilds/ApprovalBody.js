import { Divider } from "antd";
import React from "react";
import Avatar from "../../../Avatar/avatarOLD";
import RemarksComposer from "./RemarksComposer";
import RemarksDisplay from "./RemarksDisplay";

function ApprovalBody() {
  return (
    <div className="approval-body">
      <Divider className="top-divider" />
      <div className="approval-body-inner">
        <Avatar size={40} round width={"30px"} height={"30px"} />
        <RemarksDisplay />
      </div>

      <Divider />

      <RemarksComposer />
    </div>
  );
}

export default ApprovalBody;
