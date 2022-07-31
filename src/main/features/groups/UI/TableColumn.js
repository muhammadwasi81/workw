import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
	return [
		{ title: "Name", dataIndex: "name", ellipsis: true, sort: true },
		{
			title: "Description",
			dataIndex: "description",
			ellipsis: true,
			sort: true,
		},
		{
			title: "Creator",
			dataIndex: "creator",
			ellipsis: true,
			render: creator => (
				<TagAvatar text={creator.name} img={creator.image} />
			),
			sort: true,
		},
		{
			title: "Create Date",
			dataIndex: "createDate",
			render: i => moment(i.createDate).format("DD MMM YYYY"),
			ellipsis: true,
			sort: true,
		},
	];
};
