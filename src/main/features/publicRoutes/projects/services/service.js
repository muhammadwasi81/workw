import MasterConfig from "../../../../../utils/services/MasterConfig";

export const projectExternalService = async (token) => {
  return MasterConfig.get(
    `api/Project/VerifyProjectExternalMemberRequest?token=${token}`
  );
};
export const setNewPasswordService = (data) => {
  let token = data.token;
  let password = data.password;
  return MasterConfig.get(
    `api/Project/SetupNewPassword?token=${token}&password=${password}`
  );
};
