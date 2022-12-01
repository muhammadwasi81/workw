import { PlusCircleFilled } from "@ant-design/icons";
import React, { useContext } from "react";

import { Tooltip } from "antd";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import LeadSectionSelect from "../../../UI/Select/LeadSectionSelect";
import { LeadManagerDictionary } from "../../../localization";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
export const tableColumns = (sections, handleMemberModal, userLanguage) => {
	// const { userLanguage } = useContext(LanguageChangeContext);
	const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
		userLanguage
	];
	const { table } = LeadManagerDictionaryList;
	return [
		{
			title: table.name,
			dataIndex: "name",
			// sort: true,
			width: 200,
			// ellipsis: true,
			// render: details => console.log("details", details),
		},
		{
			title: table.address,
			dataIndex: "address",
			// sort: true,
			// tag: true,
			// render: status => <StatusTag status={status} />,
			width: 200,
		},
		{
			title: table.type,
			dataIndex: "typeId",
			width: 200,
			render: typeId => (typeId === 1 ? "Business" : "Individual"),
		},
		{
			title: table.members,
			dataIndex: ["members"],
			width: 200,
			render: (members, { id }, index) => {
				return (
					<div className="flex gap-2 items-center">
						<Avatar heading="Members" membersData={members || []} />
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
			title: table.section,
			dataIndex: "sectionId",
			render: (sectionId, record, index) => {
				// console.log("index", index, record);

				return (
					<LeadSectionSelect
						detail={record}
						sections={sections}
						currentIndex={record.indexNo}
						key={index}
					/>
				);
			},
			width: 200,
		},
	];
};
