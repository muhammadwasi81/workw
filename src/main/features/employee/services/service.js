// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Employee/";

export const addEmployeeService = data => {
	// var form = new FormData();
	// form.append("userTypeId", "3");
	// form.append("titleId", "1");
	// form.append("firstName", "Amir");
	// form.append("lastName", "Naveed");
	// form.append("fatherName", "Fakhar");
	// form.append("email", "amssggir1222223@miletap.com");
	// form.append("personalEmail", "amirnaveeddd2012@gmail.com");
	// form.append("nic", "4250168806923");
	// form.append("residentialAddress", "Malir");
	// form.append("permanentAddress", "Malir");
	// form.append("phoneNo", "03052420676");
	// form.append("designationId", "8558AB98-58C2-4B0A-BA80-AAB564E79A52");
	// form.append("managerId", "77546782-AA7A-4984-9388-5FD044C0FB11");
	// form.append("gradeId", "37D2C9CF-465B-4D9B-B5C8-AEC5CC3F09E8");
	// form.append("departmentId", "8885E1A6-6D2E-408B-A322-83D82EA6E577");
	// form.append("countryId", "CB1C560B-A319-4329-A642-C2E49EDED59F");
	// form.append("cityId", "DE812DEB-DF3A-4967-B0D6-3B4EB6ACEABA");
	// form.append("probationPeriod", "60");
	// form.append("noticePeriod", "30");
	// form.append("genderId", "1");
	// form.append("maritalStatusId", "1");
	// form.append("officeTimingId", "00000000-0000-0000-0000-000000000000");
	// form.append("accessRoleId", "FF964B8A-E41F-4A19-961D-0908A8A5F9F3");
	// form.append("employeeNo", "EMP-000001");
	// form.append("joinDate", "1980-06-17T00:00:00.000Z");
	// form.append("employmentTypeId", "4");
	const formData = jsonToFormData(data);
	return MasterConfig.post(`${API_PREFIX}AddEmployee`, formData)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllEmployeesService = () => {
	return MasterConfig.get(`${API_PREFIX}GetAllEmployeeShort`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
