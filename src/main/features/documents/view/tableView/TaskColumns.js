import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
	return [
		{
			title: "Name",
			dataIndex: "name",
			ellipsis: true,
			sort: true,
		},
		{
			title: "Creator",
			dataIndex: "creator",
			ellipsis: true,
			render: (creator, row) => {
				console.log(row, "row")
				return (
					<TagAvatar text={creator.name} img={creator.image} />
				)
			},
			sort: true,
		},
		{
			title: "Date",
			dataIndex: "createDate",
			render: date => <div>{moment(date).format()}</div>,
			ellipsis: true,
			sort: true,
		},
		{
			title: "Privacy",
			dataIndex: "privacyId",
			ellipsis: true,
			sort: true,
		},
		{
			title: "Status",
			dataIndex: "status",
			render: status => <StatusTag status={status} />,
			sort: true,
		},
		// {
		// 	title: "Task Assigned To",
		// 	dataIndex: "members",
		// 	ellipsis: true,
		// 	render: member => (
		// 		<Avatar membersData={member} heading={"Members"} />
		// 	),
		// },
	];
};
