import React, {useState } from 'react';
import { ApprovalStatus } from "../enums";
import { Popconfirm } from "antd";


function RemarkStatus({ onCurrentStatus }) {
  const [open, setOpen] = useState(false);

  const Cancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
    <ul className="list">
      <div
        className="list__item"
        onClick={() => onCurrentStatus(ApprovalStatus.InProcess)}
      >
        In Process
      </div>
 
      <Popconfirm title="Sure to Approve ?"  
        onConfirm={(e) => onCurrentStatus(ApprovalStatus.Approved)} 
       onCancel={Cancel}
      >
        <div className="list__item">Approve</div>
     </Popconfirm>


    <Popconfirm title="Sure to Decline ?"  
      onConfirm={(e) => onCurrentStatus(ApprovalStatus.Declined)} 
      onCancel={Cancel}
      >
      <div className="list__item">Decline</div>
      </Popconfirm>


      <div
        className="list__item"
        onClick={() => onCurrentStatus(ApprovalStatus.Hold)}
      >
        Hold
      </div>
    </ul>
</>
  );
}

export default RemarkStatus;
