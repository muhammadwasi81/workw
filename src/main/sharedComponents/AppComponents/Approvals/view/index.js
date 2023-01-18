import { Segmented } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import "../style/index.css";
import ApprovalWrapper from "../components/ApprovalWrapper";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ApprovalDictionary } from "../localization";
import { ApprovalStatus } from "../enums";
function Approval({
  title,
  data,
  module,
  approverType,
  onStatusChanged,
  status,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = ApprovalDictionary[userLanguage];
  const [statusList, setStatusList] = useState([]);
  const [updateStatus, setUpdateStatus] = useState();
  const handleStatusList = (status) => {
    setStatusList((preValue) => [...preValue, status]);
  };

  const createNewStatus = (changedStatus) => {
    const newStatusList = statusList.map((item) => {
      if (item.id === changedStatus.id) return changedStatus;
      else return item;
    });
    const updateList = newStatusList.reduce((acc, val) => {
      if (acc.status === val.status) return val.status;
      else return ApprovalStatus.InProcess;
    });

    setUpdateStatus(updateList.status);
  };
  useEffect(() => {
    if (status) onStatusChanged({ [title]: status });
  }, [status]);

  useEffect(() => {
    if (updateStatus) onStatusChanged({ [title]: updateStatus });
  }, [updateStatus]);

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

      <div className="approval__body !p-0">
        <ApprovalWrapper
          title={title}
          data={data}
          module={module}
          onListStatus={handleStatusList}
          approverType={approverType}
          onStatusChange={(status) => {
            createNewStatus(status);
          }}
        />
      </div>
    </div>
  );
}

export default Approval;
