import React, { useCallback, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList/AddList";
import { useSelector, useDispatch } from "react-redux";
import List from "./List/List";
import { moveCard, moveList, moveSection } from "../store/slice";
import { useParams } from "react-router-dom";
import { getWorkboardById, moveWorkBoardSection } from "../store/action";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import CardDetailModal from "./Modal/CardDetailModal";
import DateModal from "../Modal/DateModal";

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
			console.log("move card");
			// dispatch(
			// 	moveCard({
			// 		sourceListId: source.droppableId,
			// 		destListId: destination.droppableId,
			// 		oldCardIndex: source.index,
			// 		newCardIndex: destination.index,
			// 	})
			// );
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
		</>
	);
}

export default React.memo(Board);
