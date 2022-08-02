import React from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import Section from "./Sections/Section";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Header from "../../../../layout/header";
import { ROUTES } from "../../../../../utils/routes";
import Completed from "../../../../../content/svg/leadManagers/completed.svg";
import Contact from "../../../../../content/svg/leadManagers/conatct_established.svg";
import Contract from "../../../../../content/svg/leadManagers/contract_sent.svg";
import Intrested from "../../../../../content/svg/leadManagers/intrested.svg";
import Introductions from "../../../../../content/svg/leadManagers/Introductions_completed.svg";
import NotIntrested from "../../../../../content/svg/leadManagers/not_intrested.svg";
import Potentials from "../../../../../content/svg/leadManagers/potentials.svg";
import CustomModal from "../../../workboard/Modal/CustomModal";
import SectionDetail from "./SectionDetail";

function Board() {
	let sections = [
		{ colorCode: "#1276D0", text: "Potentials", icon: Potentials, id: 1 },
		{
			colorCode: "#45B08C",
			text: "Contact Established",
			icon: Contact,
			id: 2,
		},
		{
			colorCode: "#E97551",
			text: "Introductions Completed",
			icon: Introductions,
			id: 3,
		},
		{ colorCode: "#006D5B", text: "Interested", icon: Intrested, id: 4 },
		{ colorCode: "#FECD2F", text: "Contract Sent", icon: Contract, id: 5 },
		{ colorCode: "#14A06E", text: "Completed", icon: Completed, id: 6 },
		// { colorCode: "#365899", text: "Not Interested (Potential)", id: 7 },
		{
			colorCode: "#FD4A26",
			text: "Not Interested",
			icon: NotIntrested,
			id: 7,
		},
	];
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
			name: "Leads Overview",
			to: `${ROUTES.LEAD_MANAGER.DEFAULT}`,
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
									{sections.map((section, index) => (
										<Section
											section={section}
											index={index}
											key={section.id}
										/>
									))}
								</div>
								// {provided.placeholder}
							)}
						</Droppable>
					</DragDropContext>
				</ContBody>
			</TabbableContainer>
			{/* <CustomModal
				isModalVisible={true}
				width={"60%"}
				title="Details"
				footer={null}
				children={<SectionDetail />}
				className={""}
			/> */}
		</>
	);
}

export default Board;
