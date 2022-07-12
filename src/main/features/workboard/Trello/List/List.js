import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as id } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import ListEditor from "../AddList/ListEditor";
import {
	addListCard,
	changeBackgroundColor,
	changeListTitle,
	deleteList,
} from "../../store/slice";
import { Button } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import CardEditor from "../Card/CardEditor";
import Colors from "../Colors/Colors";
import MenuDropDown from "../MenuDropDown/MenuDropDown";
// function getStyle(style, snapshot) {
// 	if (!snapshot.isDropAnimating) {
// 		return style;
// 	}
// 	const { moveTo, curve, duration } = snapshot.dropAnimation;
// 	// move to the right spot
// 	const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
// 	// add a bit of turn for fun
// 	const rotate = "rotate(0.5turn)";

// 	// patching the existing style
// 	return {
// 		...style,
// 		transform: `${translate} ${rotate}`,
// 		// slowing down the drop because we can
// 		transition: `all ${curve} ${duration + 0}s`,
// 	};
// }
function List(props) {
	const { list, index, color } = props;
	const boardList = useSelector(state => state.trelloSlice[list.id]);
	// console.log("board ka sara data", boardList);
	const dispatch = useDispatch();
	const [listData, setListData] = useState({
		editingTitle: false,
		title: list.title,
		addingCard: false,
	});
	const [showColors, setShowColors] = useState(false);
	const toggleAddingCard = () =>
		setListData(prevState => ({
			...prevState,
			addingCard: !listData.addingCard,
		}));
	const toggleEditingTitle = () =>
		setListData(prevState => ({
			...prevState,
			editingTitle: !listData.editingTitle,
		}));

	const handleChangeTitle = e =>
		setListData(prevState => ({
			...prevState,
			title: e.target.value,
		}));

	const editListTitle = async () => {
		if (listData.title.trim().length > 0) {
			dispatch(
				changeListTitle({ id: boardList._id, title: listData.title })
			);
		}
		toggleEditingTitle();
	};

	const addCard = async cardText => {
		toggleAddingCard();
		const cardId = id();
		if (cardText.trim().length > 0) {
			dispatch(addListCard({ cardText, cardId, listId: list.id }));
		}
	};

	const deleteCardList = async () => {
		if (window.confirm("Are you sure to delete this list?")) {
			dispatch(
				deleteList({
					payload: { list, boardList, cards: boardList.cards },
				})
			);
		}
	};
	// console.log("list");

	return (
		<Draggable draggableId={boardList._id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					// isDragging={
					// 	snapshot.isDragging && !snapshot.isDropAnimating
					// }
					// style={getStyle(provided.draggableProps.style, snapshot)}
				>
					<div
						style={{ background: color && color }}
						className={`List bg-neutral-200 flex-shrink-0 w-[264px] h-fit m-[10px] mr-0 rounded-sm `}
					>
						{listData.editingTitle ? (
							<ListEditor
								list={boardList}
								title={listData.title}
								handleChangeTitle={handleChangeTitle}
								saveList={editListTitle}
								onClickOutside={editListTitle}
								isEdit={true}
								// deleteList={deleteCardList}
							/>
						) : (
							<div className="flex cursor-pointer items-center justify-between pr-2">
								<div
									className="List-Title !cusrsor-pointer p-2 break-words font-bold w-full"
									onClick={toggleEditingTitle}
								>
									{boardList.title}
								</div>
								<MenuDropDown
									changeBgColor={color => {
										dispatch(
											changeBackgroundColor({
												list,
												color,
											})
										);
									}}
									deleteList={deleteCardList}
								/>
							</div>
						)}

						<Droppable droppableId={boardList._id}>
							{(provided, _snapshot) => (
								<div
									ref={provided.innerRef}
									className="Lists-Cards"
								>
									{boardList.cards &&
										boardList.cards.map((cardId, index) => (
											<Card
												key={cardId}
												cardId={cardId}
												index={index}
												listId={boardList._id}
											/>
										))}
									{provided.placeholder}
									{listData.addingCard ? (
										<CardEditor
											onSave={addCard}
											onCancel={toggleAddingCard}
											adding
										/>
									) : (
										<div
											className="Toggle-Add-Card p-1 flex"
											onClick={toggleAddingCard}
										>
											<Button
												icon={<PlusOutlined />}
												className="!bg-transparent !flex !items-center !border-none !text-[#5e6c84] hover:!text-[#172b4d] hover:!bg-[#091e4214] !text-sm w-full"
												ghost={true}
												size="small"
											>
												Add a card
											</Button>
										</div>
									)}
								</div>
							)}
						</Droppable>
					</div>
				</div>
			)}
		</Draggable>
	);
}

export default List;

{
	/* {showColors && (
	<Colors
		colorPicker={color => {
			dispatch(changeBackgroundColor({ list, color }));
		}}
	/>
)} */
}
