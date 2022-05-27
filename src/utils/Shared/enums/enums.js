export const userType = Object.freeze([
	{
		id: 1,
		name: "SuperAdmin",
	},
	{
		id: 2,
		name: "Admin",
	},
	{
		id: 3,
		name: "Employee",
	},
	{
		id: 4,
		name: "Individual",
	},
	{
		id: 5,
		name: "Calling",
	},
	{
		id: 6,
		name: "ProjectExternal",
	},
	{
		id: 7,
		name: "Guest",
	},
]);
export const userTitle = Object.freeze([
	{
		id: 1,
		name: "Mr",
	},
	{
		id: 2,
		name: "Mrs",
	},
]);
export const relations = Object.freeze([
	{
		id: 1,
		name: "Father",
	},
	{
		id: 2,
		name: "Mother",
	},
	{
		id: 3,
		name: "Brother",
	},
	{
		id: 4,
		name: "Sister",
	},
]);

export const employmentType = Object.freeze([
	{
		id: 1,
		name: "FullTime",
	},
	{
		id: 2,
		name: "PartTime",
	},
]);
export const cityApiPrefix = "/api/Utility/GetAllCities";
export const defaultUiid = "00000000-0000-0000-0000-000000000000";
export const FilterSortEnum = Object.freeze({
	CreateDateDesc: 1,
	CreateDateAsc: 2,
	SubjectDesc: 3,
	SubjectAsc: 4,
	StatusDesc: 5,
	StatusAsc: 6,
	ApproverStatusDesc: 7,
	ApproverStatusAsc: 8,
	AgentStatusDesc: 9,
	AgentStatusAsc: 10,
	ReferenceNoDesc: 11,
	ReferenceNoAsc: 12,
});
