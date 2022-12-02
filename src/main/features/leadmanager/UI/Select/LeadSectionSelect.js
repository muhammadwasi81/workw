import React from "react";
import { Select, Tag } from "antd";
import { useDispatch } from "react-redux";
import { moveLeadManagerDetail } from "../../store/actions";
import { moveDetail } from "../../store/slice";

function LeadSectionSelect({ detail, sections, currentIndex }) {
	const dispatch = useDispatch();
	const handleSectionChange = (
		currentSectionId,
		targetSectionId
		// currentIndex
	) => {
		// console.log("current section id: ", currentSectionId);
		// console.log("target section id:", targetSectionId);
		// console.log("currentIndex:", currentIndex);
		dispatch(
			moveDetail({
				sourceListId: currentSectionId,
				destListId: targetSectionId,
				oldCardIndex: Number(currentIndex),
				newCardIndex: 0,
			})
		);
		dispatch(
			moveLeadManagerDetail({
				currentSectionId,
				targetSectionId,
				currentIndexNo: Number(currentIndex) + 1,
				targetIndexNo: 1,
			})
		);
	};
	const { Option } = Select;
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
					handleSectionChange(
						detail?.sectionId,
						value
						// detail?.indexNo
					);
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
