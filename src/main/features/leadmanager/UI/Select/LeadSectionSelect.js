import React from "react";
import { Select, Tag } from "antd";
import { useDispatch } from "react-redux";
import { moveLeadManagerDetail } from "../../store/actions";

function LeadSectionSelect({ detail, sections }) {
	const dispatch = useDispatch();
	const handleSectionChange = (currentSectionId, targetSectionId) => {
		dispatch(
			moveLeadManagerDetail({
				currentSectionId,
				targetSectionId,
				currentIndexNo: 1,
				targetIndexNo: 1,
			})
		);
	};
	const Option = Select;
	return (
		<div>
			<Select
				defaultValue={detail?.sectionId}
				dropdownStyle={{
					minWidth: "max-content",
				}}
				onClick={e => {
					e.stopPropagation();
					e.preventDefault();
				}}
				onChange={value => {
					handleSectionChange(detail?.sectionId, value);
				}}
			>
				{sections.map(leadSection => (
					<Option value={leadSection.id} key={leadSection.id}>
						<Tag color={leadSection.colorCode}>
							{leadSection.name}
						</Tag>
					</Option>
				))}
			</Select>
		</div>
	);
}

export default LeadSectionSelect;
