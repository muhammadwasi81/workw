import { Segmented } from "antd";
import React from "react";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import "../style/index.css";
import ApprovalWrapper from "../components/ApprovalWrapper";

function Approval({ title, data, module, approverType }) {
  return (
    <div className="approval">
      <div className="approval__header">
        {/* <Segmented
          onChange={(value) => {}}
          options={[
            {
              icon: <BarsOutlined />,
            },
            {
              icon: <AppstoreOutlined />,
            },
          ]}
        /> */}
      </div>
      <div className="approval__body">
        <ApprovalWrapper
          title={title}
          data={data}
          module={module}
          approverType={approverType}
        />
      </div>
    </div>
  );
}

export default Approval;
