import React, { useState } from "react";
import { PlusSquareOutlined, ReloadOutlined } from "@ant-design/icons";
import Approval from "./Approval";
import CustomSelect from '../../../AntdCustomSelects/SharedSelects/MemberSelect';
import { Modal, Skeleton } from "antd";
import { NoDataFound } from "../../../NoDataIcon";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {  getAllDefaultApproversAction } from "../../../../features/defaultApprovers/store/action";
import { useDispatch } from "react-redux";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import Avatar from "../../../Avatar/avatarOLD";
import '../../../../features/defaultApprovers/styles.css'
import { addApproversAction } from "../action/action";

function ApprovalWrapper({ title, data, module, approverType,  onStatusChange, onListStatus,}) {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const [currentType, setCurrentType] = useState('');

  const employees = useSelector((state) => state.sharedSlice.employees);
  const { loader, approversData } = useSelector((state) => state.approverSlice);

  const referenceId = data.map((item) => {return item.referenceId} )
  let approverIdArray = data.map((item) => {return item.approverId} )
  let approverId = approverIdArray.toString()
  let approvalTypeArray = data.map((item) => {return item.approvalType} )
  let approvalType = approvalTypeArray.toString()

  const selectedData = (data) => {
    setValue(data);
  };

  const filterType = (type) => {
    return approversData.filter((item) => item.type === type);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const payloadData = {
    pageNo: 1,
    pageSize: 20,
    search: '',
  };


  useEffect(() => {
    dispatch(getAllDefaultApproversAction(payloadData));
  }, []);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(
      getAllEmployees({
        text,
        pgNo,
        pgSize: 20,
      })
    );
  };

  useEffect(() => {
    fetchEmployees('', 0);
  }, []);

  const handleChange = (e) => {
    const payload = {
      memberId: [e],
      type: currentType,
      module: module,
      referenceId: referenceId,
      approverId: approverId,
      approvalType: approvalType

    };
    dispatch(addApproversAction(payload));
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
            <PlusSquareOutlined onClick={() => { setIsModalOpen(true)}} />
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
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modalWrapper"
      >
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Select Approval
            </label>
            <CustomSelect
              data={firstTimeEmpData}
              selectedData={selectedData}
              canFetchNow={isFirstTimeDataLoaded}
              fetchData={fetchEmployees}
              placeholder={"Select Member"}
              isObject={true}
              loadDefaultData={false}
              onChange={handleChange}
              optionComponent={(opt) => {
                return (
                  <>
                    <Avatar
                      name={opt.name}
                      src={opt.image}
                      round={true}
                      width={'30px'}
                      height={'30px'}
                    />
                    {opt.name}
                  </>
                );
              }}
              dataVal={value}
              name="approvers"
              showSearch={true}
              // direction={Direction}
            />
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
          {/* {loader ? (
            <Skeleton active />
          ) : (
            <>
              {filterType(currentType).length > 0 ? (
                filterType(currentType).map((item, index) => {
                  return (
                    <div key={index}>
                      <Avatar
                        name={item.member.name}
                        src={item.member.image}
                        round={true}
                        width={'30px'}
                        height={'30px'}
                      />
                      <span className="font-semibold">
                        &nbsp;{item.member.name}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div
                  className="py-2"
                  style={{
                    width: 100,
                    height: 200,
                    margin: 'auto',
                  }}
                >
                  <NoDataFound />
                </div>
              )}
            </>
          )} */}
        </div>
      </Modal> 
    </>
  );
}

export default ApprovalWrapper;
