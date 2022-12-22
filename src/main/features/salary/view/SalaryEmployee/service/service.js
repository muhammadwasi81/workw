import {
  ResponseResultError,
  ResponseResultSuccess,
} from '../../../../../../utils/api/ResponseResult';
import Config from '../../../../../../utils/services/MasterConfig';
import MasterConfig from '../../../../../../utils/services/MasterConfig';

export const getCurrentSalaryOfEmployeeService = async (id) => {
  console.log(id, 'getCurrentSalaryOfEmployeeService service');
  return MasterConfig.get(
    `/api/EmployeeSalary/GetCurrentSalaryOfEmployee?id=${id}`
  )
    .then((res) => {
      console.log(res.data, 'getInventoryAssetByIdService service');
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const addEmployeeSalaryService = async (payload) => {
  console.log(payload, 'payload');
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`/api/EmployeeSalary/AddEmployeeSalary`, payload);
    console.log(data, 'addEmployeeSalaryService service');
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
