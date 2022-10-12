import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllCustomApprovalService = (data) => {
  return MasterConfig.post(`api/CustomApproval/GetAllCustomApproval`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const GetCustomApprovalByIdService = (id) => {
  return MasterConfig.get(`api/CustomApproval/GetCustomApprovalById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const addCustomApprovalService = async(data) => {
	const formData = jsonToFormData(data);
	return MasterConfig.post(`api/customApproval/AddCustomApproval`, formData)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};