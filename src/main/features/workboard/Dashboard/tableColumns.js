import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
	return [
		{
			title: "Name",
			dataIndex: "name",
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
			title: "Members",
			dataIndex: "members",
			ellipsis: true,
			render: member => (
				<Avatar membersData={member} heading={"Members"} />
			),
		},
		{
			title: "Create Date",
			dataIndex: "createDate",
			render: i => moment(i.createDate).format("DD MMM YYYY"),
			ellipsis: true,
			sort: true,
		},
		{
			title: "Sections",
			dataIndex: "sectionCount",
			ellipsis: true,
			sort: true,
		},
	];
};
