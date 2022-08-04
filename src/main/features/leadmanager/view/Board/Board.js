import React, { useEffect } from "react";
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
	getLeadManagerSectionById,
} from "../../store/actions";

function Board() {
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLeadManagerById(id));
	}, []);

	const leadManagerDetail = useSelector(
		state => state.leadMangerSlice.leadManagerDetail
	);

	const handleDragEnd = ({ source, destination, type }) => {
		if (!destination) return;
		// Move section
		if (type === "COLUMN") {
			// console.log("drag");
			// Prevent update if nothing has changed
			if (source.index !== destination.index) {
				console.log("old index", source.index);
				console.log("new index", destination.index);
			}
			return;
		}
		// Move card
		if (
			source.index !== destination.index ||
			source.droppableId !== destination.droppableId
		) {
			// console.log("move card");
			console.log("sourceListId", source.droppableId);
			console.log("destListId", destination.droppableId);
			console.log("oldCardIndex", source.index);
			console.log("newCardIndex", destination.index);
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
									className="flex overflow-scroll"
									ref={provided.innerRef}
								>
									{leadManagerDetail &&
										leadManagerDetail.sections.map(
											(section, index) => (
												<Section
													section={section}
													index={index}
													key={section.id}
												/>
											)
										)}
								</div>
								// {provided.placeholder}
							)}
						</Droppable>
					</DragDropContext>
				</ContBody>
			</TabbableContainer>
			<CustomModal
				isModalVisible={false}
				width={"60%"}
				title="Details"
				footer={null}
				children={<SectionDetail />}
				className={""}
			/>
		</>
	);
}

export default Board;
