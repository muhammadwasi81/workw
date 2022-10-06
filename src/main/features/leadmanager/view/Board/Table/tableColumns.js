import { PlusCircleFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import LeadSectionSelect from "../../../UI/Select/LeadSectionSelect";
export const tableColumns = (sections, handleMemberModal) => {
	return [
		{
			title: "Name",
			dataIndex: "name",
			// sort: true,
			width: 200,
			// ellipsis: true,
			// render: details => console.log("details", details),
		},
		{
			title: "Address",
			dataIndex: "address",
			// sort: true,
			// tag: true,
			// render: status => <StatusTag status={status} />,
			width: 200,
		},
		{
			title: "Type",
			dataIndex: "typeId",
			width: 200,
			render: typeId => (typeId === 1 ? "Business" : "Individual"),
		},
		{
			title: "Members",
			dataIndex: ["members"],
			width: 200,
			render: (members, { id }, index) => {
				return (
					<div className="flex gap-2 items-center">
						<Avatar heading="Members" membersData={members} />
						<Tooltip title="Select Assign Members">
							<PlusCircleFilled
								className="!text-[20px] !cursor-pointer !text-primary-color "
								onClick={e => {
									e.stopPropagation();
									e.preventDefault();
									handleMemberModal(id);
								}}
							/>
						</Tooltip>
					</div>
				);
			},
			// ellipsis: true,
		},
		{
			title: "Section",
			dataIndex: "sectionId",
			render: (sectionId, record, index) => (
				<LeadSectionSelect
					detail={record}
					sections={sections}
					index={index}
				/>
			),
			width: 200,
		},
	];
};
