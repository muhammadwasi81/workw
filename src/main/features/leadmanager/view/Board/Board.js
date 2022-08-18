import React, { useEffect, useState } from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import Section from "./Sections/Section";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Header from "../../../../layout/header";
import { ROUTES } from "../../../../../utils/routes";

import CustomModal from "../../../workboard/Modal/CustomModal";
import SectionDetail from "./SectionDetail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getLeadManagerById,
	moveLeadManagerDetail,
	// getLeadManagerSectionById,
	moveLeadManagerSection,
} from "../../store/actions";
import SectionDetailSkeleton from "../../UI/Skeleton/SectionDetailSkeleton";
import ContactDetail from "./ContactDetail";
import ContactDetailSkeleton from "../../UI/Skeleton/ContactDetailSkeleton";
import { moveDetail, moveSection } from "../../store/slice";

function Board() {
	const [openSectionDetailModal, setOpenSectionDetailModal] = useState(false);
	const [openContactDetailModal, setOpenContactDetailModal] = useState(false);
	const [isContactUpdated, setIsContactUpdated] = useState(false);
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLeadManagerById(id));
	}, []);

	const leadManagerDetail = useSelector(
		state => state.leadMangerSlice.leadManagerDetail
	);
	const isSectionDetailLoading = useSelector(
		state => state.leadMangerSlice.isSectionDetailLoading
	);
	const isContactDetailLoading = useSelector(
		state => state.leadMangerSlice.isContactDetailLoading
	);
	const contactDetail = useSelector(
		state => state.leadMangerSlice.contactDetail
	);
	const leadManagerSectionDetailData = useSelector(
		state => state.leadMangerSlice.leadManagerSectionDetailData
	);

	const contactUpdate = useSelector(
		state => state.leadMangerSlice.isContactUpdated
	);
	const loading = useSelector(state => state.leadMangerSlice.loading);
	const contactDetaUpdating = useSelector(
		state => state.leadMangerSlice.contactDetaUpdating
	);
	const success = useSelector(state => state.leadMangerSlice.success);

	const handleDragEnd = ({ source, destination, type }) => {
		if (!destination) return;
		// Move section
		if (type === "COLUMN") {
			// console.log("drag");
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
			console.log("move card");
			console.log("sourceListId", source.droppableId);
			console.log("destListId", destination.droppableId);
			console.log("oldCardIndex", source.index);
			console.log("newCardIndex", destination.index);
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
	const items = [
		{
			name: leadManagerDetail && leadManagerDetail.name,
			to: `${ROUTES.LEAD_MANAGER.LEAD_GROUP_DETAIL}${id}`,
			onClick: () => {
				dispatch(getLeadManagerById(id));
			},
		},
	];

	const handleSectionDetailModal = () => {
		setOpenSectionDetailModal(!openSectionDetailModal);
	};
	const handleContactDetailModal = () => {
		setOpenContactDetailModal(!openContactDetailModal);
	};

	const onClickContact = value => {
		setIsContactUpdated(value);
	};

	useEffect(() => {
		if (success) {
			setOpenContactDetailModal(false);
		}
	}, [success]);

	return (
		<>
			<Header items={items} />
			<TabbableContainer className="">
				<ContBody className="!block">
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
				</ContBody>
			</TabbableContainer>
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
							handleContactDetailModal={handleContactDetailModal}
							data={leadManagerSectionDetailData}
							onClickContact={onClickContact}
							loading={loading}
						/>
					)
				}
				className={""}
			/>

			<CustomModal
				isModalVisible={openContactDetailModal}
				onCancel={handleContactDetailModal}
				width={"50%"}
				title="Contact Detail"
				footer={null}
				children={
					isContactDetailLoading ? (
						!contactDetail && <ContactDetailSkeleton />
					) : (
						<ContactDetail
							isContactUpdated={isContactUpdated}
							data={leadManagerSectionDetailData}
							contactDetail={contactDetail}
							loading={contactDetaUpdating}
						/>
					)
				}
				className={""}
			/>
		</>
	);
}

export default Board;
