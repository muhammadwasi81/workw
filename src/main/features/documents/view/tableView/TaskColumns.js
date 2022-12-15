import moment from "moment";
import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
import DocumentStatusTag from "../components/documentStatusTag/StatusTag";
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
				return <TagAvatar text={creator.name} img={creator.image} />
			},
			sort: true,
		},
		{
			title: "Date",
			dataIndex: "createDate",
			render: date => <div>{moment(date).format("MMM Do YY")}</div>,
			ellipsis: true,
			sort: true,
		},
		{
			title: "Privacy",
			dataIndex: "privacyId",
			render: (creator, row) => {
				return <div>Public</div>
			},
			ellipsis: true,
			sort: true,
		},
		// {
		// 	title: "Status",
		// 	dataIndex: "status",
		// 	render: status => <DocumentStatusTag status={status} />,
		// 	sort: true,
		// },
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
