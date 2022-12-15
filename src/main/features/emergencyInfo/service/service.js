import MasterConfig from '../../../../utils/services/MasterConfig';
const API_PREFIX = 'api/';

export const getUserEmergencyService = (data) => {
  return MasterConfig.get(
    `${API_PREFIX}UserEmergencyContact/GetAllUserEmergencyContact?userId=${data}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

// TODO: USER EMERGENCY
export const updateUserEmployeeContactService = (data) => {
  return MasterConfig.put(
    `${API_PREFIX}userEmergencyContact/UpdateUserEmergencyContact`,
    data
  )
    .then((res) => {
      console.log(data, 'UpdateUserEmployeeContact service');
      return res.data;
    })
    .catch((err) => {
      console.log(err, 'emergency contact error');
      return err;
    });
};
