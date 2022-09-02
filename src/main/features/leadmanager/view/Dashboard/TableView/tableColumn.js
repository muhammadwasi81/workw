import moment from "moment";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
// import TagAvatar from "../../../../../sharedComponents/Avatar/TagAvatar";
// import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
export const tableColumn = (dictionary, data) => {
	const { table } = dictionary;

	return [
		{
			title: table.name,
			dataIndex: "name",
			ellipsis: true,
			sort: true,
		},
		{
			title: table.description,
			dataIndex: "description",
			ellipsis: true,
			sort: true,
		},

		{
			title: table.members,
			dataIndex: "members",
			ellipsis: true,
			render: member => (
				<Avatar membersData={member} heading={"Members"} />
			),
		},
		{
			title: table.createDate,
			dataIndex: "createDate",
			render: i => moment(i.createDate).format("DD MMM YYYY"),
			ellipsis: true,
			sort: true,
		},
		{
			title: "Action",
			key: "action",
			render: (text, record, index) => (
				<div
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
						console.log("text", text);
						console.log("record", record);
						console.log("index", index);
						console.log("data", data);
					}}
				>
					Delete
				</div>
			),
		},
	];
};
