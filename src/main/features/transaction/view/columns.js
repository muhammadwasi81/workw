import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const transactionColumn = () => {
	return [
		{
			title: "Voucher No",
			dataIndex: "status",
			render: status => <StatusTag status={status} />,
			sort: true,
		},
		{
			title: "Date",
			dataIndex: "creator",
			ellipsis: true,
			render: creator => (
				<TagAvatar text={creator.name} img={creator.image} />
			),
			sort: true,
		},
		{ title: "Voucher Type", dataIndex: "subject", ellipsis: true, sort: true },
		{ title: "Amount", dataIndex: "subject", ellipsis: true, sort: true },
	];
};
