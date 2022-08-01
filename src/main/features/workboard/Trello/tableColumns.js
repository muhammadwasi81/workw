import { Tag } from "antd";
import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";
// import Avatar from "../../../../../../../sharedComponents/Avatar/avatar";

// import TagAvatar from "../../../../../sharedComponents/Avatar/TagAvatar";
// import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
export const sectionTableColumn = () => {
	return [
		{
			title: "Section",
			dataIndex: "workBoardSection",
			ellipsis: true,
			sort: true,
		},
		{
			title: "Title",
			dataIndex: "title",
			ellipsis: true,
			sort: true,
		},
		{
			title: "Description",
			dataIndex: "description",
			ellipsis: true,
			sort: true,
		},

		{
			title: "Labels",
			dataIndex: "labels",
			ellipsis: true,
			render: labels =>
				labels.map(label => (
					<Tag color={label.colorCode} className="!h-5" />
				)),
		},
		{
			title: "Created Date",
			dataIndex: "createDate",
			render: i => moment(i.createDate).format("DD MMM YYYY"),
			ellipsis: true,
			sort: true,
		},
	];
};
