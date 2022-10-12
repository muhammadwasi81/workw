export const DepartmentTypeMemberEnum = {
	Employee: 1,
	Admin: 2,
	SubHeadOfDepartment: 3,
};

export function DepartmentMemberTypeList() {
	return [
		{
			id: DepartmentTypeMemberEnum.Employee,
			name: "Employee",
		},
		{
			id: DepartmentTypeMemberEnum.Admin,
			name: "Admin",
		},
		// {
		//   id: DepartmentTypeMemberEnum.SubHeadOfDepartment,
		//   name: "Sub Head Of Department",
		// },
	];
}
