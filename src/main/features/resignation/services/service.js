// import { jsonToFormData } from "../../../../utils/base";
import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";
import {
	ResponseResultError,
	ResponseResultSuccess,
  } from "../../../../utils/api/ResponseResult";

export const getAllResignationService = data => {
	return MasterConfig.post(`api/Resignation/GetAllResignation`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addResignationService = async(data) => {
	const formData = jsonToFormData(data);
	return MasterConfig.post(`api/Resignation/AddResignation`, formData)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};

export const getResignationyByIdService = id => {
	return MasterConfig.get(`api/Resignation/GetResignationById?id=${id}`)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};

export const cancelResignationService = async (id) => {
	try {
	  const {
		data: { responseCode, data, message },
	  } = await MasterConfig.delete(`api/Resignation/ResignationCancel?resignationId=${id}`);
	  if (responseCode === 1001) return ResponseResultSuccess(data);
	  return ResponseResultError(message);
	} catch (e) {
	  return ResponseResultError(e);
	}
  };