import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import { saveApprovalsRemarks } from "../services";
import ApprovalBody from "./ApprovalBody";
import Header from "./Header";
import RemarkFooter from "./RemarkComposer";
import { ApprovalStatus, ApproverType } from "../enums/index";
const { Panel } = Collapse;
function Approval({
  approver,
  initialRemarks,
  status = ApprovalStatus.InProcess,
  approverId,
  module,
  createBy,
  onStatusChange,
  id,
  approverType = ApproverType.User,
}) {
  const { businessId, designation, name, image, type } = approver;
  const [files, setFiles] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [remarksText, setremarksText] = useState("");
  const [currentStatus, setCurrentStatus] = useState(status);

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
  const handleRemarksText = (value, event) => {
    setremarksText(value);
    if (event?.keyCode === 13) createRemark(ApprovalStatus.InProcess);
  };
  const handleCurrentStatus = (status) => {
    setCurrentStatus(status);
    createRemark(status);
  };
  const createRemark = async (status) => {
    const remarks = {
      approvalId: id,
      remark: remarksText,
      module,
      status,
      type: approverType,
      attachments: [...files].map((file) => {
        return { id: defaultUiid, file };
      }),
    };
    setremarksText("");

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
            status={currentStatus}
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
          approverId={approverId}
          onCurrentStatus={handleCurrentStatus}
          onRemarksText={handleRemarksText}
          files={files}
          onFile={handleFile}
          onDelete={handleDelete}
          createBy={createBy}
          status={currentStatus}
          value={remarksText}
        />
      </Panel>
    </Collapse>
  );
}

export default Approval;
