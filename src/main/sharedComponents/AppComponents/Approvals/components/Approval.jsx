import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import { saveApprovalsRemarks } from "../services";
import ApprovalBody from "./ApprovalBody";
import Header from "./Header";
import RemarkFooter from "./RemarkComposer";
import { ApproverType } from "../enums/index";
const { Panel } = Collapse;
function Approval({
  approver,
  initialRemarks,
  status,
  approverId,
  module,
  approverType = ApproverType.User,
}) {
  const { businessId, designation, name, image, type } = approver;
  const [files, setFiles] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [remarksText, setremarksText] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
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
  const handleRemarksText = (value) => {
    setremarksText(value);
  };
  const handleCurrentStatus = (status) => {
    setCurrentStatus(status);
    createRemark();
  };
  const createRemark = async () => {
    const remarks = {
      approvalId: approverId,
      remark: remarksText,
      module,
      status: 1,
      type: approverType,
      branchId: defaultUiid,
      businessId: defaultUiid,
      attachments: [...files].map((file) => {
        return { id: defaultUiid, file };
      }),
    };
    const remark = await saveApprovalsRemarks(remarks);
    if (remark) setRemarks((prevValue) => [...prevValue, remark]);
  };
  useEffect(() => {
    setRemarks([...initialRemarks]);
  }, []);

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
          onCurrentStatus={handleCurrentStatus}
          onRemarksText={handleRemarksText}
          files={files}
          onFile={handleFile}
          onDelete={handleDelete}
          approverId={approverId}
          status={status}
        />
      </Panel>
    </Collapse>
  );
}

export default Approval;
