import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ApprovalBody from "../components/ApprovalBody";
import { PlusSquareOutlined, ReloadOutlined } from "@ant-design/icons";
import RemarkFooter from "./RemarkFooter";
const { Panel } = Collapse;
function ApprovalWrapper({ title, data }) {
  const [files, setFiles] = useState([]);
  const handleFile = (e) => {
    if (e.target.files.length > 1) {
      setFiles((prevValue) => [...prevValue, ...e.target.files]);
    } else {
      setFiles((prevValue) => [...prevValue, e.target.files[0]]);
    }
  };
  const handleDelete = (deleteFile) => {
    const allFiles = files.filter((file, index) => index !== deleteFile);
    setFiles(allFiles);
  };
  useEffect(() => {
    setFiles([]);
  }, [data]);

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

      {data.map(({ approver, remarks, status }) => {
        if (approver) {
          const { businessId, designation, name, image, type } = approver;
          return (
            <Collapse
              className="approvalCollapse"
              expandIconPosition={"right"}
              key={businessId}
            >
              <Panel
                extra={null}
                header={
                  <Header
                    status={status}
                    type={type}
                    user={{
                      name,
                      designation,
                      image,
                    }}
                  ></Header>
                }
              >
                <ApprovalBody remarks={remarks} />
                <RemarkFooter
                  files={files}
                  onFile={handleFile}
                  onDelete={handleDelete}
                />
              </Panel>
            </Collapse>
          );
        }
      })}
    </div>
  );
}

export default ApprovalWrapper;
