import { message } from "antd";
import { responseCode } from "../../../../../services/enums/responseCode";
import { jsonToFormData } from "../../../../../utils/base";
import MasterConfig from "../../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Approval/";

export const saveApprovalsRemarks = async (remark) => {
  const data = jsonToFormData(remark);
  const response = await MasterConfig.post(`${API_PREFIX}AddRemark`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  if (response.responseCode !== responseCode.Success) {
    message.error("Something went wrong");
  }
  return response.data;
};

export const addApprovalService = async (data) => {
  let module = data.module
  let approverType = data.approvalType 
  let referenceId = data.referenceId.toString()
  let dataObject = {
    approverId: data.approverId,
    approverType: approverType,
  }
  console.log(dataObject, "DATA OBJECT");
  return MasterConfig.post(`api/Approval/AddApproval?module=${module}&referenceId=${referenceId}`, dataObject)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

