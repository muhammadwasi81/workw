import MasterConfig from "../../../../utils/services/MasterConfig";
import {getCustomTag_dto} from "./dto";

// export const getAllCustomTagByIdService = (id) => {
// 	return MasterConfig.get(`api/CustomTag/GetCustomTagById?id=${id}`)
// 		.then(res => {
// 			return res.data;
// 		})
// 		.catch(err => {
// 			return err;
// 		});
// };

export const getAllCustomTagService = (data) => {
	console.log(data, "getAllCustomTagService");
	//let a = getCustomTag_dto(data)
	return MasterConfig.post(`api/CustomTag/GetAllCustomTag`, data)
	  .then((res) => {
		// console.log("response data from service", res.data);
		return res.data;
	  })
	  .catch((err) => {
		return err;
	  });
  };
  

export const addCustomTagService = args => {
	return MasterConfig.post(`api/CustomTag/AddCustomTag`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

// export const addCustomTagMemberService = args => {
// 	return MasterConfig.post(`api/CustomTag/AddCustomTagMember`, args)
// 		.then(res => {
// 			return res.data;
// 		})
// 		.catch(err => {
// 			return err;
// 		});
// };

export const addCustomTagMemberService = (data) => {
	console.log(data,"dataa servucesss");
	let id = data.id;
	console.log(id,"idddd");
	let memberId = data.memberId;
	let member = [
	  {
		memberId: memberId,
	  },
	];
	return MasterConfig.post(`api/CustomTag/AddCustomTagMember?id=${id}`, member)
	  .then((res) => {
		return res.data;
	  })
	  .catch((err) => {
		return err;
	  });
  };

// export const getAllCustomTagMemberService = (id) => {
// 	return MasterConfig.get(`api/CustomTag/GetAllCustomTagMember?id=${id}`)
// 		.then(res => {
// 			return res.data;
// 		})
// 		.catch(err => {
// 			return err;
// 		});
// };
export const getAllCustomTagMemberService = (id) => {
	return MasterConfig.get(`api/CustomTag/GetAllCustomTagMember?id=${id}`)
	  .then((res) => {
		return res.data;
	  })
	  .catch((err) => {
		return err;
	  });
  };
  

export const updateCustomTagService = args => {
	return MasterConfig.put(`api/CustomTag/UpdateCustomTag`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeCustomTagService = id => {
	return MasterConfig.delete(`api/CustomTag/RemoveCustomTag?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
