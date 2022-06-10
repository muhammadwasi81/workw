import { EditFilled } from "@ant-design/icons";
const Edit = (handleEdit, row) => {
	return (
		<EditFilled
			style={{ color: "#1b5669" }}
			onClick={e => handleEdit(row)}
		/>
	);
};

export const tableColumns = (handleEdit, Direction, sharedLabels) => {
	const defaultColumns = [
		{
			title: "Sort",
			dataIndex: "sort",
			drag: true,
			width: 80,
		},

		{
			title: "Reference No",
			dataIndex: "referenceNo",
			sort: true,
			width: 200,
			// ellipsis: true,
		},
		{
			title: "Status",
			dataIndex: "status",
			sort: true,
			tag: true,
			width: 200,
		},
		{
			title: "Subject",
			dataIndex: "subject",
			width: 200,
		},
		{
			title: "Description",
			dataIndex: "description",
			width: 200,
			ellipsis: true,
		},
		{
			title: "Agent Status",
			dataIndex: "agentStatus",
			tag: true,
			width: 200,
		},
		{
			title: "Actions",
			key: "action",
			action: true,
			customAction: true,
			actions: ["edit"],
			key: "6",
			width: 100,
			render: (_, row) => {
				return Edit(handleEdit, row);
			},
		},
	];
	let columns = [...defaultColumns].reverse();
	return Direction === "ltr" ? defaultColumns : columns;
};
