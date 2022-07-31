import React from "react";
import { PlusSquareOutlined, ReloadOutlined } from "@ant-design/icons";
import Approval from "./Approval";

function ApprovalWrapper({ title, data, module, approverType }) {
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

      {data?.map(
        (
          { approver, remarks: initialRemarks, status, approverId, createBy },
          index
        ) => {
          return (
            <Approval
              module={module}
              approverType={approverType}
              key={index}
              approver={approver}
              initialRemarks={initialRemarks}
              status={status}
              approverId={approverId}
              createBy={createBy}
            />
          );
        }
      )}
    </div>
  );
}

export default ApprovalWrapper;
