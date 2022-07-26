import React from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import Section from "./Sections/Section";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Header from "../../../../layout/header";
import { ROUTES } from "../../../../../utils/routes";

function Board() {
	let sections = [
		{ colorCode: "#0095c2", text: "Potentials", id: 1 },
		{ colorCode: "rgb(135, 233, 128)", text: "Contact Established", id: 2 },
		{ colorCode: "#f99e2d", text: "Introductions Completed", id: 3 },
		{ colorCode: "#14803f", text: "Interested", id: 4 },
		{ colorCode: "#f2df56", text: "Contract Sent", id: 5 },
		{ colorCode: "#f5da21", text: "Completed", id: 6 },
		{ colorCode: "#365899", text: "Not Interested (Potential)", id: 7 },
		{ colorCode: "#f25656", text: "Not Interested", id: 8 },
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
		</>
	);
}

export default Board;
