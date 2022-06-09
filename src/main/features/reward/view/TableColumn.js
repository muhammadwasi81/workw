import moment from "moment";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
	return [
		{
			title: "Sort",
			dataIndex: "sort",
			drag: true,
			width: 80,
		},
		{
			title: "Creator",
			dataIndex: "creator",
			// width: "20%",
			ellipsis: true,
			render: i => i.name,
		},
		{
			title: "Date",
			dataIndex: "createDate",
			// width: "20%",
			render: i => moment(i.createDate).format("DD/MM/YYYY"),
		},
		{
			title: "Reference No",
			dataIndex: "referenceNo",
			// width: 600,
			ellipsis: true,
		},
		{
			title: "Status",
			dataIndex: "status",
			render: status => <StatusTag status={status} />,
			// tag: true,
			// width: 200,
		},
		{ title: "Category", dataIndex: "category", ellipsis: true },
		{ title: "Name", dataIndex: "name", ellipsis: true },
		{ title: "Reason", dataIndex: "reason", ellipsis: true },
		// {
		//   title: "Ref No",
		//   dataIndex: "approvers",
		// ,
		//   key: 4,
		//   render: (e) => e.map((i) => i.referenceId)
		// },
		{
			title: "Reward To",
			dataIndex: "members",
			ellipsis: true,
			render: e => e.map(i => i.member.name),
		},
	];
};
