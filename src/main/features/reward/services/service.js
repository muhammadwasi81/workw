import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/Reward/";

export const getAllRewardService = (data) => {
	return AxiosConfig.post(
		`${API_PREFIX}GetAllReward`, data
	)
		.then(res => {
  console.log(res.data, "HELLOOOO")
			return res.data;
		})
		.catch(err => {
  console.log(err, "HELLOOOO")
			return err;
		});
};



export const addRewardService = (data) => {
  return AxiosConfig.post(`${API_PREFIX}AddReward`, data)
  .then((res) => {
    // console.log(res, "from service")
    return res
  })
  .catch((res) => {
    return res
  })
}
