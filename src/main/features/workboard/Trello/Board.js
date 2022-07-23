import React, { useCallback, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList/AddList";
import { useSelector, useDispatch } from "react-redux";
import List from "./List/List";
import {
	moveCard,
	moveList,
	moveSection,
	moveSectionTodo,
} from "../store/slice";
import { useParams } from "react-router-dom";
import {
	getWorkboardById,
	moveWorkBoardSection,
	moveWorkBoardTodo,
} from "../store/action";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import CardDetailModal from "./Modal/CardDetailModal";
import DateModal from "../Modal/DateModal";
import MemberModal from "../Modal/MemberModal";
import EditMembers from "./EditMembers/EditMembers";

function Board() {
	const [addingList, setAddingList] = useState(false);

	const workboardDetail = useSelector(
		state => state.trelloSlice.workboardDetail
	);
	// const [sections, setSections] = useState([]);

	// useEffect(() => {
	// 	if (workboardDetail) setSections([...workboardDetail.sections]);
	// }, [workboardDetail]);

	const dispatch = useDispatch();
	const { id } = useParams();
	useEffect(() => {
		dispatch(getWorkboardById(id));
	}, []);

	const toggleAddingList = () => {
		setAddingList(!addingList);
	};

	const handleDragEnd = ({ source, destination, type }) => {
		// dropped outside the allowed zones
		if (!destination) return;

		// Move list
		if (type === "COLUMN") {
			// console.log("drag");
			// Prevent update if nothing has changed
			if (source.index !== destination.index) {
				// console.log("old index", source.index);
				// console.log("new index", destination.index);
				dispatch(
					moveSection({
						oldListIndex: source.index,
						newListIndex: destination.index,
					})
				);
				dispatch(
					moveWorkBoardSection({
						workBoardId: id,
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
			// console.log("move card");
			// console.log("sourceListId", source.droppableId);
			// console.log("destListId", destination.droppableId);
			// console.log("oldCardIndex", source.index);
			// console.log("newCardIndex", destination.index);
			dispatch(
				moveSectionTodo({
					sourceListId: source.droppableId,
					destListId: destination.droppableId,
					oldCardIndex: source.index,
					newCardIndex: destination.index,
				})
			);
			dispatch(
				moveWorkBoardTodo({
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
			name: workboardDetail && workboardDetail.name,
			to: `${ROUTES.WORKBOARD.BOARD + id}`,
		},
	];

	return (
		<>
			<LayoutHeader items={items} />
			<TabbableContainer className="">
				<ContBody className="!block">
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable
							droppableId="board"
							direction="horizontal"
							type="COLUMN"
						>
							{(provided, _snapshot) => (
								<div
									ref={provided.innerRef}
									className="Board h-full flex overflow-x-auto bg-white"
								>
									{workboardDetail &&
										workboardDetail.sections.map(
											(section, index) => {
												return (
													<List
														section={section}
														sectionId={section.id}
														key={section.id}
														index={index}
														colorCode={
															section.colorCode
														}
														workBoardId={
															section.workBoardId
														}
													/>
												);
											}
										)}

									{provided.placeholder}
									<div className="Add_List w-[264px] m-[10px] flex-shrink-0">
										{!addingList ? (
											<Button
												className="!flex !items-center !bg-neutral-400 !rounded-sm !text-white hover:!bg-neutral-500 !border-none mx-2 !w-[264px]"
												icon={<PlusOutlined />}
												onClick={toggleAddingList}
											>
												Add a list
											</Button>
										) : (
											<AddList
												toggleAddingList={
													toggleAddingList
												}
												sectionId={id}
											/>
										)}
									</div>
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</ContBody>
			</TabbableContainer>
			<CardDetailModal />
			<DateModal />
			{/* <EditMembers /> */}
		</>
	);
}

export default React.memo(Board);
