import React, { useEffect, useState } from "react";
import { PlusSquareOutlined, ReloadOutlined } from "@ant-design/icons";
import Approval from "./Approval";
import { useDispatch } from "react-redux";
import "../../../../features/defaultApprovers/styles.css";
import AddAprrovalModal from "./AddAprrovalModal";
import { handleItemDetailModal } from "../../../../../utils/Shared/store/slice";

function ApprovalWrapper({
  title,
  data,
  module,
  approverType,
  onStatusChange,
  onListStatus,
  reference
}) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compData, setCompData] = useState([]);

  useEffect(()=> {
    setCompData(data);
  },[data])

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  const handleOpenApprovers = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
    dispatch(handleItemDetailModal(true));
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
                onClick={(e) => {
                  handleOpenApprovers(e);
                }}
              />
            </li>
          </ul>
        </div>

        {compData?.map(
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
      {isModalOpen && <AddAprrovalModal data={data} module={module} reference={reference}/>}
    </>
  );
}

export default ApprovalWrapper;
