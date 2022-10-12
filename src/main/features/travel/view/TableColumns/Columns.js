import { EditFilled } from "@ant-design/icons";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
const Edit = (handleEdit, row) => {
	return (
		<EditFilled
			style={{ color: "#1b5669" }}
			onClick={e => handleEdit(row)}
		/>
	);
};

export const tableColumns = (handleEdit, Direction, table) => {
	return [
		{
			title: table.sort,
			dataIndex: "sort",
			drag: true,
			width: 80,
		},

		{
			title: table.reffNo,
			dataIndex: "referenceNo",
			sort: true,
			width: 200,
			// ellipsis: true,
		},
		{
			title: table.status,
			dataIndex: "status",
			sort: true,
			// tag: true,
			render: status => <StatusTag status={status} />,
			width: 200,
		},
		{
			title: table.subject,
			dataIndex: "subject",
			width: 200,
		},
		{
			title: table.description,
			dataIndex: "description",
			width: 200,
			ellipsis: true,
		},
		{
			title: table.agentStatus,
			dataIndex: "agentStatus",
			render: status => <StatusTag status={status} />,
			// tag: true,
			width: 200,
		},
		// {
		// 	title: table.actions,
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
	// let columns = [...defaultColumns].reverse();
	// return Direction === "ltr" ? defaultColumns : columns;
};
