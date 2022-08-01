import { Segmented } from "antd";
import React, { useContext } from "react";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import "../style/index.css";
import ApprovalWrapper from "../components/ApprovalWrapper";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ApprovalDictionary } from "../localization";

function Approval({ title, data, module, approverType }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = ApprovalDictionary[userLanguage];

  return (
    <div className="approval" style={{ direction: Direction }}>
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
