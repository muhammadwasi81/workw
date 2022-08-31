import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
export const salaryTableColumn = () => {
	return [
		{
			title: "Reference No",
			dataIndex: "referenceNo",
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
			title: "Approvers",
			dataIndex: "approvers",
			ellipsis: true,
			render: value => (
				<Avatar
                isAvatarGroup={true}
                heading={"approvers"}
                membersData={value ? value : []}
              />
			),
			sort: true,
		},
		{
			title: "Basic Salary",
			dataIndex: "basicSalary",
			ellipsis: true,
			sort: true,
		},
		{
			title: "NetSalary",
			dataIndex: "netSalary",
			ellipsis: true,
			sort: true,
		},
		{
			title: "Status",
			dataIndex: "status",
			render: status => <StatusTag status={status} />,
			sort: true,
		}
	];
};
