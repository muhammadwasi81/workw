import MasterConfig from "../../../../utils/services/MasterConfig";
export const getAllGradesService = () => {
	return MasterConfig.get(`api/grade/getallgrade`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addGradeService = args => {
	return MasterConfig.post(`api/grade/addgrade`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updateGradeService = args => {
	return MasterConfig.put(`api/grade/updategrade`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeGradeService = id => {
	return MasterConfig.delete(`api/grade/removegrade?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
