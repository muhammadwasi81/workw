import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
export const tableColumns = () => {
	return [
		{
			title: "Name",
			dataIndex: "details",
			sort: true,
			width: 200,
			// ellipsis: true,
			render: details => console.log("details", details),
		},
		{
			title: "Address",
			dataIndex: "address",
			sort: true,
			// tag: true,
			// render: status => <StatusTag status={status} />,
			width: 200,
		},
		{
			title: "adfasfd",
			dataIndex: "subject",
			width: 200,
		},
		{
			title: "dsfadf",
			dataIndex: "description",
			width: 200,
			ellipsis: true,
		},
		{
			title: "dfafsdfadsf",
			dataIndex: "agentStatus",
			// render: status => <StatusTag status={status} />,
			// tag: true,
			width: 200,
		},
		// {
		// 	title: ,
		// 	key: "action",
		// 	action: true,
		// 	customAction: true,
		// 	actions: ["edit"],
		// 	key: "6",
		// 	width: 100,
		// 	render: (_, row) => {
		// 		return Edit(handleEdit, row);
		// 	},
		// },
	];
};
