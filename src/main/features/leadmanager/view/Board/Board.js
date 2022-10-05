import React, { useEffect, useState } from "react";
// import {
// 	ContBody,
// 	TabbableContainer,
// } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import Section from "./Sections/Section";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import Header from "../../../../layout/header";
// import { ROUTES } from "../../../../../utils/routes";

import CustomModal from "../../../workboard/Modal/CustomModal";
import SectionDetail from "./SectionDetail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	moveLeadManagerDetail,
	moveLeadManagerSection,
} from "../../store/actions";
import SectionDetailSkeleton from "../../UI/Skeleton/SectionDetailSkeleton";
import {
	handleAssignMemberModal,
	handleContactDetailModal,
	moveDetail,
	moveSection,
} from "../../store/slice";

function Board() {
	const [openSectionDetailModal, setOpenSectionDetailModal] = useState(false);
	const { id } = useParams();
	const dispatch = useDispatch();

	const leadManagerDetail = useSelector(
		state => state.leadMangerSlice.leadManagerDetail
	);
	const isSectionDetailLoading = useSelector(
		state => state.leadMangerSlice.isSectionDetailLoading
	);

	const leadManagerSectionDetailData = useSelector(
		state => state.leadMangerSlice.leadManagerSectionDetailData
	);

	const loading = useSelector(state => state.leadMangerSlice.loading);

	const handleDragEnd = ({ source, destination, type }) => {
		if (!destination) return;
		// Move section
		if (type === "COLUMN") {
			// Prevent update if nothing has changed
			if (source.index !== destination.index) {
				dispatch(
					moveSection({
						oldListIndex: source.index,
						newListIndex: destination.index,
					})
				);
				dispatch(
					moveLeadManagerSection({
						leadManagerId: id,
						currentIndexNo: Number(source.index) + 1,
						targetIndexNo: Number(destination.index) + 1,
					})
				);
			}
			return;
		}
		// Move card
		if (
			source.index !== destination.index ||
			source.droppableId !== destination.droppableId
		) {
			dispatch(
				moveDetail({
					sourceListId: source.droppableId,
					destListId: destination.droppableId,
					oldCardIndex: source.index,
					newCardIndex: destination.index,
				})
			);
			dispatch(
				moveLeadManagerDetail({
					currentSectionId: source.droppableId,
					targetSectionId: destination.droppableId,
					currentIndexNo: Number(source.index) + 1,
					targetIndexNo: Number(destination.index) + 1,
				})
			);
		}
	};
	const handleSectionDetailModal = () => {
		setOpenSectionDetailModal(!openSectionDetailModal);
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable
					droppableId="lead"
					direction="horizontal"
					type="COLUMN"
				>
					{(provided, _snapshot) => (
						<div
							ref={provided.innerRef}
							className="flex overflow-auto"
						>
							{leadManagerDetail &&
								leadManagerDetail.sections.map(
									(section, index) => (
										<Section
											section={section}
											index={index}
											key={section.id}
											handleSectionDetailModal={
												handleSectionDetailModal
											}
										/>
									)
								)}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>

			<CustomModal
				isModalVisible={openSectionDetailModal}
				onCancel={handleSectionDetailModal}
				width={"60%"}
				title="Details"
				footer={null}
				children={
					isSectionDetailLoading && !leadManagerSectionDetailData ? (
						<SectionDetailSkeleton />
					) : (
						<SectionDetail
							handleContactDetailModal={() => {
								dispatch(
									handleContactDetailModal({
										open: true,
										add: false,
									})
								);
							}}
							handleMemberModal={id => {
								dispatch(
									handleAssignMemberModal({
										id,
									})
								);
							}}
							data={leadManagerSectionDetailData}
							onClickContact={value => {
								dispatch(
									handleContactDetailModal({
										open: true,
										add: value,
									})
								);
							}}
							loading={loading}
						/>
					)
				}
				className={""}
			/>
		</>
	);
}

export default Board;
