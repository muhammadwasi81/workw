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
	handleSectionBgColor,
	handleSectionTitle,
} from "../../store/slice";
import { Button } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import CardEditor from "../Card/CardEditor";
import Colors from "../Colors/Colors";
import MenuDropDown from "../MenuDropDown/MenuDropDown";
import {
	addWorkBoardSectionTodo,
	updateWorkBoardSectionColorCode,
	updateWorkBoardSectionTitle,
} from "../../store/action";

function List(props) {
	const { section, index, colorCode, key, sectionId, labels } = props;
	const boardList = useSelector(state => state.trelloSlice[sectionId]);
	const dispatch = useDispatch();
	const [listData, setListData] = useState({
		editingTitle: false,
		title: section.name,
		addingCard: false,
	});
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
				handleSectionTitle({
					sectionId,
					title: listData.title,
				})
			);
			dispatch(
				updateWorkBoardSectionTitle({
					sectionId,
					title: listData.title,
					colorCode: "",
				})
			);
		}
		toggleEditingTitle();
	};

	const addCard = async cardText => {
		toggleAddingCard();
		if (cardText.trim().length > 0) {
			dispatch(
				addWorkBoardSectionTodo({
					sectionId,
					title: cardText,
				})
			);
			// dispatch(addListCard({ cardText, cardId, listId: section.id }));
		}
	};

	const deleteCardList = async () => {
		if (window.confirm("Are you sure to delete this list?")) {
			dispatch(
				deleteList({
					payload: { section, boardList, cards: boardList.cards },
				})
			);
		}
	};

	const changeSectionBgColor = colorCode => {
		const data = {
			sectionId,
			colorCode,
		};
		dispatch(updateWorkBoardSectionColorCode(data));
		dispatch(handleSectionBgColor(data));
	};

	return (
		<Draggable draggableId={sectionId} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div
						style={{ background: colorCode && colorCode }}
						className={`List bg-neutral-200 flex-shrink-0 w-[264px] p-1 h-fit m-[10px] mr-0 rounded-sm `}
					>
						{listData.editingTitle ? (
							<ListEditor
								// list={boardList}
								title={listData.title}
								handleChangeTitle={handleChangeTitle}
								saveList={editListTitle}
								// onClickOutside={editListTitle}
								// isEdit={true}
							/>
						) : (
							<div className="flex cursor-pointer items-center justify-between pr-2">
								<div
									className="List-Title !cusrsor-pointer p-2 break-words font-bold w-full"
									onClick={toggleEditingTitle}
								>
									{section.name}
								</div>
								<MenuDropDown
									changeBgColor={changeSectionBgColor}
									deleteList={deleteCardList}
								/>
							</div>
						)}

						<Droppable droppableId={sectionId}>
							{(provided, _snapshot) => (
								<div
									ref={provided.innerRef}
									className="Lists-Cards"
								>
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
												{labels.addTodo}
											</Button>
										</div>
									)}

									{section.todos &&
										section.todos.map((todo, index) => (
											<Card
												key={todo.id}
												id={todo.id}
												index={index}
												text={todo.title}
												sectionId={todo.sectionId}
												members={todo.members}
												todoData={todo}
											/>
										))}

									{provided.placeholder}
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
