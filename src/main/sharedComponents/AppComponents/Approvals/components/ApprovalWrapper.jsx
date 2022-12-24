import React, { useState } from "react";
import { PlusSquareOutlined, ReloadOutlined } from "@ant-design/icons";
import Approval from "./Approval";
import { useDispatch } from "react-redux";
import '../../../../features/defaultApprovers/styles.css'
import AddAprrovalModal from "./AddAprrovalModal";

function ApprovalWrapper({ title, data, module, approverType, onStatusChange, onListStatus, }) {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOk = () => {
        setIsModalOpen(false);
      };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

  return (
    <>
      <div className="approvalWrapper">
        <div className="!p-0 approvalWrapper__header">
          <h6 className="">{title}</h6>
          <ul className="list">
            <li className="list__item">
              <ReloadOutlined />
            </li>
            <li className="list__item">
              <PlusSquareOutlined
                onClick={() => { setIsModalOpen(true) }}
              />
            </li>
          </ul>
        </div>

        {data?.map(
          (
            {
              approver,
              remarks: initialRemarks,
              status,
              approverId,
              createBy,
              id,
            },
            index
          ) => {
            return (
              <>
                <Approval
                  module={module}
                  approverType={approverType}
                  key={index}
                  approver={approver}
                  initialRemarks={initialRemarks}
                  status={status}
                  onStatusChange={onStatusChange}
                  approverId={approverId}
                  createBy={createBy}
                  id={id}
                  title={title}
                  onListStatus={onListStatus}
                />
              </>
            );
          }
        )}
      </div>
      {
        isModalOpen &&
        <AddAprrovalModal 
          visible={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          data={data}
          module={module}
        />

      }
    </>
  );
}

export default ApprovalWrapper;
