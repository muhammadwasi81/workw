import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";
import { jsonToFormData } from "../../../../utils/base";

const getAllEmployeeSalary_dto = (data) => {
  return {
    pageNo: data.pageNo ? data.pageNo : 0,
    pageSize: data.pageSize ? data.pageSize : 20,
    search: data.search ? data.search : "",
    approverStatus: data.approverStatus ? data.approverStatus : [],
    sortBy: data.sortBy ? data.sortBy : 1,
    filterType: data.filterType ? data.filterType : 0,
  };
};
const addMultipleEmployeeSalary_dto = (data = []) => {
  return data.map((item) => ({
    userId: item.userId ? item.userId : null,
    basicSalary: item.basicSalary ? item.basicSalary : 0,
    description: item.description ? item.description : "",
    netSalary: item.netSalary ? item.netSalary : 0,
    effectiveDate: item.effectiveDate ? item.effectiveDate : null,
    isDefault: item.isDefault ? item.isDefault : true,
    approvers: item.approvers
      ? item.approvers.map((approver) => ({
          approverId: approver.approverId ? approver.approverId : "",
        }))
      : [],
    details: item.details
      ? item.details.map((detail) => ({
          allowanceId: detail.allowanceId ? detail.allowanceId : "",
          allowance: detail.allowance ? detail.allowance : 0,
        }))
      : [],
  }));
};

export const addMultipleQuotationService = async (payload) => {
  try {
    // let request = addMultipleEmployeeSalary_dto(payload);
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Quotation/addQuotation`, payload);
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getQuotationByIdService = async (id) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Quotation/GetQuotationById?id=${id}`);
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllQuotationService = async (payload) => {
  console.log(payload);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Quotation/GetAllQuotation`, payload);
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
