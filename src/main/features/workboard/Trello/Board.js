import React, { useCallback, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList/AddList";
import { useSelector, useDispatch } from "react-redux";
import List from "./List/List";
import { moveCard, moveList } from "../store/slice";
import { useParams } from "react-router-dom";
import { getWorkboardById } from "../store/action";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";

function Board() {
	const [addingList, setAddingList] = useState(false);
	const lists = useSelector(state => state.trelloSlice.lists);
	const workboardDetail = useSelector(
		state => state.trelloSlice.workboardDetail
	);
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
			console.log("drag");
			// Prevent update if nothing has changed
			if (source.index !== destination.index) {
				dispatch(
					moveList({
						oldListIndex: source.index,
						newListIndex: destination.index,
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
				moveCard({
					sourceListId: source.droppableId,
					destListId: destination.droppableId,
					oldCardIndex: source.index,
					newCardIndex: destination.index,
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
									{lists.map((list, index) => {
										return (
											<List
												list={list}
												key={list.id}
												index={index}
												color={list.color}
												sectionId={id}
											/>
										);
									})}

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
		</>
	);
}

export default React.memo(Board);
