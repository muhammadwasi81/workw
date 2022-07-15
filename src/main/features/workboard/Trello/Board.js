import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList/AddList";
import { useSelector, useDispatch } from "react-redux";
import List from "./List/List";
import { moveCard, moveList } from "../store/slice";
function Board() {
	const [addingList, setAddingList] = useState(false);
	const lists = useSelector(state => state.trelloSlice.lists);

	// console.log("lists", lists);
	const dispatch = useDispatch();
	// console.log("lists", lists);
	// using useCallback is optional

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
	// console.log("board");

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="board" direction="horizontal" type="COLUMN">
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
								<AddList toggleAddingList={toggleAddingList} />
							)}
						</div>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default React.memo(Board);
